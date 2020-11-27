const signuprestModel = require("../Models/signuprestModel");

async function handle_request(msg, callback) {
  const limit = parseInt(msg.limit); // Make sure to parse the limit to number
  const skip = parseInt(msg.skip);

  console.log(
    "Inside book kafka backend:SKIP AND LIMIT FOR RESTZ",
    msg.skip,
    msg.limit
  );
  //   console.log(msg.user_id);
  signuprestModel
    .find({}, (error, user) => {
      if (error) {
        console.log("error-->");
        callback(error, "Error");
      } else {
        console.log(user);
        callback(null, user);
      }
      console.log("after callback");
    })
    .skip(skip)
    .limit(limit);
}

exports.handle_request = handle_request;

//     const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
//     const skip = parseInt(req.query.skip);
//     signuprestModel
//       .find({}, (error, result) => {
//         if (error) {
//           res.writeHead(500, {
//             "Content-Type": "text/plain",
//           });
//           res.end();
//         } else {
//           res.writeHead(200, {
//             "Content-Type": "application/json",
//           });
//           res.end(JSON.stringify(result));
//           console.log(JSON.stringify(result));
//         }
//       })
//       .skip(skip)
//       .limit(limit);
//
