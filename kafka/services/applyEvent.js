const dishModel = require("../Models/dishModel");
const orderdishModel = require("../Models/orderDishModel");
const signuprestModel = require("../Models/signuprestModel");
const eventModel = require("../Models/eventModel");
const registeredeventModel = require("../Models/registeredEvents");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  var applyevent = new registeredeventModel({
    // restaurantname: msg.rest_name,
    restaurantemail: msg.restaurantemail,
    restaurantname: msg.restaurantname,
    customeremail: msg.customeremail,
    customername: " ",
    eventID: msg.eventID,
    eventname: msg.eventname,
    location: msg.location,
    description: msg.description,
    date: msg.date,
    timeofevent: msg.timeofevent,
    hashtag: msg.hashtag,
  });

  registeredeventModel.find(
    { customeremail: msg.customeremail },
    applyevent.save((error, user) => {
      if (error) {
        console.log("error-->");
        callback(error, "Error");
      } else {
        console.log(user);
        callback(null, user);
      }
      console.log("after callback");
    })
  );
}

exports.handle_request = handle_request;
