import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [ipAdd, setIpAdd] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    department: "",
    accessCode: "",
    email: "",
    phone: 0,
    password: "",
    screenDimensions: "",
  });
  useEffect(() => {
    // fetch("https://api.ipify.org?format=json")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const ipAddress = data.ip;
    //     console.log("User IP address:", ipAddress);
    //     setData((prev) => ({
    //       ...prev,
    //       ipAddress: ipAddress,
    //     }));
    //     // You can use the 'ipAddress' variable for further processing
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    console.log(screenWidth);
    console.log(screenHeight);
    setData((prev) => ({
      ...prev,
      screenDimensions: `${
        "width:" + screenWidth + " " + "height:" + screenHeight
      }`,
    }));
  }, []);

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    await fetch("http://127.0.0.1:8080/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == "user registered") {
          alert("user registered");
          navigate("/login");
        } else {
          alert(res.message);
        }
      });
  };
  return (
    <div className="formCont">
      <h1>Welcome to Learn GST (UNIBEN)</h1>
      <span>Practice till you get it</span>
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
      <div>
        Already have an account? <a href="/login">Login</a> to continue
      </div>
      <div>
        Message <a href="##">Godswill</a> to purchase an access code. With this
        code you gain complete access to all the GST courses.
      </div>
    </div>
  );
}
