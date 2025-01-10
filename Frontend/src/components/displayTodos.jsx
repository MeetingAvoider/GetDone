import React from "react";
import { Delete, Pencil } from "lucide-react";
export default function DisplayTodos({ todos }) {
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
                  <Delete />
                  <Pencil />
                </div>
              </li>
            );
          })}
    </ul>
  );
}
