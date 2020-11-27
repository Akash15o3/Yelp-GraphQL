const dishModel = require("../Models/dishModel");
const orderdishModel = require("../Models/orderDishModel");
const signuprestModel = require("../Models/signuprestModel");
const eventModel = require("../Models/eventModel");
const registeredeventModel = require("../Models/registeredEvents");
const signupcustModel = require("../Models/signupcustModel");

async function handle_request(msg, callback) {
  console.log("Inside book kafka backend");

  const limit = parseInt(msg.limit); // Make sure to parse the limit to number
  const skip = parseInt(msg.skip);
  signupcustModel
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
