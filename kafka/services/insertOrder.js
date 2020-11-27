const dishModel = require("../Models/dishModel");
const orderdishModel = require("../Models/orderDishModel");
const signuprestModel = require("../Models/signuprestModel");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  var neworder = new orderdishModel({
    restaurantEmailForOrder: msg.restaurantEmailForOrder,
    customerEmailForOrder: msg.customerEmailForOrder,
    restaurantNameForOrder: msg.restaurantNameForOrder,
    customerNameForOrder: msg.customerNameForOrder,
    dishOrder: msg.dishOrder,
    status: msg.status,
    deliveryType: msg.deliveryType,
    pickupStatus: msg.pickupStatus,
    deliveryStatus: msg.deliveryStatus,
    timeOfOrder: msg.timeOfOrder,
  });

  orderdishModel.find(
    { restaurantEmailForOrder: msg.restaurantEmailForOrder },
    neworder.save((error, user) => {
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
//   insertOrder(req, res) {
//     console.log("connected");
//     var neworder = new orderdishModel({
//       restaurantEmailForOrder: req.body.restaurantEmailForOrder,
//       customerEmailForOrder: req.body.customerEmailForOrder,
//       restaurantNameForOrder: req.body.restaurantNameForOrder,
//       customerNameForOrder: req.body.customerNameForOrder,
//       dishOrder: req.body.dishOrder,
//       status: req.body.status,
//       deliveryType: req.body.deliveryType,
//       pickupStatus: req.body.pickupStatus,
//       deliveryStatus: req.body.deliveryStatus,
//       timeOfOrder: req.body.timeOfOrder,
//     });
//     console.log("yes");
//     console.log(neworder);
//     orderdishModel.findOne(
//       { restaurantEmailForOrder: req.body.restaurantEmailForOrder },
//       (error, orderdish) => {
//         if (error) {
//           res.writeHead(500, {
//             "Content-Type": "text/plain",
//           });

//           res.end();
//         } else {
//           neworder.save((error, data) => {
//             if (error) {
//               res.writeHead(500, {
//                 "Content-Type": "text/plain",
//               });
//               console.log(error);
//               res.end();
//             } else {
//               res.writeHead(200, {
//                 "Content-Type": "text/plain",
//               });
//               res.end("Order details added");
//             }
//           });
//         }
//       }
//     );
