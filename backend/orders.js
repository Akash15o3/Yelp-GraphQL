const orderdishModel = require("./Models/orderDishModel");
const signuprestModel = require("./Models/signuprestModel");
var express = require("express");
const router = express.Router();
const { checkAuth } = require("./passport");
var kafka = require("./Kafka/client");

// router.post("/insertOrder", checkAuth, (req, res) => {
//   kafka.make_request("insert_Order", req.body, function (err, results) {
//     console.log("in result");
//     console.log(results);
//     if (err) {
//       res.status(500).end("Error Occured");
//     } else {
//       console.log("Inside else");
//       console.log(results);
//       var JSONStr = JSON.stringify(results);
//       res.status(200).end(JSONStr);
//     }
//   });
// });
// module.exports = router;
var orders = class orders {
  insertOrder(req, res) {
    console.log("connected");
    var neworder = new orderdishModel({
      restaurantEmailForOrder: req.body.restaurantEmailForOrder,
      customerEmailForOrder: req.body.customerEmailForOrder,
      restaurantNameForOrder: req.body.restaurantNameForOrder,
      customerNameForOrder: req.body.customerNameForOrder,
      dishOrder: req.body.dishOrder,
      status: req.body.status,
      deliveryType: req.body.deliveryType,
      pickupStatus: req.body.pickupStatus,
      deliveryStatus: req.body.deliveryStatus,
      timeOfOrder: req.body.timeOfOrder,
    });
    console.log("yes");
    console.log(neworder);
    orderdishModel.findOne(
      { restaurantEmailForOrder: req.body.restaurantEmailForOrder },
      (error, orderdish) => {
        if (error) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });

          res.end();
        } else {
          neworder.save((error, data) => {
            if (error) {
              res.writeHead(500, {
                "Content-Type": "text/plain",
              });
              console.log(error);
              res.end();
            } else {
              res.writeHead(200, {
                "Content-Type": "text/plain",
              });
              res.end("Order details added");
            }
          });
        }
      }
    );
  }

  getCustOrder(req, res) {
    console.log("My Cust Email", req.query.customerEmailForOrder);
    const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
    const skip = parseInt(req.query.skip);
    var mysort = { timestamp: 1 };
    orderdishModel
      .find(
        { customerEmailForOrder: req.query.customerEmailForOrder },
        (error, result) => {
          if (error) {
            res.writeHead(500, {
              "Content-Type": "text/plain",
            });
            res.end();
          } else {
            res.writeHead(200, {
              "Content-Type": "application/json",
            });
            res.end(JSON.stringify(result));
          }
        }
      )
      .skip(skip)
      .limit(limit)
      .sort(mysort);
  }
  getCustOrderDesc(req, res) {
    console.log("My Cust Email", req.query.customerEmailForOrder);
    const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
    const skip = parseInt(req.query.skip);
    var mysort = { timestamp: -1 };
    orderdishModel
      .find(
        { customerEmailForOrder: req.query.customerEmailForOrder },
        (error, result) => {
          if (error) {
            res.writeHead(500, {
              "Content-Type": "text/plain",
            });
            res.end();
          } else {
            res.writeHead(200, {
              "Content-Type": "application/json",
            });
            res.end(JSON.stringify(result));
          }
        }
      )
      .skip(skip)
      .limit(limit)
      .sort(mysort);
  }

  getRestOrder(req, res) {
    console.log("My Rest Email", req.query.restaurantEmailForOrder);
    const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
    const skip = parseInt(req.query.skip);
    orderdishModel
      .find(
        { restaurantEmailForOrder: req.query.restaurantEmailForOrder },
        (error, result) => {
          if (error) {
            res.writeHead(500, {
              "Content-Type": "text/plain",
            });
            res.end();
          } else {
            res.writeHead(200, {
              "Content-Type": "application/json",
            });
            res.end(JSON.stringify(result));
            console.log(
              "response for page of restaurant order",
              JSON.stringify(result)
            );
          }
        }
      )
      .skip(skip)
      .limit(limit);
  }

  getRestByStatus(req, res) {
    console.log("My Order Status", req.query.status);
    // const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
    // const skip = parseInt(req.query.skip);
    orderdishModel.find(
      {
        status: req.query.status,
        restaurantEmailForOrder: req.query.restaurantEmailForOrder,
      },
      (error, result) => {
        if (error) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          res.end();
        } else {
          res.writeHead(200, {
            "Content-Type": "application/json",
          });
          res.end(JSON.stringify(result));
          console.log(
            "response for Filter  of restaurant order",
            JSON.stringify(result)
          );
        }
      }
    );
  }

  getCustByStatus(req, res) {
    console.log("My Order Status", req.query.status);
    // const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
    // const skip = parseInt(req.query.skip);
    orderdishModel.find(
      {
        status: req.query.status,
        customerEmailForOrder: req.query.customerEmailForOrder,
      },
      (error, result) => {
        if (error) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          res.end();
        } else {
          res.writeHead(200, {
            "Content-Type": "application/json",
          });
          res.end(JSON.stringify(result));
          console.log(
            "response for Filter  of customer order",
            JSON.stringify(result)
          );
        }
      }
    );
  }

  updateOrderStatus(req, res) {
    var updateStatus = {
      // customerEmailForOrder: { type: String, required: false },
      // restaurantEmailForOrder: { type: String, required: false },
      // customerNameForOrder: { type: String, required: false },
      // restaurantNameForOrder: { type: String, required: false },
      // dishOrder: { type: Array, required: false },
      status: req.body.updatedStatus,
      // deliveryType: { type: String, required: false },
      // pickupStatus: { type: String, required: false },
      // deliveryStatus: { type: String, required: false },
      //  timeOfOrder: { type: String, required: false },
    };

    orderdishModel.updateOne(
      { timeOfOrder: req.body.timestamp },
      { $set: updateStatus },
      (err, orderdish) => {
        if (err) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          console.log(err);
          res.end();
        } else {
          res.writeHead(200, {
            "Content-Type": "text/plain",
          });
          res.end("Order Status  updated");
        }
      }
    );
  }
};

module.exports = {
  orders,
};
