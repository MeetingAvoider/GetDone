import React from "react";
import axios from "axios";
import { Delete, Pencil } from "lucide-react";
export default function DisplayTodos({ todos, setTodos }) {
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

  // displaying todos
  return (
    <ul className="flex flex-col w-full py-1 ">
      {todos.length === 0
        ? null
        : todos.map((todo, index) => {
            return (
              <li
                key={todo._id}
                className="flex w-full flex-row justify-between"
              >
                <div>{todo.todo}</div>
                <div className="flex flex-row">
                  <Delete onClick={() => handleDelete(todo._id)} />
                  <Pencil />
                </div>
              </li>
            );
          })}
    </ul>
  );
}
