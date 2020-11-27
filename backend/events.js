const eventModel = require("./Models/eventModel");
const signuprestModel = require("./Models/signuprestModel");
const registeredeventModel = require("./Models/registeredEvents");

var express = require("express");
const router = express.Router();
const { checkAuth } = require("./passport");
var kafka = require("./Kafka/client");

router.post("/addEvent", checkAuth, (req, res) => {
  kafka.make_request("insert_Event", req.body, function (err, results) {
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

router.get("/getEvent", checkAuth, (req, res) => {
  kafka.make_request("get_Event", req.query, function (err, results) {
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

router.get("/getAllEvents", checkAuth, (req, res) => {
  kafka.make_request("get_AllEvent", req.query, function (err, results) {
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

router.get("/getAllEventsDesc", checkAuth, (req, res) => {
  kafka.make_request("get_AllEventDesc", req.query, function (err, results) {
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

router.post("/applyEvent", checkAuth, (req, res) => {
  kafka.make_request("apply_Event", req.body, function (err, results) {
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

router.get("/getAppliedEvents", checkAuth, (req, res) => {
  kafka.make_request("get_AppliedEvent", req.query, function (err, results) {
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

router.get("/alleventssearch", checkAuth, (req, res) => {
  kafka.make_request("alleventssearch", req.query, function (err, results) {
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

// var events = class events {
//   addevent(req, res) {
//     console.log("Body", req.body);
//     var newevent = new eventModel({
//       // restaurantname: req.body.rest_name,
//       restaurantemail: req.body.restaurantemail,
//       restaurantname: req.body.restaurantname,
//       customeremail: " ",
//       customername: " ",
//       eventID: req.body.eventID,
//       eventname: req.body.eventname,
//       location: req.body.location,
//       description: req.body.description,
//       date: req.body.date,
//       timeofevent: req.body.timeofevent,
//       hashtag: req.body.hashtag,
//     });
//     console.log("yes");
//     console.log("newevent", newevent);
//     eventModel.findOne(
//       { restaurantemail: req.body.restaurantemail },
//       (error, event) => {
//         if (error) {
//           res.writeHead(500, {
//             "Content-Type": "text/plain",
//           });

//           res.end();
//         } else {
//           newevent.save((error, data) => {
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
//               res.end("Event details added");
//             }
//           });
//         }
//       }
//     );
//   }

//   getevent(req, res) {
//     const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
//     const skip = parseInt(req.query.skip);
//     registeredeventModel.find(
//       { restaurantemail: req.query.restaurantemail },
//       (error, result) => {
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
//         }
//       }
//     );
//     // .skip(skip)
//     // .limit(limit);
//   }

//   getAllEvent(req, res) {
//     var mysort = { timestamp: 1 };
//     eventModel
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
//       .sort(mysort);
//   }
//   getAllEventDesc(req, res) {
//     var mysort = { timestamp: -1 };
//     eventModel
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
//       .sort(mysort);
//   }

//   getalleventssearch(req, res) {
//     eventModel.find({ eventname: req.query.eventname }, (error, result) => {
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
//         console.log("search event result", JSON.stringify(result));
//       }
//     });
//   }

//   applyEvent(req, res) {
//     console.log("Body", req.body);
//     var applyevent = new registeredeventModel({
//       restaurantemail: req.body.restaurantemail,
//       restaurantname: req.body.restaurantname,
//       customeremail: req.body.customeremail,
//       customername: " ",
//       eventID: req.body.eventID,
//       eventname: req.body.eventname,
//       location: req.body.location,
//       description: req.body.description,
//       date: req.body.date,
//       timeofevent: req.body.timeofevent,
//       hashtag: req.body.hashtag,
//     });
//     console.log("yes");
//     console.log("applyevent", applyevent);
//     registeredeventModel.find(
//       { customeremail: req.body.customeremail },
//       (error, registeredevent) => {
//         if (error) {
//           res.writeHead(500, {
//             "Content-Type": "text/plain",
//           });

//           res.end();
//         } else {
//           applyevent.save((error, data) => {
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
//               res.end("Event Applied");
//             }
//           });
//         }
//       }
//     );
//   }

//   getAppliedEvents(req, res) {
//     console.log("TESTING ----", req.body);
//     registeredeventModel.find(
//       { customeremail: req.query.customeremail },
//       (error, result) => {
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
//           console.log("AAAAAAA", JSON.stringify(result));
//         }
//       }
//     );
//   }
// };

// module.exports = {
//   events: events,
// };
