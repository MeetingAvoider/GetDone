import { useState } from "react";
import axios from "axios";

function AddTodo({ setTodos, todos }) {
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!newTodo) {
      return alert("please enter todo first");
    }
    const finalnewTodo = newTodo.trim();
    try {
      const response = await axios.post(
        "http://localhost:5000/todo/create",
        {
          todo: finalnewTodo,
          isCompleted: false,
        },
        {
          withCredentials: true,
        }
      );
      setNewTodo("");
      setTodos([...todos, response.data.data.newTodo]); // Add the new todo object

      console.log(response);
      console.log(todos);
    } catch (error) {
      setError(error.message);
    }
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="w-full flex justify-center my-5 p-2">
      {/* create new todo  */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="todo"
          id="todo"
          className="border-2 px-1 py-1 font-sans text-xl"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTodo;
