// var mysql = require("mysql");
// const { KafkaClient } = require("kafka-node");
const mongoose = require("mongoose");
const signupcustModel = require("./Models/signupcustModel");
const signuprestModel = require("./Models/signuprestModel");
var kafka = require("./Kafka/client");
const { auth } = require("./passport");
const { secret } = require("./config");
const jwt = require("jsonwebtoken");
auth();

const Schema = mongoose.Schema;

var login = class Login {
  login_cust(req, res) {
    console.log("connected");

    signupcustModel.findOne(
      { email: req.body.username, pass: req.body.password },
      (error, signupcust) => {
        if (error) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          res.end("Error Occured");
        }
        if (signupcust) {
          const payload = {
            _id: signupcust._id,
            username: signupcust.email,
            type: "Customer",
          };
          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000,
          });
          res.status(200).end("JWT " + token);
        } else {
          res.writeHead(401, {
            "Content-Type": "text/plain",
          });
          res.end("Invalid Credentials");
        }
      }
    );
  }

  login_rest(req, res) {
    console.log("connected");

    signuprestModel.findOne(
      { email: req.body.username, pass: req.body.password },
      (error, signuprest) => {
        if (error) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          res.end("Error Occured");
        }
        if (signuprest) {
          const payload = {
            _id: signuprest._id,
            username: signuprest.email,
            type: "Restaurant",
          };
          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000,
          });
          res.status(200).end("JWT " + token);
        } else {
          res.writeHead(401, {
            "Content-Type": "text/plain",
          });
          res.end("Invalid Credentials");
        }
      }
    );
  }
};

module.exports = {
  login,
};

// login_cust(req, res) {
//   kafka.make_request("login_cust", req.body, function (err, results) {
//     console.log("error in login", err);
//     console.log("in result", results);
//     if (err) {
//       res.status(500).end("Error Occured");
//     } else {
//       const payload = {
//         _id: results._id,
//         username: results.email,
//         type: "Customer",
//       };
//       const token = jwt.sign(payload, secret, {
//         expiresIn: 1008000,
//       });
//       res.status(200).end("JWT " + token);
//     }
//   });
// }

// login_rest(req, res) {
//   kafka.make_request("login_rest", req.body, function (err, results) {
//     console.log("error in login", err);
//     console.log("in result", results);
//     if (err) {
//       res.status(500).end("Error Occured");
//     } else {
//       const payload = {
//         _id: results._id,
//         username: results.email,
//         type: "Restaurant",
//       };
//       const token = jwt.sign(payload, secret, {
//         expiresIn: 1008000,
//       });
//       res.status(200).end("JWT " + token);
//     }
//   });
// }
