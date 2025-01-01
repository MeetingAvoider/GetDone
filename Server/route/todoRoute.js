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
router.patch("/update", updateTodo);
router.delete("/delete", deleteTodo);
module.exports = router;
