const Cust_Profile = require("../Models/signupcustModel");

const login = async (args) => {
  let user = await Cust_Profile.findOne({
    email: args.email,
    pass: args.pass,
  });
  if (user) {
    return { status: 200, message: user._id.toString() };
  } else {
    return { status: 500, message: "INTERNAL_SERVER_ERROR" };
  }
};

exports.login = login;
