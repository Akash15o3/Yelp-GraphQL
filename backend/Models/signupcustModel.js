const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var signupCustSchema = new Schema(
  {
    customerID: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true },
    dateofbirth: { type: String, required: false },
    city: { type: String, required: false },
    State: { type: String, required: false },
    country: { type: String, required: false },
    phonenumber: { type: String, required: false },
    nickname: { type: String, required: false },
    yelpingsince: { type: String, required: false },
    thingsilove: { type: String, required: false },
    about: { type: String, required: false },
    findmein: { type: String, required: false },
    myblog: { type: String, required: false },
    prof_pic: { type: String, required: false },
  },
  {
    versionKey: false,
  }
);
const signupcustModel = mongoose.model("signupcust", signupCustSchema);
module.exports = signupcustModel;
