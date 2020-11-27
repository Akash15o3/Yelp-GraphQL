const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var signupCustSchema = new Schema(
  {
    customerID: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true },
    dateofbirth: { type: String, required: true },
    city: { type: String, required: true },
    State: { type: String, required: true },
    country: { type: String, required: true },
    phonenumber: { type: String, required: true },
    nickname: { type: String, required: true },
    yelpingsince: { type: String, required: true },
    thingsilove: { type: String, required: true },
    about: { type: String, required: true },
    findmein: { type: String, required: true },
    myblog: { type: String, required: true },
    prof_pic: { type: String, required: false },
  },
  {
    versionKey: false,
  }
);
const signupcustModel = mongoose.model("signupcust", signupCustSchema);
module.exports = signupcustModel;
