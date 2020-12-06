const Rest_Profile = require("../Models/signuprestModel");

const login = async (args) => {
  let user = await Rest_Profile.findOne({
    email: args.email,
    pass: args.pass,
  });
  if (user) {
    // console.log("user details", user._id, user);
    return { status: 200, message: user.email.toString() };
  } else {
    return { status: 500, message: "INTERNAL_SERVER_ERROR" };
  }
};

exports.RestLogin = login;
