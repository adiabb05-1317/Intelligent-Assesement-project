const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDb = require("./db");
const User = require("./models/userModel");
connectDb();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/users", require("./Routes/UserRoutes"));
app.use("/api/questions", require("./Routes/examRoutes"));
app.listen(3001, (req, res) => {
  console.log("sever running on port 3001");
});
