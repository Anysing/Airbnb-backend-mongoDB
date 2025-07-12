const { ObjectId } = require("mongodb");
const {getDB} = require("../utils/databaseUtils")



module.exports = class Home {
  constructor(housename, price, location, imageURL,description,_id) {
    this.housename = housename;
    this.price = price;
    this.location = location;
    this.imageURL = imageURL;
    this.description = description;
    if(_id){
      this.id = id;
    }
  }

  save() {
    const db = getDB()
    if(this._id){ // update or edit home
      const updateobject = {
        housename: this.housename,
        price: this.price,
        location: this.location,
        imageURL: this.imageURL,
        description: this.description
      }
      return db.collection("homes").updateOne({_id : new ObjectId(String(this._id))},{$set : updateobject})
    }else{ // insert or add home
      return db.collection("homes").insertOne(this)
    }
  }

  static fetchAll() {
    const db = getDB()
    return db.collection("homes").find().toArray()
  }

  static HomeByID(homeid) {
    const db = getDB()
    return db.collection("homes").find({_id : new ObjectId(String(homeid))}).next()
  }

  static deletehome(homeid) {
    const db = getDB()
    return db.collection("homes").deleteOne({_id : new ObjectId(String(homeid))})
  }
};
