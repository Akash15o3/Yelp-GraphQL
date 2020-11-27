var express = require("express");
const router = express.Router();
const { checkAuth } = require("./passport");
var kafka = require("./Kafka/client");
const signupcustModel = require("./Models/signupcustModel");

router.get("/cust_profile", checkAuth, (req, res) => {
  kafka.make_request("get_Profile", req.query, function (err, results) {
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

router.post("/updatePersonal", checkAuth, (req, res) => {
  kafka.make_request("update_Pers", req.body, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      res.status(500).end("Error Occured");
    } else {
      console.log("Inside else");
      console.log(results);
      var JSONStr = JSON.stringify(results);
      res.status(200).end(JSONStr);
    }
  });
});

// router.post("/updateProfPic", checkAuth, (req, res) => {
//   kafka.make_request("update_Pic", req.body, function (err, results) {
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

module.exports = router;
// var profile = class profile {
//   getbasicinfo(req, res) {
//     console.log(req.query);
//     console.log(req.query.email);
//     signupcustModel.findOne({ email: req.query.email }, (error, result) => {
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

//   gettestcust(req, res) {
//     // console.log(req.query);
//     // console.log(req.query.email);
//     signupcustModel.findOne({ email: req.body.email }, (error, result) => {
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

//   updatebasicinfo(req, res) {
//     var updatecust = {
//       customerID: req.body.customerID,
//       fname: req.body.fname,
//       lname: req.body.lname,
//       email: req.body.email,
//       pass: req.body.pass,
//       dateofbirth: req.body.dateofbirth,
//       city: req.body.city,
//       State: req.body.State,
//       country: req.body.country,
//       phonenumber: req.body.phonenumber,
//       nickname: req.body.nickname,
//       yelpingsince: req.body.yelpingsince,
//       thingsilove: req.body.thingsilove,
//       about: req.body.about,
//       findmein: req.body.findmein,
//       myblog: req.body.myblog,
//     };
//     console.log(updatecust);
//     signupcustModel.updateOne(
//       { email: req.body.email },
//       { $set: updatecust },
//       (err, signupcust) => {
//         if (err) {
//           res.writeHead(500, {
//             "Content-Type": "text/plain",
//           });
//           console.log(err);
//           res.end();
//         } else {
//           res.writeHead(200, {
//             "Content-Type": "text/plain",
//           });
//           res.end("Customer details updated");
//         }
//       }
//     );
//   }

//   updateprofinfo(req, res) {
//     var updateStatus = {
//       prof_pic: req.body.prof_pic,
//     };

//     signupcustModel.updateOne(
//       { email: req.body.customeremail },
//       { $set: updateStatus },
//       (err, signupcust) => {
//         if (err) {
//           res.writeHead(500, {
//             "Content-Type": "text/plain",
//           });
//           console.log(err);
//           res.end();
//         } else {
//           res.writeHead(200, {
//             "Content-Type": "text/plain",
//           });
//           res.end("Profile Pic  updated");
//         }
//       }
//     );
//   }
// };

// module.exports = {
//   profile,
// };
