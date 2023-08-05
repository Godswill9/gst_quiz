import React, { useState, useEffect } from "react";
import "../stylings/form.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    phoneSpec: "",
  });
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState("none");
  const [errDisplay, seterrDisplay] = useState("none");
  const [ipAdd, setIpAdd] = useState("");
  const [displayLoader, setdisplayLoader] = useState("none");

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      phoneSpec: navigator.userAgent,
    }));
  }, []);

  const removeErrMessage = () => {
    seterrDisplay("none");
  };
  const removeMessage = () => {
    setDisplay("none");
  };

  const cookieOptions = { expires: 10 };
  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    // fetch("http://127.0.0.1:8080/api/login", {
    setdisplayLoader("flex");
    fetch("https://quiz-backen2.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setdisplayLoader("none");
        if (res.status == "error") {
          seterrDisplay("flex");
          setMessage(res.message);
          setDisplay("none");
        } else {
          setDisplay("flex");
          setMessage(res.message);
          seterrDisplay("none");
        }
        if (res.status == "success") {
          Cookies.set("jwt", res.accessToken, cookieOptions);
          localStorage.setItem("studentId", res.id);
          localStorage.setItem("studentName", res.firstName);
          localStorage.setItem("studentDepartment", res.department);
          navigate("/home");
        } else {
          // alert(res.message);
        }
      });
  };
  return (
    <div className="formCont">
      <div className="loading" style={{ display: displayLoader }}>
        <span>Logging in...</span>
      </div>
      <div
        className="popupMessageErr"
        style={{ display: errDisplay }}
        onClick={removeErrMessage}
      >
        <div className="inner">
          <h4>Message:</h4>
          <span>{message}</span>
          <button onClick={removeErrMessage}>back</button>
        </div>
      </div>
      <div
        className="popupMessageSuccess"
        style={{ display: display }}
        onClick={removeMessage}
      >
        <div className="inner">
          <h4>Message:</h4>
          <span>{message}</span>
          <button onClick={removeMessage}>back</button>
        </div>
      </div>
      <h1>Welcome back</h1>
      <span>Login to your account</span>
      <div className="contInner">
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        ></input>
        <br></br>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        ></input>
        <br></br>
      </div>
      <button onClick={handleSubmit}>Click to Proceed</button>
      <div>
        Dont have an account? <a href="/signup">signup</a> to continue
      </div>
    </div>
  );
}
