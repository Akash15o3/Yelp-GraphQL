const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var messageSchema = new Schema(
  {
    restaurantname: { type: String, required: true },
    restaurantemail: { type: String, required: false },
    customername: { type: String, required: false },
    customeremail: { type: String, required: false },
    //restaurantreply: { type: String, required: false },
    // customerreply: { type: String, required: false },
    message: [
      {
        messageContent: String,
        timestamp: { type: Date, default: Date.now },
        messageSender: String, //Restaurant or Customer
      },
    ],
  },
  {
    versionKey: false,
  }
);
const messageModel = mongoose.model("message", messageSchema);
module.exports = messageModel;
