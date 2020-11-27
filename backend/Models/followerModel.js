const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var followerSchema = new Schema(
  {
    customername: { type: String, required: false },

    followcustomerfname: { type: String, required: false },
    followcustomerlname: { type: String, required: false },
    followcustomercity: { type: String, required: false },
    followcustomerstate: { type: String, required: false },
    followcustomercountry: { type: String, required: false },
    followcustomerabout: { type: String, required: false },
  },
  {
    versionKey: false,
  }
);
const followerModel = mongoose.model("follower", followerSchema);
module.exports = followerModel;
