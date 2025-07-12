const express = require('express');
const path = require('path')
const dirpath = require("./utils/pathUtils")
const userRouter = require("./routes/userRouter")
const {hostRouter} = require("./routes/hostRouter")
const  errorController = require("./controllers/errors")



const app = express()

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded())
app.use(userRouter)
app.use("/host",hostRouter)

app.use(express.static(path.join(dirpath,'public')))

app.use(errorController.PageNotFound)





app.listen(3001,() => {
  console.log("The server is running on http://localhost:3001");
  
})