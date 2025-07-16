const mongoose = require("mongoose");

const favouriteSchema = mongoose.Schema({
  houseid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Home",
    unique : true,
  },
});

module.exports = mongoose.model("Favourites", favouriteSchema);
