const express = require("express")
const storeController = require("../controllers/storeController")
const userRouter = express.Router()

userRouter.get("/", storeController.getHomes)
userRouter.get("/Home-list", storeController.getHomelist)
userRouter.get("/favourite", storeController.getfavourite)
userRouter.get("/bookings", storeController.getbookings)
userRouter.get("/homes/:homeID", storeController.gethomedetails)
userRouter.post("/favourites", storeController.postAddtoFavourites)
userRouter.post("/removefavourites", storeController.postRemoveFavourites)

module.exports = userRouter