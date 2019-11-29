const MessagingResponse = require("twilio").twiml.MessagingResponse;

// lambda function (async)
exports.twilio = async function(event) {
  // logging
  console.info(event);

  // create a message
  const twiml = new MessagingResponse();
  const message = twiml.message();

  // html response
  const response = {
    headers: {
      "Access-Control-Allow-Origin": "*", // CORS requirement
      "Content-Type": "text/plain"
    },
    statusCode: 200
  };

  let business = `
Daniel J. Stroot
Technical Strategy & Architecture
Pacific Life, Retirement Services
dan.stroot@pacificlife.com
+1 (949) 219 7873`;

  let personal = `
Dan Stroot
5 Leatherwood Court
Coto de Caza, CA 92679
dan.stroot@gmail.com
+1 (949) 463-4044`;

  // NOTE: local and production events don't match. Locally, the data we need is found in
  // `event.Body` but in production it shows up in`event.body.Body`. Sheesh...
  let body;
  if (typeof event.body !== "undefined") {
    body = event.body.Body ? event.body.Body.toLowerCase() : null;
  }
  if (typeof event.Body !== "undefined") {
    body = event.Body ? event.Body.toLowerCase() : null;
  }

  // check body
  if (body === null) {
    const error = new Error("body cannot be null");
    return error;
  }

  // format message
  switch (body) {
    case "personal":
      message.body(personal);
      message.media(
        "https://s3-us-west-2.amazonaws.com/aws-s3-hosting-90278/Dan+Stroot.vcf"
      );
      message.media(
        "https://avatars3.githubusercontent.com/u/1438457?s=280&v=4"
      );
      break;
    default:
      message.body(business);
      message.media(
        "https://s3-us-west-2.amazonaws.com/aws-s3-hosting-90278/Daniel+J.+Stroot.vcf"
      );
      message.media(
        "https://avatars3.githubusercontent.com/u/1438457?s=280&v=4"
      );
      break;
  }

  return (response.body = twiml.toString("utf-8"));
};
