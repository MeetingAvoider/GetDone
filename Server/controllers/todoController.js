const todo = require("../models/todoModel");
const createTodo = async function (req, res) {
  console.log(req.body);
  try {
    const newTodo = await todo.create(req.body);
    res.status(201).json({
      status: "successfully",
      data: {
        newTodo,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
const getTodos = async function (req, res) {
  try {
    const todos = await todo.find();
    res.status(200).json({
      status: "successful",
      todos,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
const deleteTodo = async function (req, res) {
  try {
    const deleteItemId = await todo.findOne(req.body.todo);
    const deleted = await todo.findByIdAndDelete(deleteItemId.id);
    req.status(200).json({
      status: "success",
      message: `${req.body.todo} deleted successfully:`,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
};
const updateTodo = async function (req, res) {
  try {
    const updateItemId = await todo.findOne({ todo: req.body.todo });
    if (!updateItemId) {
      res.status(400).json({
        status: "Failed",
        message: `There is no todo with this name ${req.body.todo}`,
      });
      return;
    }
    const updated = await todo.findByIdAndUpdate(
      updateItemId.id,
      {
        todo: req.body.newTodo,
      },
      { new: true }
    );
    res.status(200).json({
      status: "successfully",
      data: {
        updated,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
};
module.exports = { createTodo, getTodos, deleteTodo, updateTodo };
