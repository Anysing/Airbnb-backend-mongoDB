const mongoose = require("mongoose");
const Favourites = require("./Favourites");

const homeSchema = mongoose.Schema({
  housename : {type : String, required : true},
  price : {type:Number,required : true},
  location : {type : String, required : true},
  imageURL : String,
  description : String
})

homeSchema.pre('findOneAndDelete', async function(next){
  const homeid = this.getQuery()["_id"];
  await Favourites.deleteMany({houseid : homeid});
  next()
})

module.exports = mongoose.model("Home",homeSchema)
  