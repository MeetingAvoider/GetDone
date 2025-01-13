import { useState } from "react";
import axios from "axios";

import { Delete, Pencil } from "lucide-react";
export default function DisplayTodos({ todos, setTodos }) {
  const [editingTodo, setEditingTodo] = useState(null);
  const [newTodoText, setNewTodoText] = useState("");

  const handleEdit = (todo) => {
    setEditingTodo(todo._id);
    setNewTodoText(todo.todo);
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/todo/update/${id}`,
        { newTodo: newTodoText },
        { withCredentials: true }
      );
      const updatedTodo = response.data.data.updatedTodo;
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
      setEditingTodo(null);
      setNewTodoText("");
    } catch (error) {
      console.log(error.message);
    }
  };
  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/todo/delete/${id}`
      );
      const newTodos = todos.filter((todo) => todo._id !== id);
      setTodos(newTodos);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="w-full">
      {todos.map((todo) => (
        <div key={todo._id} className="flex justify-between items-center my-2">
          {editingTodo === todo._id ? (
            <>
              <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                className="border-2 px-1 py-1 font-sans text-xl"
              />
              <button onClick={() => handleUpdate(todo._id)}>Update</button>
            </>
          ) : (
            <>
              <span>{todo.todo}</span>
              <button onClick={() => handleEdit(todo)}>Edit</button>
              <Delete onClick={() => handleDelete(todo._id)} />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
