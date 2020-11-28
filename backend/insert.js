const signupcustModel = require("./Models/signupcustModel");
const signuprestModel = require("./Models/signuprestModel");

var insert = class insert {
  insert_cust(req, res) {
    console.log("connected");
    var newcust = new signupcustModel({
      customerID: req.body.customerID,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      pass: req.body.pass,
      dateofbirth: " ",
      city: " ",
      State: " ",
      country: " ",
      phonenumber: " ",
      nickname: " ",
      yelpingsince: " ",
      thingsilove: " ",
      about: " ",
      findmein: " ",
      myblog: " ",
      prof_pic: " ",
      dish_pic: " ",
    });
    signupcustModel.findOne({ email: req.body.email }, (error, signupcust) => {
      if (error) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });

        res.end();
      }
      if (signupcust) {
        res.writeHead(400, {
          "Content-Type": "text/plain",
        });
        res.end("Customer already exists.");
      } else {
        newcust.save((error, data) => {
          if (error) {
            res.writeHead(500, {
              "Content-Type": "text/plain",
            });
            console.log("error here", error);
            res.end();
          } else {
            res.writeHead(200, {
              "Content-Type": "text/plain",
            });
            res.end("Customer details added");
          }
        });
      }
    });
  }
  insert_rest(req, res) {
    console.log("connected");
    var newrest = new signuprestModel({
      restaurantID: req.body.restaurantID,
      name: req.body.cname,
      email: req.body.email,
      pass: req.body.pass,
      location: req.body.location,
      description: " ",
      contact: " ",
      timing: " ",
      reviews: " ",
      website: " ",
      prof_pic: " ",
    });
    console.log("yes");
    console.log(newrest);
    signuprestModel.findOne({ email: req.body.email }, (error, signuprest) => {
      if (error) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });

        res.end();
      }
      if (signuprest) {
        res.writeHead(400, {
          "Content-Type": "text/plain",
        });
        res.end("Restaurant already exists.");
      } else {
        newrest.save((error, data) => {
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
            res.end("Restaurant details added");
          }
        });
      }
    });
  }
};

module.exports = {
  insert,
};
