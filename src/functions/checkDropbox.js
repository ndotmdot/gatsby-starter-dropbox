require('dotenv').config({ path: '.env' });
var fetch = require('isomorphic-fetch'); // or another library of choice.
const Dropbox = require("dropbox/dist/Dropbox-sdk.min").Dropbox;


async function listFiles(dbx, path,) {
  return dbx.filesListFolder({ path })
}

async function getData(dbx, path) {
  try {
    const files = await listFiles(dbx, path)
    return files
  } catch (e) {
    console.warn(e.error)
    return []
  }
}

export async function handler(event, context, callback) {
  var dbx = new Dropbox({ accessToken: `${process.env.DROPBOX_TOKEN}`, fetch: fetch });

  try {
    const data = await getData(dbx, `${process.env.DROPBOX_BUILD_FOLDER}`)
    console.log(data)
    callback(null, {
      statusCode: 200, 
      body: JSON.stringify({data}),
    })
  } catch(err) {
    callback(null, {
      statusCode: 400, 
      body: JSON.stringify({err}),
    })
  }
  // dbx.filesListFolder({path: `${process.env.DROPBOX_BUILD_FOLDER}`})
  // .then(function(response) {
    // callback(null, {
    //   statusCode: 200, 
    //   body: JSON.stringify({response}),
    // })
  // })
  // .catch(function(error) {
  //   callback(null, {
  //     statusCode: 400, 
  //     body: JSON.stringify({error}),
  //   })
  // });
}

