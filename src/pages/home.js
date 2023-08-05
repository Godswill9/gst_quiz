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
    const cookie = Cookies.get("jwt");
    if (!cookie) {
      navigate("/login");
    } else {
    }
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

  return (
    <div className="container2">
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
