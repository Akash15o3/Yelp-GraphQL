const Rest_Profile = require("../Models/signuprestModel");
const mongoose = require("mongoose");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  Rest_Profile.findOne({ email: msg.username, pass: msg.password })
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
