require('dotenv').config({ path: '.env' });
var fetch = require('isomorphic-fetch'); // or another library of choice.
const Dropbox = require("dropbox/dist/Dropbox-sdk.min").Dropbox;

async function listFiles(dbx, path) {
  return dbx.filesListFolder({ path })
}

function createMoveEntries(files) {
  const entries = files.entries.map(file =>{
    return {
      from_path: file.path_display,  
      to_path: file.path_display.substring(file.path_display.lastIndexOf('/'), file.path_display.length) 
    }
  })

  return entries
}

async function moveFiles(dbx, entries){  
  let response = await dbx.filesMoveBatchV2({entries, autorename: true,})  
  const { async_job_id } = response  
  if (async_job_id) {  
    do {  
      response = await dbx.filesMoveBatchCheckV2({ async_job_id })  
    } while (response['.tag'] === 'in_progress')  
    return response
  }  
}

export async function handler(event, context, callback) {
  var dbx = new Dropbox({ accessToken: `${process.env.DROPBOX_TOKEN}`, fetch: fetch });

  let response = {}

  const files = await listFiles(dbx, "/- Update Page")

  if(files.entries.length > 0) {
    const moveEntries = createMoveEntries(files)
    response = await moveFiles(dbx, moveEntries)
  } else {
    response = files
  }
  console.log("handler -> response", response)

  callback(null, {
    statusCode: 200, // http status code
    body: JSON.stringify({response}),
  })
}