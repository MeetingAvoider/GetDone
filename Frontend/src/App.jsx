import { Routes, Route } from "react-router-dom";
import Home from "./pages/todo/Home";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import PageNotFound from "./pages/unAuth/index";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
