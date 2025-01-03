const { user } = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async function (req, res) {
  try {
    const newUser = await user.create(req.body);
    res.status(201).json({
      status: "successful",
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.login = async function (req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({
        status: "failed",
        message: "please enter your email and password:",
      });
      return;
    }
    console.log(email, password);
  } catch (error) {}
};
