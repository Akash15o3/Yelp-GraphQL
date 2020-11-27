const dishModel = require("../Models/dishModel");
const orderdishModel = require("../Models/orderDishModel");
const signuprestModel = require("../Models/signuprestModel");
const eventModel = require("../Models/eventModel");
const registeredeventModel = require("../Models/registeredEvents");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  var newevent = new eventModel({
    // restaurantname: msg.rest_name,
    restaurantemail: msg.restaurantemail,
    restaurantname: msg.restaurantname,
    customeremail: " ",
    customername: " ",
    eventID: msg.eventID,
    eventname: msg.eventname,
    location: msg.location,
    description: msg.description,
    date: msg.date,
    timeofevent: msg.timeofevent,
    hashtag: msg.hashtag,
    // timestamp: msg.timestamp,
  });

  eventModel.find(
    { restaurantemail: msg.restaurantemail },
    newevent.save((error, user) => {
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
