const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var signupRestSchema = new Schema(
  {
    restaurantID: { type: String, required: false },
    name: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true },
    location: { type: String, required: false },
    description: { type: String, required: false },
    contact: { type: String, required: false },
    timing: { type: String, required: false },

    reviews: { type: String, required: false },
    website: { type: String, required: false },
    prof_pic: { type: String, required: false },
    dish_pic: { type: String, required: false },
  },
  {
    versionKey: false,
  }
);
const signuprestModel = mongoose.model("signuprest", signupRestSchema);
module.exports = signuprestModel;
