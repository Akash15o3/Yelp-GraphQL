const dishModel = require("../Models/dishModel");
const orderdishModel = require("../Models/orderDishModel");
const signuprestModel = require("../Models/signuprestModel");
const eventModel = require("../Models/eventModel");
const registeredeventModel = require("../Models/registeredEvents");

async function handle_request(msg, callback) {
  console.log("Inside book kafka backend");

  eventModel.find({ eventname: msg.eventname }, (error, user) => {
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
