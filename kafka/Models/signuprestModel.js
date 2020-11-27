const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var signupRestSchema = new Schema(
  {
    restaurantID: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true },
    timing: { type: String, required: true },

    reviews: { type: String, required: true },
    website: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);
const signuprestModel = mongoose.model("signuprest", signupRestSchema);
module.exports = signuprestModel;
