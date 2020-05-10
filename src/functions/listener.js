require('dotenv').config({ path: '.env' });
const Dropbox = require("dropbox/dist/Dropbox-sdk.min").Dropbox;
const fetch = require('isomorphic-fetch'); // or another library of choice.

let buildInProgress = false
// const buildHook = process.env.NODE_ENV == "development" ? process.env.MOCK_BUILD_HOOK : process.env.NETLIFY_BUILD_HOOK
const buildHook = process.env.NETLIFY_BUILD_HOOK

// 1. Incomming getForkTsCheckerWebpackPluginHooks
//   1. Decide if dbx or ntf
//     1. if buildInProgress
//       1. if dbx, reject
//       2. if ntf, call cleanupSem
//     2. if !buildInProgress
//       1. if call from dbx
//         1. check if hase files
//           if yes call build
//           if no reject
//        2. if call from ntf
//            1. set buildInProgress to true
//            2. moveFiles
//            3. set buildInProgress to false
//   2. If dbx and buildInProgress reject
//   3. if ntf and buildInProgress


// Netlify Functions
// ————————————————————————————————————————————————————

async function callBuildHook() {
  console.log("### Calling netlify buildhook")

  await fetch(`${buildHook}`, {
    method: 'post',
    body:    JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
  })
}


// Dropbox Functions
// ————————————————————————————————————————————————————

async function listFiles(dbx, path) {
  const files = await dbx.filesListFolder({ path })
  return files
}

async function attemptBuild() {
  var dbx = new Dropbox({ accessToken: `${process.env.DROPBOX_TOKEN}`, fetch: fetch });
  const files = await listFiles(dbx, `${process.env.DROPBOX_BUILD_FOLDER}`)
  const hasFiles = files.entries.length > 0 && true
  
  console.log("### Files in build folder? ", hasFiles)
  
  if(hasFiles) {
    callBuildHook()
  } else {
    buildInProgress = false
    console.log("### aborting...")
  }
}

function createMoveEntries(files) {
  return files.entries.map(file => {
    return {
      from_path: file.path_display,  
      to_path: file.path_display.substring(file.path_display.lastIndexOf('/'), file.path_display.length) 
    }
  })
}

async function moveFiles(dbx, entries){  
  let response = await dbx.filesMoveBatchV2({
    entries, 
    autorename: true,
  })  

  const { async_job_id } = response  
  
  if (async_job_id) {  
    do {  
      response = await dbx.filesMoveBatchCheckV2({ async_job_id })  
      console.log("Moving files: ", response)
    } while (response['.tag'] === 'in_progress')  
    return response
  }  
}

// General Functions
// ————————————————————————————————————————————————————

async function cleanUp() {
  buildInProgress = true

  var dbx = new Dropbox({ accessToken: `${process.env.DROPBOX_TOKEN}`, fetch: fetch });

  const files = await listFiles(dbx, `${process.env.DROPBOX_BUILD_FOLDER}`)
  const hasFiles = files.entries.length > 0 && true

  if(hasFiles) {
    const moveEntries = createMoveEntries(files)
    await moveFiles(dbx, moveEntries)
    buildInProgress = false
  } else {
    console.log("### No files to cleanup")
    buildInProgress = false
  }

}

function getCaller(event) {
  const { headers } = event
  const isDropbox = Object.keys(headers).some(key => key.includes(`dropbox`))
  const isNetlify = Object.keys(headers).some(key => key.includes(`netlify`))
  
  if(isDropbox) return `dropbox`
  if(isNetlify) return `netlify`
}

async function handleEvent(event, callback) {
  const caller = getCaller(event)

  console.log("### Call from: ", caller)

  if(caller === `dropbox`) {
    if(buildInProgress) {
      console.log("### Build already in progress. Aborting...")

      
      return null
      // callback(null, {
      //   statusCode: 200,
      //   body: JSON.stringify({
      //     msg: "Build already in progress. Aborting..."
      //   }),
      // })
    } else {
      buildInProgress = true
      await attemptBuild()

      // callback(null, {
      //   statusCode: 200,
      //   body: JSON.stringify({
      //     msg: "Attempting to build..."
      //   }),
      // })
    }
  } 

  if(caller === `netlify`) {
    // set flag and cleanup and unset flag
    await cleanUp()

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        msg: "Cleanup done"
      }),
    })
  }
}

export async function handler(event, context, callback) {
  const dbxWebHookChallenge = event.queryStringParameters.challenge
  console.log("handler -> dbxWebHookChallenge", dbxWebHookChallenge)

  await handleEvent(event, callback)
  
  callback(null, {
    // return null to show no errors
    statusCode: 200, // http status code
    body: dbxWebHookChallenge,
  })
}





