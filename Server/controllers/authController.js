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
  if (!email || !password) {
    return res.status(400).json({
      status: "failed",
      message: "please enter email and password",
    });
  }
  try {
    const userDetails = await user.findOne({ email });
    if (!userDetails) {
      return res.status(404).json({
        status: "failed",
        message: "Wrong mail id",
      });
    }
    const checkPass = bcrypt.compareSync(password, userDetails.password);

    if (!checkPass) {
      return res.status(404).json({
        status: "failed",
        message: "Wrong email id or password",
      });
    }

    const token = jsonwebtoken.sign(
      { userId: userDetails._id, email, userName: userDetails.userName },
      process.env.SECRET_KEYS,
      { expiresIn: process.env.EXPIRE_TIME }
    );
    res.status(200).json({
      status: "successfully",
      data: {
        userDetails,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
exports.logout = function (req, res) {
  res.status(200).json({
    status: "successfully",
  });
};
