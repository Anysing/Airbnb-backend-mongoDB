const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient; 

const url = "mongodb+srv://ankitgusain:ankitsingh@backend.nyrqzik.mongodb.net/?retryWrites=true&w=majority&appName=Backend"; 

let _db;

const mongoclient = (callback) => {
  MongoClient.connect(url)
    .then((client) => {
      _db = client.db("airbnb");
      callback();
    })
    .catch((err) => {
      console.error("MongoDB connection failed:", err);
      throw err;
    });
};

const getDB = () => {
  if (!_db) {
    return "Database not connected"
  }
  else{
    return _db;
  }
  
};

exports.mongoclient = mongoclient;
exports.getDB = getDB;
