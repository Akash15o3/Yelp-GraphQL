const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var dishSchema = new Schema(
  {
    // restaurantname: { type: String, required: true },
    restaurantemail: { type: String, required: true },
    dish_title: { type: String, required: true },
    dish_cat: { type: String, required: true },
    dish_price: { type: String, required: true },
    dish_des: { type: String, required: true },
    dish_ing: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);
const dishModel = mongoose.model("dish", dishSchema);
module.exports = dishModel;
