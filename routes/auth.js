const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Validation
const Joi = require("@hapi/joi");
const { registerValidation, loginValidation } = require("./validation");

router.post("/register", async (req, res) => {
  //lets validate the before making a user and saving it
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if email already exists ;
  const emailcheck = await User.findOne({ email: req.body.email });
  if (emailcheck) return res.status(300).send("email already exists");

  //generate hashed password with salt
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(req.body.password, salt);

  // create a user
  const temp = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashpassword
  });
  try {
    const ret = await temp.save();
    res.send({ user: temp._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/register", (req, res) => {
  res.send("Register");
});

router.post("/login", async (req, res) => {
  // validation same as before
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if user exists ;
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(300).send("please register first");

  // check if passwor is correct
  const checkpass = await bcrypt.compare(req.body.password, user.password);
  if (!checkpass) return res.status(300).send("your password is wrong ");

  const token = jwt.sign({ _id: user._id }, process.env.SECRETKEY, {
    expiresIn: 60
  });
  res.header("auth-token", token).send(token);
});

module.exports = router;
