import React, { useState, useEffect } from "react";
import "../stylings/form.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    screenDimensions: "",
  });
  const [ipAdd, setIpAdd] = useState("");
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

    // console.log(screenWidth);
    // console.log(screenHeight);
    setData((prev) => ({
      ...prev,
      screenDimensions: `${
        "width:" + screenWidth + " " + "height:" + screenHeight
      }`,
    }));
  }, []);

  const cookieOptions = { expires: 10 };
  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    fetch("http://127.0.0.1:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == "success") {
          Cookies.set("jwt", res.accessToken, cookieOptions);
          localStorage.setItem("studentId", res.id);
          localStorage.setItem("studentName", res.firstName);
          localStorage.setItem("studentDepartment", res.department);
          navigate("/home");
        } else {
          alert(res.message);
        }
      });
  };
  return (
    <div className="formCont">
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
