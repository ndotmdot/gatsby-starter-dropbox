var peter = 1;

export function handler(event, context, callback) {
  console.log("queryStringParameters", event.queryStringParameters)
  peter += 1
  callback(null, {
    // return null to show no errors
    statusCode: 200, // http status code
    body: JSON.stringify({
      msg: "Hello, World! " + peter,
    }),
  })
}