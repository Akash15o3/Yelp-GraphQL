const dishModel = require("./Models/dishModel");
const signuprestModel = require("./Models/signuprestModel");

var express = require("express");
const router = express.Router();
const { checkAuth } = require("./passport");
var kafka = require("./Kafka/client");

router.get("/getAllRest", checkAuth, (req, res) => {
  kafka.make_request("get_AllRest", req.query, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      res.status(500).end("Error Occured");
    } else {
      //console.log("Inside else");
      //console.log(results);
      var JSONStr = JSON.stringify(results);
      console.log("JSON stringify sent to front end", JSONStr);
      res.status(200).end(JSONStr);
    }
  });
});

router.get("/allrestsearch", checkAuth, (req, res) => {
  kafka.make_request("get_AllRestSearch", req.query, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      res.status(500).end("Error Occured");
    } else {
      //console.log("Inside else");
      //console.log(results);
      var JSONStr = JSON.stringify(results);
      console.log("JSON stringify sent to front end", JSONStr);
      res.status(200).end(JSONStr);
    }
  });
});

module.exports = router;

// var rest = class rest {
//   getAllRest(req, res) {
//     const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
//     const skip = parseInt(req.query.skip);
//     signuprestModel
//       .find({}, (error, result) => {
//         if (error) {
//           res.writeHead(500, {
//             "Content-Type": "text/plain",
//           });
//           res.end();
//         } else {
//           res.writeHead(200, {
//             "Content-Type": "application/json",
//           });
//           res.end(JSON.stringify(result));
//           console.log(JSON.stringify(result));
//         }
//       })
//       .skip(skip)
//       .limit(limit);
//   }

//   getAllRestSearch(req, res) {
//     signuprestModel.find({ location: req.query.location }, (error, result) => {
//       if (error) {
//         res.writeHead(500, {
//           "Content-Type": "text/plain",
//         });
//         res.end();
//       } else {
//         res.writeHead(200, {
//           "Content-Type": "application/json",
//         });
//         res.end(JSON.stringify(result));
//         console.log("CitySearchResult", JSON.stringify(result));
//       }
//     });
//   }
// };

// module.exports = {
//   rest: rest,
// };
