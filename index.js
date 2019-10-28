const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(
  process.env.DBCONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to db");
  }
);

const auth = require("./routes/auth");
const posts = require("./routes/posts");
app.use(express.json());
app.use("*", function(req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "*");
  res.set("Access-Control-Allow-Methods", "*");
  next();
});
app.use("/api/user", auth);
app.use("/api/posts", posts);
app.listen(3000, () => {
  console.log("server running on 3000");
});
