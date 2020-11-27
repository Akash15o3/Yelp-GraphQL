const followerModel = require("./Models/followerModel");

const signupcustModel = require("./Models/signupcustModel");
var express = require("express");
const router = express.Router();
const { checkAuth } = require("./passport");
var kafka = require("./Kafka/client");

// router.post("/insertFollower", checkAuth, (req, res) => {
//   kafka.make_request("insertFollower", req.query, function (err, results) {
//     console.log("in result");
//     console.log(results);
//     if (err) {
//       res.status(500).end("Error Occured");
//     } else {
//       //console.log("Inside else");
//       //console.log(results);
//       var JSONStr = JSON.stringify(results);
//       console.log("JSON stringify sent to front end", JSONStr);
//       res.status(200).end(JSONStr);
//     }
//   });
// });

// router.get("/getFollowers", checkAuth, (req, res) => {
//   kafka.make_request("getFollowers", req.query, function (err, results) {
//     console.log("in result");
//     console.log(results);
//     if (err) {
//       res.status(500).end("Error Occured");
//     } else {
//       //console.log("Inside else");
//       //console.log(results);
//       var JSONStr = JSON.stringify(results);
//       console.log("JSON stringify sent to front end", JSONStr);
//       res.status(200).end(JSONStr);
//     }
//   });
// });

// module.exports = router;

var follower = class follower {
  insertFollower(req, res) {
    console.log("connected");
    var newfollower = new followerModel({
      customername: req.body.customername,
      followcustomerfname: req.body.followcustomerfname,
      followcustomerlname: req.body.followcustomerlname,
      followcustomercity: req.body.followcustomercity,
      followcustomerstate: req.body.followcustomerstate,
      followcustomercountry: req.body.followcustomercountry,
      followcustomerabout: req.body.followcustomerabout,
    });
    console.log("yes");
    console.log(newfollower);
    followerModel.findOne(
      { customername: req.body.customername },
      (error, follower) => {
        if (error) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });

          res.end();
        } else {
          newfollower.save((error, data) => {
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
              res.end("Follower details added");
            }
          });
        }
      }
    );
  }
  getFollower(req, res) {
    console.log("TESTING ----", req.body);
    followerModel.find(
      { customername: req.query.customername },
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
          console.log("AAAAAAA", JSON.stringify(result));
        }
      }
    );
  }
};
module.exports = {
  follower,
};
