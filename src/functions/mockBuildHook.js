require('dotenv').config({ path: '.env' });

async function callMoveHook() {

  try {
    const response = await fetch(`${process.env.MOCK_DROPBOX_MOVE_FILES_HOOK}`, {
      method: 'post',
      body:    JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
  });
    const jsonResponse = await response.json();

    return {jsonResponse}
  } catch (e) {
    return {error: "Can't reach dropbox move function"}
  }
}

export async function handler(event, context, callback) {
  const challenge = event.queryStringParameters.challenge

  const moveHookResponse = await callMoveHook()

  callback(null, {
    statusCode: 200,
    challenge,
    headers: {
      contentType: 'text/plain'
    },
    body: JSON.stringify(moveHookResponse)
  })
}