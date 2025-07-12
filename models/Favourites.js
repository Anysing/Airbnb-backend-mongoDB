const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/databaseUtils");

module.exports = class Favourites {
  constructor(houseid) {
    this.houseid = houseid;
  }

  save() {
    const db = getDB();
    return db.collection("Favourites").insertOne(this);
  }

  static getfavourite() {
    const db = getDB();
    return db.collection("Favourites").find().toArray();
  }

  static RemoveFavourite(homeid) {
    const db = getDB()
    return db.collection("Favourites").deleteOne({houseid : homeid})
  }
};
