require('dotenv').config({ path: '.env' });
var fetch = require('isomorphic-fetch'); // or another library of choice.
const Dropbox = require("dropbox/dist/Dropbox-sdk.min").Dropbox;


async function listFiles(dbx, path) {
  return dbx.filesListFolder({ path })
}

async function listDropboxFiles(dbx, path) {
  try {
    const files = await listFiles(dbx, path)
    return files
  } catch (e) {
    console.warn(e.error)
    return []
  }
}

async function callBuildHook() {
  const dropboxStatus = {
    DropboxStatus: "New Files in update folder. Tying to call the buildhook..."
  }

  try {
    const response = await fetch('http://localhost:9000/callBuildHook');
    const jsonResponse = await response.json();
    return {...dropboxStatus, ...jsonResponse}
  } catch (error) {
    return {...dropboxStatus, ...error}
  }
}

async function callBuildHookIfNeeded(dbx, path) {
  const files = await listDropboxFiles(dbx, path)
  const shouldCallBuildHook = files.entries.length > 0 && true

  if(shouldCallBuildHook) {
    const buildHookResponse = await callBuildHook()
    return buildHookResponse
  }
  return {DropboxStatus: "No files in update folder. No need to trigger buildhook"}
}

export async function handler(event, context, callback) {
  var dbx = new Dropbox({ accessToken: `${process.env.DROPBOX_TOKEN}`, fetch: fetch });

  try {
    const buildStatus = await callBuildHookIfNeeded(dbx, `${process.env.DROPBOX_BUILD_FOLDER}`)

    callback(null, {
      statusCode: 200, 
      body: JSON.stringify({...buildStatus}),
    })
  } catch(err) {
    callback(null, {
      statusCode: 400, 
      body: JSON.stringify({err}),
    })
  }
}

