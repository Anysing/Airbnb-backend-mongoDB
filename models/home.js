const mongoose = require("mongoose");

const homeSchema = mongoose.Schema({
  housename: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  imageURL: String,
  description: String,
});

module.exports = mongoose.model("Home", homeSchema);
