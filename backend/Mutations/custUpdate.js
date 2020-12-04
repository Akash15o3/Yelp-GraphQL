const Cust_Profile = require("../Models/signupcustModel");

const login = async (args) => {
  console.log(args);
  var updatecust = {
    fname: args.fname,
    lname: args.lname,
    email: args.email,
    pass: args.pass,
    dateofbirth: args.dateofbirth,
    city: args.city,
    State: args.State,
    country: args.country,
    phonenumber: args.phonenumber,
    nickname: args.nickname,
    yelpingsince: args.yelpingsince,
    thingsilove: args.thingsilove,
    about: args.about,
    findmein: args.findmein,
    myblog: args.myblog,
  };
  Cust_Profile.updateOne(
    { email: args.email },
    { $set: updatecust },
    (error, user) => {
      if (error) {
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
      } else {
        return { status: 200, message: "UPDATED" };
      }
    }
  );
};

exports.custUpdate = login;
