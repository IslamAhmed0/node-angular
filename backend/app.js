const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const mongoose = require('mongoose');
app.use(bodyParser.json());
mongoose.connect("mongodb+srv://Islam:islam43533@cluster0.yfzlx.mongodb.net/node-angular?retryWrites=true&w=majority").then(() =>{
  console.log("done")
} )
  .catch((error)=>{
    console.log(error.message)
    console.log("failed")
  })
const Post = require("./models/post");
const postsRoutes = require("./routes/app");
//crs
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);


module.exports = app;
