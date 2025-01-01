const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});
const todo = mongoose.model("Todo", todoSchema);
module.exports = todo;