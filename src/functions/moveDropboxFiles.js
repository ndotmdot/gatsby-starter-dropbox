require('dotenv').config({ path: '.env' });
var fetch = require('isomorphic-fetch');
const Dropbox = require("dropbox/dist/Dropbox-sdk.min").Dropbox;

async function listFiles(dbx, path) {
  return await dbx.filesListFolder({ path }) 
}

async function createLockFolder(dbx, path) {
  return await dbx.filesCreateFolderV2({ path })
}

async function deleteLockFolder(dbx, path) {
  return await dbx.filesDeleteV2({ path })
}

function createMoveEntries(files) {
  const filesEntries = files.entries.filter(file => file.name !== '_Build_Lock')

  return filesEntries.map(file => {
    return {
      from_path: file.path_display,  
      to_path: file.path_display.substring(file.path_display.lastIndexOf('/'), file.path_display.length) 
    }
  })
}

// TODO: add ty catch
async function moveFiles(dbx, entries){  
  let response = await dbx.filesMoveBatchV2({
    entries, 
    autorename: true,
  })  

  const { async_job_id } = response  
  
  if (async_job_id) {  
    do {  
      response = await dbx.filesMoveBatchCheckV2({ async_job_id })  
    } while (response['.tag'] === 'in_progress')  
    return response
  }  
}

function checkNeedsMoving(files) {
  return files.entries.length > 0
}

async function handleMoveRequest(dbx, path) {
  const fileList = await listFiles(dbx, path)
  const needsMoving = checkNeedsMoving(fileList)

  if(needsMoving) {
    const lockFolder = `${process.env.DROPBOX_BUILD_FOLDER}/_Build_Lock`
    // await createLockFolder(dbx, lockFolder)

    const moveEntries = createMoveEntries(fileList)
    const fileMoveResponse = await moveFiles(dbx, moveEntries)

    await deleteLockFolder(dbx, lockFolder)

    return {
      msg: "Moved Files successfully",
      fileMoveResponse
    }
  } else {
    return {msg: "No Files to Move"}
  }
}

export async function handler() {
  var dbx = new Dropbox({ accessToken: `${process.env.DROPBOX_TOKEN}`, fetch: fetch });
  const response = await handleMoveRequest(dbx, `${process.env.DROPBOX_BUILD_FOLDER}`)

  return {
    statusCode: 200,
    body: JSON.stringify({response}),
  }
}