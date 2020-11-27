const signupcustModel = require("./Models/signupcustModel");
var express = require("express");
const router = express.Router();
const { checkAuth } = require("./passport");
var kafka = require("./Kafka/client");

router.get("/getAllUsers", checkAuth, (req, res) => {
  kafka.make_request("get_AllUsers", req.query, function (err, results) {
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

router.get("/allusers", checkAuth, (req, res) => {
  kafka.make_request("allusers", req.query, function (err, results) {
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

// router.get("/allusersfilter", checkAuth, (req, res) => {
//   kafka.make_request("allusersfilter", req.query, function (err, results) {
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

module.exports = router;
// var allusers = class allusers {
//   getAllUsers(req, res) {
//     const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
//     const skip = parseInt(req.query.skip);

//     console.log("skip and limit", req.query.limit, req.query.skip);
//     signupcustModel
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

//   searchallusers(req, res) {
//     signupcustModel.find({ fname: req.query.fname }, (error, result) => {
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
//         console.log(JSON.stringify(result));
//       }
//     });
//   }

//   filterallusers(req, res) {
//     signupcustModel.find({ city: req.query.city }, (error, result) => {
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
//         console.log(JSON.stringify(result));
//       }
//     });
//   }
// };

// module.exports = {
//   allusers: allusers,
// };
