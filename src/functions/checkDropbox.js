require('dotenv').config({ path: '.env' });
var fetch = require('isomorphic-fetch'); // or another library of choice.
const Dropbox = require("dropbox/dist/Dropbox-sdk.min").Dropbox;


export async function handler(event, context, callback) {
  var dbx = new Dropbox({ accessToken: `${process.env.DROPBOX_TOKEN}`, fetch: fetch });

  dbx.filesListFolder({path: process.env.DROPBOX_BUILD_FOLDER})
  .then(function(response) {
    callback(null, {
      statusCode: 200, 
      body: JSON.stringify({response}),
    })
  })
  .catch(function(error) {
    callback(null, {
      statusCode: 400, 
      body: JSON.stringify({error}),
    })
  });
}