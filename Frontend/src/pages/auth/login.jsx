import React, { useState } from "react";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !pass) return alert("Please enter email and pass to login");
    // const strongPass =
    //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    // const isValidEmail = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
    // if (!strongPass.test(pass)) {
    //   return alert("please enter strong password of atleaset 8 length");
    // }
    // if (!isValidEmail.test(email)) {
    //   return alert("please enter valid mail id");
    // }
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        {
          email,
          password: pass,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setEmail("");
      setPass("");
    }
  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#d124a0]">
      <div className="bg-white w-[450px] min-h-[550px] text-black rounded-xl">
        <div className="mt-20 px-7">
          <h1 className="text-center font-bold text-4xl my-5 tracking-normal leading-5 ">
            Todo
          </h1>
          <form onSubmit={(e) => handleSubmit(e)} className="px-5">
            <label htmlFor="email" className="">
              Email
            </label>
            <br />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email Id"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <br />
            <span className="text-red-500">wrong mail id</span>
            <br />
            <label htmlFor="password" className="text-center">
              Password
            </label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <br />
            <span className="text-red-500">Wrong password</span>
            <br />
            <button
              type="submit"
              className="py-3 px-8 text-center w-full bg-gradient-to-r from-pink-700 to-purple-600 mt-5 rounded-lg font-semibold text-xl leading-5 tracking-wide cursor-pointer transition ease-in-out hover:from-pink-900 hover:to-purple-800"
            >
              Login
            </button>
          </form>
          {error ? <p>{error.message}</p> : null}
        </div>
      </div>
    </div>
  );
}

export default Login;
