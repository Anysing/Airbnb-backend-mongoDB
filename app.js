const express = require("express");
const path = require("path");
const dirpath = require("./utils/pathUtils");
const userRouter = require("./routes/userRouter");
const { hostRouter } = require("./routes/hostRouter");
const errorController = require("./controllers/errors");

const { default: mongoose } = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(dirpath, "public")));

app.use(errorController.PageNotFound);


const url = "mongodb+srv://ankitgusain:ankitsingh@backend.nyrqzik.mongodb.net/airbnb?retryWrites=true&w=majority&appName=Backend";
mongoose.connect(url).then(() => {
  app.listen(3001, () => {
    console.log("The server is running on http://localhost:3001");
  });
}).catch((err) => {
  console.log("error occured while connecting to database",err);
})