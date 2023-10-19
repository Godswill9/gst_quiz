import React, { useState, useEffect } from "react";
import "../stylings/home.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [display, setDisplay] = useState("none");
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [time, setTime] = useState(40);
  const navigate = useNavigate();

  useEffect(() => {
    // const cookie = Cookies.get("jwt");
    // console.log(cookie);
    fetch("http://localhost:8080/api/verifyMe", {
      // fetch("https://quiz-backen2.onrender.com/api/student", {
      method: "get",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.message == "login again") {
          navigate("/login");
        } else {
          navigate("/home");
        }
      });
  }, []);
  useEffect(() => {
    setName(localStorage.getItem("studentName"));
  }, []);
  const controlPopup = () => {
    if (display == "block") {
      setDisplay("none");
    } else {
      setDisplay("block");
    }
  };

  const closePopup = () => {
    setDisplay("none");
  };

  const logout = () => {
    const cookie = Cookies.get("jwt");
    cookie ? Cookies.set("jwt", "") : alert("You are logged out already");
  };
  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="container2">
      <div className="backArrow" onClick={goBack}>
        back
      </div>
      <button className="logout" onClick={logout}>
        Logout
      </button>
      <div className="innerContainer">
        <h1>
          Welcome back <span className="name">{name}</span>
        </h1>
        <h1 className="task">Choose a topic to test</h1>
        <div className="topics">
          {arr.map((item, i) => {
            return (
              <div
                key={i}
                onClick={(e) => {
                  controlPopup();
                  setSubject(item);
                  localStorage.setItem("subject", item);
                }}
                className="subject"
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div className="timer" style={{ display: display }}>
        <h4>Preparing {subject}</h4>
        <h1>Set your timer</h1>
        <div className="time">
          <span>{time}</span>:<span>00</span>
        </div>
        <input
          type="number"
          onChange={(e) => {
            if (e.target.value <= 0) {
              e.target.value = 1;
              return;
            }
            setTime(e.target.value);
          }}
          value={time}
        ></input>
        mins<br></br>
        <h1>Choose year</h1>
        <select
          name="years"
          onChange={(e) => {
            localStorage.setItem("year", e.currentTarget.value);
          }}
        >
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
        <a href="/testEnv">
          <button
            className="button"
            onClick={(e) => {
              localStorage.setItem("time", time);
            }}
          >
            Proceed
          </button>
        </a>
      </div>
      <div
        className="wrapper"
        onClick={closePopup}
        style={{ display: display }}
      ></div>
    </div>
  );
}

var arr = ["GST111", "GST121", "GST122", "GST112", "GST123", "GST110"];
