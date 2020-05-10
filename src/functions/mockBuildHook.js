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

async function moveBy() {
  await setTimeout(() =>{
      callMoveHook()
  }, 5000)
}

export async function handler(event, context, callback) {
  const challenge = event.queryStringParameters.challenge
 
  const movvv = await moveBy();

  return {
    statusCode: 200,
    challenge,
    headers: {
      contentType: 'text/plain'
    },
    body: JSON.stringify('movvv')
  }
}
