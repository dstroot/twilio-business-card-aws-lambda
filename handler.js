"use strict";

const MessagingResponse = require("twilio").twiml.MessagingResponse;

// async version
exports.twilio = async function(event, context) {
  const twiml = new MessagingResponse();

  const response = {
    headers: {
      "Access-Control-Allow-Origin": "*", // CORS requirement
      "Content-Type": "text/plain"
    },
    statusCode: 200
  };

  let work = `
Daniel J. Stroot
Technical Strategy & Architecture
Pacific Life, Retirement Services Division
dan.stroot@pacificlife.com
+1 (949) 463-4044
https://pacificlife.com`;

  let personal = `
Dan Stroot
5 Leatherwood Court
Coto de Caza, CA 92679
+1 (949) 463-4044`;

  let social = `

--- Social ---
Blog: https://github.com/dstroot
GitHub: https://github.com/dstroot
LinkedIn: https://www.linkedin.com/in/danstroot/`;

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
    case "blog":
    case "social":
      twiml
        .message(work + social)
        .media("https://avatars3.githubusercontent.com/u/1438457?s=400&v=4");
      break;
    case "personal":
      twiml
        .message(personal + social)
        .media("https://avatars3.githubusercontent.com/u/1438457?s=400&v=4");
      break;
    default:
      twiml
        .message(work)
        .media("https://avatars3.githubusercontent.com/u/1438457?s=400&v=4");
      break;
  }

  return (response.body = twiml.toString("utf-8"));
};
