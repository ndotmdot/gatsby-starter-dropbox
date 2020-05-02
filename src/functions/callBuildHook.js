export function handler(event, context, callback) {
  console.log("queryStringParameters", event.queryStringParameters)
  const challenge = event.queryStringParameters.challenge

  callback(null, {
    statusCode: 200,
    challenge,
    headers: {
      contentType: 'text/plain'
    },
    body: challenge,
  })
}