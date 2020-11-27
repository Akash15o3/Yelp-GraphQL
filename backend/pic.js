const signupcustModel = require("./Models/signupcustModel");
const signuprestModel = require("./Models/signuprestModel");
const dishModel = require("./Models/dishModel");
const orderdishModel = require("./Models/orderDishModel");
var pic = class pic {
  updateprofinfo(req, res) {
    var updateStatus = {
      prof_pic: req.body.prof_pic,
    };

    signupcustModel.updateOne(
      { email: req.body.customeremail },
      { $set: updateStatus },
      (err, signupcust) => {
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
          res.end("Profile Pic  updated");
        }
      }
    );
  }

  updateprofinfo(req, res) {
    var updateStatus = {
      prof_pic: req.body.prof_pic,
    };

    signuprestModel.updateOne(
      { email: req.body.restaurantemail },
      { $set: updateStatus },
      (err, signuprest) => {
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
          res.end("Profile Pic  updated");
        }
      }
    );
  }

  updatedishinfo(req, res) {
    var updateStatus = {
      dish_pic: req.body.dish_pic,
    };

    signuprestModel.updateOne(
      { email: req.body.restaurantemail },
      { $set: updateStatus },
      (err, signuprest) => {
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
          res.end("Profile Pic  updated");
        }
      }
    );
  }

  gettestcust(req, res) {
    // console.log(req.query);
    // console.log(req.query.email);
    signupcustModel.findOne({ email: req.body.email }, (error, result) => {
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
        console.log(JSON.stringify(result));
      }
    });
  }

  gettestrest(req, res) {
    // console.log(req.query);
    // console.log(req.query.email);
    signuprestModel.findOne({ email: req.body.email }, (error, result) => {
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
        console.log(JSON.stringify(result));
      }
    });
  }

  adddish(req, res) {
    console.log("Body", req.body);
    var newdish = new dishModel({
      // restaurantname: req.body.rest_name,
      restaurantemail: req.body.restaurantemail,
      dish_title: req.body.dish_title,
      dish_cat: req.body.dish_cat,
      dish_price: req.body.dish_price,
      dish_des: req.body.dish_des,
      dish_ing: req.body.dish_ing,
    });
    console.log("yes");
    console.log("newdish", newdish);
    dishModel.findOne(
      { restaurantemail: req.body.restaurantemail },
      (error, dish) => {
        if (error) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });

          res.end();
        } else {
          newdish.save((error, data) => {
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
              res.end("Dish details added");
            }
          });
        }
      }
    );
  }

  getdish(req, res) {
    dishModel.find(
      { restaurantemail: req.query.restaurantemail },
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
    );
  }

  filterallusers(req, res) {
    signupcustModel.find({ city: req.query.city }, (error, result) => {
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
        console.log(JSON.stringify(result));
      }
    });
  }
};

module.exports = {
  pic,
};
