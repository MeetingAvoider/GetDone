const express = require("express");
const {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");
const router = express.Router();
router.post("/create", createTodo);
router.get("/get", getTodos);
router.patch("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);
module.exports = router;
