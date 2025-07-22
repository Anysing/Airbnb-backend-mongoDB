const express = require("express");
const path = require("path");
const dirpath = require("./utils/pathUtils");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter")
const { hostRouter } = require("./routes/hostRouter");
const errorController = require("./controllers/errors");
const session = require('express-session')
const mongoDBStore = require('connect-mongodb-session')(session)
const { default: mongoose } = require("mongoose");

const url = "mongodb+srv://ankitgusain:ankitsingh@backend.nyrqzik.mongodb.net/airbnb?retryWrites=true&w=majority&appName=Backend"; 

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const store = new mongoDBStore({
  uri : url,
  collection : 'session'
});

app.use(express.urlencoded());
app.use(session({
  secret : "b8d7c2f3a1e64f79b9e4ad8f2f6d3c5e",
  resave : false,
  saveUninitialized : true,
  store
}))

app.use((req,res,next) => {
  req.isLoggedIn = req.session.isLoggedIn
  next()
})

app.use(authRouter);
app.use(userRouter);
app.use("/host",(req,res,next) => {
  if(req.isLoggedIn) {
    next()
  }else {
    res.redirect("/login")
  }
})

app.use("/host", hostRouter);

app.use(express.static(path.join(dirpath, "public")));

app.use(errorController.PageNotFound);



mongoose.connect(url).then(() => {
  app.listen(3001, () => {
    console.log("The server is running on http://localhost:3001");
  });
}).catch((err) => {
  console.log("error occured while connecting to database",err);
})