const express = require("express");
const dotenv = require("dotenv").config();
// const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { isAuth } = require("./utils/auth");
const userRoute = require("./routes/userRoute");
const projectRoute = require("./routes/projectRoute");
const noteRoute = require("./routes/noteRoute");
// const User = require("./models/userModel");

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
  })
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use("/user", userRoute);
app.use(isAuth);
app.use("/project", projectRoute);
app.use("/note", noteRoute);

app.listen(process.env.PORT || 8000);
