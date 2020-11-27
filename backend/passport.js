var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("./config");
const Cust_Profile = require("./Models/signupcustModel");
const Rest_Profile = require("./Models/signuprestModel");

function auth() {
  console.log(secret);
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: secret,
  };
  passport.use(
    new JwtStrategy(opts, (jwt_payload, callback) => {
      const user_id = jwt_payload._id;
      const type = jwt_payload.type;
      //console.log(jwt_payload);
      if (type == "Customer") {
        Cust_Profile.findById(user_id, (err, results) => {
          if (err) {
            return callback(err, false);
          }
          if (results) {
            callback(null, results);
          } else {
            callback(null, false);
          }
        });
      } else {
        Rest_Profile.findById(user_id, (err, results) => {
          if (err) {
            return callback(err, false);
          }
          if (results) {
            callback(null, results);
          } else {
            callback(null, false);
          }
        });
      }
    })
  );
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });
