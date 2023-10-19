import React, { useEffect, useState } from "react";
import "../stylings/landing.css";
import Cookies from "js-cookie";

export default function Landing() {
  const [button, setButton] = useState("");
  const [link, setlink] = useState("");
  const [place, setPlace] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sId, setSId] = useState("");

  useEffect(() => {
    console.log(Cookies.get("s_id"));
    Cookies.get("s_id") === undefined
      ? setTimeout(() => {
          setIsOpen(true);
        }, 3000)
      : setIsOpen(false);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    getLocation();
    session(place);
    handleEvent("New visit", { message: "new user visited" });
  };

  const handleCLickTr = (elem) => {
    fetch(`http://localhost:8080/api/newClick`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        session_id: Cookies.get("s_id"),
        clicked_element: elem,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  const cookieOptions = { expires: 10 };

  const session = (loc) => {
    fetch("http://localhost:8080/api/newSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ session_location: loc }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        Cookies.set("s_id", res.s_id, cookieOptions);
      });
  };

  const handleEvent = (type, data) => {
    fetch(`http://localhost:8080/api/newEvent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        session_id: Cookies.get("s_id"),
        event_type: type,
        event_data: data,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const updateUser = (id, userId) => {
    fetch(`http://localhost:8080/api/updateUserSession/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId: userId }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  const handleButtonClick = () => {
    // Add your logic here when the button is clicked.
    // For example, to accept user consent.
  };

  const handlePageVisit = (url) => {
    const s_id = Cookies.get("s_id");
    fetch("http://localhost:8080/api/newVisit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ session_id: s_id, page_url: url }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        // Get the latitude and longitude from the position object
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetch("http://localhost:8080/api/getLocation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ latitude: latitude, longitude: longitude }),
          credentials: "include",
        })
          .then((res) => res.json())
          .then((res) => {
            setPlace(res.features[0].properties.county);
          });
      });
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  };

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
          setButton("Signup to get started");
          setlink("/signup");
        } else {
          setButton("Start test");
          setlink("/home");
        }
      });
  }, []);
  return (
    <div className="landingContainer" style={{ overflowX: "hidden" }}>
      <div className="header">
        <div className="logo">
          <span> DEVOUTdev</span>
          {/* <img src="logo.png"></img> */}
        </div>
        <div className="navList">
          {/* <a href="/home">
            <div className="test">Go to test</div>
          </a> */}
          <a
            href="/home"
            onClick={() => {
              handlePageVisit("/home");
              handleCLickTr("homepage button");
            }}
          >
            <button>Home page</button>
          </a>
        </div>
      </div>
      <div className="hero">
        <div className="design"></div>
        <div className="others">
          <h1>
            You can now take GST tests at your own <span>time and pace</span>
          </h1>
          <img src="uniben_logo-removebg-preview.png"></img>
          <a
            href={link}
            onClick={() => {
              handlePageVisit(`/${link}`);
              handleCLickTr(`${button} button`);
            }}
          >
            <button>{button}</button>
          </a>
        </div>
      </div>
      <div className="footer">
        <div className="logo">Devout</div>
      </div>
      <div className={`prompt ${isOpen ? "open" : ""}`}>
        <div className="prompt-content">
          <h2>Consent Prompt</h2>
          <p>Here is some information about user consent and other details.</p>
          <button onClick={handleClose}>Accept</button>
        </div>
      </div>
    </div>
  );
}
