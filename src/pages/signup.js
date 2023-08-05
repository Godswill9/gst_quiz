import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylings/form.css";

export default function Signup() {
  const [ipAdd, setIpAdd] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState("none");
  const [errDisplay, seterrDisplay] = useState("none");
  const [displayLoader, setdisplayLoader] = useState("none");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    department: "",
    accessCode: "",
    email: "",
    phone: 0,
    password: "",
    phoneSpec: "",
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      phoneSpec: navigator.userAgent,
    }));
  }, []);

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const removeErrMessage = () => {
    seterrDisplay("none");
  };
  const removeMessage = () => {
    setDisplay("none");
  };

  const handleSubmit = async () => {
    setdisplayLoader("flex");
    await fetch("https://quiz-backen2.onrender.com/api/signup", {
      // await fetch("http://localhost:8080/api/signup", {
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
        if (res.message == "User fully registered") {
          navigate("/login");
        } else {
        }
      });
  };
  return (
    <div className="formCont">
      <div className="loading" style={{ display: displayLoader }}>
        <span>Signing up...</span>
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
      <h1>Welcome to Practice GST (UNIBEN)</h1>
      <span>Practice till you get it...</span>
      <div className="contInner">
        <input
          type="text"
          placeholder="First name*"
          name="firstName"
          onChange={handleChange}
        ></input>
        <br></br>
        <input
          type="text"
          placeholder="Last name*"
          name="lastName"
          onChange={handleChange}
        ></input>
        <br></br>
        <input
          type="text"
          placeholder="Department*"
          name="department"
          onChange={handleChange}
        ></input>
        <br></br>
        <input
          type="number"
          placeholder="Phone number*"
          name="phone"
          onChange={handleChange}
        ></input>
        <br></br>
        <input
          type="email"
          placeholder="Email*"
          name="email"
          onChange={handleChange}
        ></input>
        <br></br>
        <input
          type="password"
          placeholder="Password*"
          name="password"
          onChange={handleChange}
        ></input>
        <br></br>
        <input
          type="text"
          placeholder="Access code*"
          name="accessCode"
          onChange={handleChange}
        ></input>
        <br></br>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="firstPrompt">
        Already have an account? <a href="/login">Login</a> to continue
      </div>
      <div className="secondPrompt">
        Message{" "}
        <a href="https://api.whatsapp.com/send?phone=2348125746595&text=Pls%20I%20need%20an%20access%20code.%20My%20name%20is%20">
          Godswill
        </a>{" "}
        to purchase an access code. With this code you gain complete access to
        all the GST courses.
      </div>
    </div>
  );
}
