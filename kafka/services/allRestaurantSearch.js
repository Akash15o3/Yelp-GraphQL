const signuprestModel = require("../Models/signuprestModel");

async function handle_request(msg, callback) {
  //   console.log(msg.user_id);
  signuprestModel.find({ location: msg.location }, (error, user) => {
    if (error) {
      console.log("error-->");
      callback(error, "Error");
    } else {
      console.log(user);
      callback(null, user);
    }
    console.log("after callback");
  });
}

exports.handle_request = handle_request;

//   getAllRestSearch(req, res) {
//     signuprestModel.find({ location: req.query.location }, (error, result) => {
//       if (error) {
//         res.writeHead(500, {
//           "Content-Type": "text/plain",
//         });
//         res.end();
//       } else {
//         res.writeHead(200, {
//           "Content-Type": "application/json",
//         });
//         res.end(JSON.stringify(result));
//         console.log("CitySearchResult", JSON.stringify(result));
//       }
//     });
//   }
// };
