const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var eventSchema = new Schema(
  {
    restaurantemail: { type: String, required: false },
    // customername: { type: Array, required: false },
    restaurantname: { type: String, required: false },
    eventID: { type: String, required: false },
    eventname: { type: String, required: false },
    timeofevent: { type: String, required: false },
    description: { type: String, required: false },
    date: { type: String, required: false },
    location: { type: String, required: false },
    hashtag: { type: String, required: false },
    timestamp: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);
const eventModel = mongoose.model("event", eventSchema);
module.exports = eventModel;
