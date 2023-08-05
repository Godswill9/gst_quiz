import React from "react";
import TestEnv from "./pages/testEnv";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Landing from "./pages/landing";
import Test from "./pages/text";

export default function App() {
  const id = "";
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={"/home"} element={<Home />}></Route>
          <Route path={"/login"} element={<Login />}></Route>
          <Route path={"/signup"} element={<Signup />}></Route>
          <Route path={`/testEnv`} element={<TestEnv />}></Route>
          <Route path={`/`} element={<Landing />}></Route>
          <Route path={`/2`} element={<Test />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
