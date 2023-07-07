const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      password: hashedPassword,
    });
    const createdUser = await user.save();
    res.status(201).json(createdUser);
  })
);
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Please enter email and password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    var role = "user";
    const hashedPassword = await bcrypt.hash(password, 12);
    if (email == "admin@mail.com") {
      role = "admin";
    }
    if (bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id, role: role }, "adi123");
      res.status(200).json(token);
    }
  })
);

module.exports = router;
