const mongoose = require("mongoose");
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
    const { id } = req.params;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "Failed",
        message: "Invalid ID",
      });
    }

    const deletedTodo = await todo.findByIdAndDelete(id);

    // Check if the todo exists
    if (!deletedTodo) {
      return res.status(404).json({
        status: "Failed",
        message: `No todo found with ID: ${id}`,
      });
    }

    res.status(200).json({
      status: "success",
      message: `${id} deleted successfully`,
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
    const { id } = req.params;
    const { newTodo } = req.body;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "Failed",
        message: "Invalid ID",
      });
    }

    const updatedTodo = await todo.findByIdAndUpdate(
      id,
      { todo: newTodo },
      { new: true }
    );

    // Check if the todo exists
    if (!updatedTodo) {
      return res.status(404).json({
        status: "Failed",
        message: `No todo found with ID: ${id}`,
      });
    }

    res.status(200).json({
      status: "successfully",
      data: {
        updatedTodo,
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
