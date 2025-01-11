import { useState, useEffect } from "react";
import axios from "axios";
import AddTodo from "../../components/addTodo";
import DisplayTodos from "../../components/displayTodos";

function Home() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  async function fetchApi() {
    try {
      setIsLoading(true);
      const response = await axios("http://localhost:5000/todo/get", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.todos);
      setTodos(response.data.todos);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchApi();
  }, []);
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-96 flex flex-col items-center">
        <AddTodo setTodos={setTodos} todos={todos} />
        <DisplayTodos todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
}

export default Home;
