const messageModel = require("../Models/messageModel");

function handle_request(msg, callback) {
  var newmessage = new messageModel({
    restaurantname: msg.restaurantnameformessage,
    restaurantemail: msg.restaurantemailformessage,
    customername: msg.customernameformessage,
    customeremail: msg.customeremailformessage,
    message: [
      {
        messageContent: msg.message,

        messageSender: msg.sender, //Restaurant or Customer
      },
    ],
  });
  messageModel.findOne(
    {
      restaurantemail: msg.restaurantemailformessage,
      customeremail: msg.customeremailformessage,
    },
    (error, found) => {
      if (error) {
        console.log("error-->");
        callback(error, "Error");
      }
      if (found) {
        messageModel.updateOne(
          {
            restaurantemail: msg.restaurantemailformessage,
            customeremail: msg.customeremailformessage,
          },
          {
            $push: {
              message: {
                messageContent: msg.message,
                messageSender: msg.sender,
              },
            },
          },
          (error, inserted) => {
            if (error) {
              console.log("error-->");
              callback(error, "Error");
            } else {
              console.log("inserted-->");
              callback(null, inserted);
            }
          }
        );
      } else {
        newmessage.save((error, inserted) => {
          if (error) {
            console.log("error-->");
            callback(error, "Error");
          } else {
            console.log("inserted-->");
            callback(null, inserted);
          }
        });
      }
    }
  );
}

exports.handle_request = handle_request;

// var newmessage = new messageModel({
//     restaurantname: req.body.restaurantnameformessage,
//     restaurantemail: req.body.restaurantemailformessage,
//     customername: req.body.customernameformessage,
//     customeremail: req.body.customeremailformessage,
//     message: [
//       {
//         messageContent: req.body.message,

//         messageSender: req.body.sender, //Restaurant or Customer
//       },
//     ],
//   });
//   console.log("yes");
//   console.log(newmessage);
//   messageModel.findOne(
//     {
//       restaurantemail: req.body.restaurantemailformessage,
//       customeremail: req.body.customeremailformessage,
//     },
//     (error, found) => {
//       if (error) {
//         res.writeHead(500, {
//           "Content-Type": "text/plain",
//         });

//         res.end();
//       }
//       if (found) {
//         console.log("in if");
//         messageModel.updateOne(
//           {
//             restaurantemail: req.body.restaurantemailformessage,
//             customeremail: req.body.customeremailformessage,
//           },
//           {
//             $push: {
//               message: [
//                 {
//                   messageContent: req.body.message,
//                   messageSender: req.body.sender,
//                 },
//               ],
//             },
//           },
//           (err, found) => {
//             if (err) {
//               res.writeHead(500, {
//                 "Content-Type": "text/plain",
//               });
//               console.log(err);
//               res.end();
//             } else {
//               res.writeHead(200, {
//                 "Content-Type": "text/plain",
//               });
//               res.end("Message  updated");
//             }
//           }
//         );

//         console.log("after update");
//       } else {
//         newmessage.save((error, data) => {
//           if (error) {
//             res.writeHead(500, {
//               "Content-Type": "text/plain",
//             });
//             console.log(error);
//             res.end();
//           } else {
//             res.writeHead(200, {
//               "Content-Type": "text/plain",
//             });
//             res.end("message details added");
//           }
//         });
//       }
//     }
//   );
