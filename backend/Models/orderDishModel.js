const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var orderdishSchema = new Schema(
  {
    // restaurantname: { type: String, required: true },
    customerEmailForOrder: { type: String, required: false },
    restaurantEmailForOrder: { type: String, required: false },
    customerNameForOrder: { type: String, required: false },
    restaurantNameForOrder: { type: String, required: false },
    // dishOrder: { type: Array, required: false },
    // dishOrder: [{ dishname: String }],
    dishOrder: { type: String, required: false },
    status: { type: String, required: false },
    deliveryType: { type: String, required: false },
    pickupStatus: { type: String, required: false },
    deliveryStatus: { type: String, required: false },
    timeOfOrder: { type: String, required: false },
    timestamp: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);
const orderModel = mongoose.model("orderdish", orderdishSchema);
module.exports = orderModel;
