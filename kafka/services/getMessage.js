const messageModel = require("../Models/messageModel");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  // console.log(msg.user_id);
  messageModel
    .find({
      $or: [
        { restaurantemail: msg.restaurantemail },
        { customeremail: msg.customeremail },
      ],
    })
    .then((user) => {
      console.log(user);
      callback(null, user);
    })
    .catch((error) => {
      console.log(user);
      callback(null, error);
    });
}

exports.handle_request = handle_request;
// messageModel.find(
//     {
//       $or: [
//         { restaurantemail: req.query.restaurantemail },
//         { customeremail: req.query.customeremail },
//       ],
//     },
//     (error, result) => {
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
//         console.log("Message back result", JSON.stringify(result));
//       }
//     }
//   );
