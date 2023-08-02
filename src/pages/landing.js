import React, { useEffect } from "react";
import "../stylings/landing.css";

export default function Landing() {
  // const [display, setDis]
  // useEffect(() => {
  //   const cookie = Cookies.get("jwt");
  //   if (!cookie) {
  //     navigate("/login");
  //   } else {
  //   }
  // }, []);
  return (
    <div className="landingContainer">
      <div className="header">
        <div className="logo">Devout</div>
        <div className="navList">
          <a href="/home">
            <div>Test</div>
          </a>
          <a href="/signup">
            <button>Signup</button>
          </a>
        </div>
      </div>
      <div className="hero">
        <h1>
          You can now take GST tests at your own <span>time and pace</span>
        </h1>
        <img src="uniben_logo-removebg-preview.png"></img>
        <a href="/signup">
          <button>Get started</button>
        </a>
      </div>
      <div className="footer">
        <div className="logo">Devout</div>
      </div>
    </div>
  );
}
