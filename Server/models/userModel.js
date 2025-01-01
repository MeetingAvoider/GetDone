const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    validate: validator.isEmail,
  },
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  userName: {
    type: String,
    required: [true, "Please enter your username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
exports.user = mongoose.model("User", userSchema);
