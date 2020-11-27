const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var registeredeventSchema = new Schema(
  {
    // restaurantname: { type: String, required: true },
    customeremail: { type: String, required: false },
    restaurantemail: { type: String, required: false },
    customername: { type: String, required: false },
    restaurantname: { type: String, required: false },
    eventID: { type: String, required: false },
    eventname: { type: String, required: false },
    timeofevent: { type: String, required: false },
    description: { type: String, required: false },
    date: { type: String, required: false },
    location: { type: String, required: false },
    hashtag: { type: String, required: false },
  },
  {
    versionKey: false,
  }
);
const registeredeventModel = mongoose.model(
  "registeredevent",
  registeredeventSchema
);
module.exports = registeredeventModel;
