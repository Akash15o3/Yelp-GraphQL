const signupcustModel = require("../Models/signupcustModel");
const mongoose = require("mongoose");

function handle_request(msg, callback) {
  console.log(
    "Inside Customer kafka backend handle request",
    msg.username,
    msg.password
  );
  signupcustModel
    .findOne({ email: msg.username, pass: msg.password })
    .then((user) => {
      console.log("User", user);
      return callback(null, user);
    })
    .catch((error) => {
      console.log("error user", user);
      return callback(null, error);
    });
}

exports.handle_request = handle_request;

// let handle_request = async (msg, callback) => {
//   let res = {};
//   let err = {};
//   try {
//     console.log("model", signupcustModel);
//     console.log("try", msg.username);
//     const customer = await signupcustModel.find({
//       email: "aggarwalakash15@gmail.com",
//     });
//     console.log("customer", customer);
//     if (customer) {
//       console.log("in try", customer);
//     }
//   } catch (err) {
//     console.log("error in catch", err);
//   }
// };
