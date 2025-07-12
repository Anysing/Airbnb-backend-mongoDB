const express = require("express");
const hostRouter = express.Router();
const hostController = require("../controllers/hostController")

hostRouter.get("/add-home", hostController.getAddhomes);
hostRouter.post("/add-home", hostController.postAddhomes);
hostRouter.post("/edit-home", hostController.postEdithomes);
hostRouter.get("/host-homes", hostController.getHostHomes);
hostRouter.get("/edit-home/:homeid", hostController.getedithome);
hostRouter.post("/deletehosthome/:homeid", hostController.postDeletehosthome);

exports.hostRouter = hostRouter
