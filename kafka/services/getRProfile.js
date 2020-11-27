const signuprestModel = require("../Models/signuprestModel");

async function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  console.log(msg.user_id);
  signuprestModel.find({ email: msg.email }, (error, user) => {
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
