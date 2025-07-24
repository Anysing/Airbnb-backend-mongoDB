const express = require("express")
const authController = require("../controllers/authController")
const authRouter = express.Router()

authRouter.get("/login", authController.getLogin)
authRouter.get("/SignUp", authController.getSignup)
authRouter.post("/login", authController.postLogin)
authRouter.post("/logout", authController.postlogout)
authRouter.post("/SignUp", authController.postSignup)


module.exports = authRouter