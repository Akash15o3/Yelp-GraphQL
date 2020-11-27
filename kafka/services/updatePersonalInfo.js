const signupcustModel = require("../Models/signupcustModel");

function handle_request(msg, callback) {
  var updatecust = {
    customerID: msg.customerID,
    fname: msg.fname,
    lname: msg.lname,
    email: msg.email,
    pass: msg.pass,
    dateofbirth: msg.dateofbirth,
    city: msg.city,
    State: msg.State,
    country: msg.country,
    phonenumber: msg.phonenumber,
    nickname: msg.nickname,
    yelpingsince: msg.yelpingsince,
    thingsilove: msg.thingsilove,
    about: msg.about,
    findmein: msg.findmein,
    myblog: msg.myblog,
  };
  signupcustModel.updateOne(
    { email: msg.email },
    { $set: updatecust },
    (error, user) => {
      if (error) {
        console.log("error-->");
        callback(error, "Error");
      } else {
        console.log(user);
        callback(null, user);
      }
      console.log("after callback");
    }
  );
}

exports.handle_request = handle_request;

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
