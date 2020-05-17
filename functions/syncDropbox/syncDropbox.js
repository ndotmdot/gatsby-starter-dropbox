const dropboxTriggerNetlify = require('dropbox-trigger-netlify')

exports.handler = async (event) => {
  try {

    const response = await dropboxTriggerNetlify.handleEvent(event, {
      dropboxToken: process.env.DROPBOX_TOKEN,
      buildHook: process.env.BUILD_HOOK,
    })

    return {
      statusCode: 200,
      body: response
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
