const signuprestModel = require("../Models/signuprestModel");

function handle_request(msg, callback) {
  var updaterest = {
    customerID: msg.customerID,
    restaurantID: msg.id,
    name: msg.rest_name,
    email: msg.email,
    location: msg.location,
    description: msg.des,
    contact: msg.contact,
    timing: msg.timing,
    reviews: msg.reviews,
    website: msg.website,
  };
  signuprestModel.updateOne(
    { email: msg.email },
    { $set: updaterest },
    (error, user) => {
      if (error) {
        console.log("error-->");
        callback(error, "Error");
      } else {
        console.log(user);
        callback(null, user);
      }
      console.log("after callback");
    }
  );
}

exports.handle_request = handle_request;
