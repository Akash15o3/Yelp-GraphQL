const signupcustModel = require("../Models/signupcustModel");

function handle_request(msg, callback) {
  console.log("MSG FOR PROFIC PIC UPDATE", msg.prof_pic, msg.customeremail);
  var updatecust = {
    prof_pic: msg.prof_pic,
  };
  signupcustModel.updateOne(
    { email: msg.customeremail },
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
