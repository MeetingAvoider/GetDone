const express = require("express");
const {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");
const { middleware } = require("./authRoute");
const router = express.Router();
router.post("/create", createTodo);
router.get("/get", getTodos);
router.delete("/delete/:id", deleteTodo);
router.put("/update/:id", updateTodo); // Add this line
module.exports = router;
