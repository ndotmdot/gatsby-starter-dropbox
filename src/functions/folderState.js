require('dotenv').config({ path: '.env' });
var fetch = require('isomorphic-fetch');
const Dropbox = require("dropbox/dist/Dropbox-sdk.min").Dropbox;

async function listFiles(dbx, path) {
  const files = await dbx.filesListFolder({ path })
  return files
}

export async function handler() {
  var dbx = new Dropbox({ accessToken: `${process.env.DROPBOX_TOKEN}`, fetch: fetch });
  const response = await handleMoveRequest(dbx, `${process.env.DROPBOX_BUILD_FOLDER}`)

  return {
    statusCode: 200,
    body: JSON.stringify({response}),
  }
}