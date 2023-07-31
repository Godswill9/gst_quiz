import React, { useEffect, useRef, useState } from "react";
import "../stylings/testEnv.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function TestEnv() {
  const [questions, setQuestions] = useState([]);
  const [scoreDisplay, setScoreDisplay] = useState("none");
  const [time, setTime] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [hrs, sethrs] = useState("");
  const [secs, setSecs] = useState("");
  const allVals = useRef();
  const navigate = useNavigate();
  const [butDisplay, setButDisplay] = useState("inline-block");
  var secondsUI;
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    const cookie = Cookies.get("jwt");
    if (!cookie) {
      navigate("/login");
    } else {
    }
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/student", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: localStorage.getItem("studentId"),
        cookie: Cookies.get("jwt"),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res) {
          navigate("/login")
          return;
        } else {
          setName(res[0].firstName);
          setDepartment(res[0].department);
        }
      });
  }, []);

  useEffect(() => {
    var getTime = localStorage.getItem("time");
    var getSubject = localStorage.getItem("subject");
    setTime(getTime);
    setSubject(getSubject);
    let currentSeconds = getTime * 60;
    fetchQuestions();

    const intervalId = setInterval(() => {
      if (currentSeconds == 0) {
        clearInterval(intervalId);
      } else {
        currentSeconds--;
        const remainingMinutes = Math.floor(currentSeconds / 60);
        const remainingSeconds = currentSeconds % 60;
        // console.log(remainingMinutes, remainingSeconds);
        setTime(remainingMinutes.toString().padStart(2, "0"));
        setSecs(remainingSeconds.toString().padStart(2, "0"));
      }
    }, 1000);
  }, []);
  // console.log(time, secs);

  const fetchQuestions = () => {
    fetch("http://127.0.0.1:8080/api/client/allQuestions", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        course: localStorage.getItem("subject"),
        cookie: Cookies.get("jwt"),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == "no Questions") {
          console.log("no questions");
          return;
        }
        if (res) {
          setQuestions(res);
        } else {
          alert("you are not logged in");
          navigate("/login");
          return;
        }
      });
  };

  const submitTest = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Add smooth behavior for a smooth scroll animation
    });
    var options = document.querySelectorAll(".options");
    options.forEach((option, i) => {
      option.querySelectorAll(".option").forEach((item, i) => {
        item.style.backgroundColor = "";
      });
    });
    var selected = document.querySelectorAll(".selected");
    var answer = document.querySelectorAll(".answer");

    for (var i = 0; i < selected.length; i++) {
      console.log(answer[i].textContent);
      if (
        selected[i].textContent !== "" &&
        selected[i].textContent == answer[i].textContent
      ) {
        setTotalScore((prev) => prev + 1);
        const ansValue = answer[i].textContent;
        switch (ansValue) {
          case "A":
            options[i].querySelectorAll(".option")[0].style.border =
              "2px solid green";
            options[i].querySelectorAll(".option")[0].style.backgroundColor =
              "white";
            options[i].querySelectorAll(".option")[0].style.color = "green";
            break;
          case "B":
            options[i].querySelectorAll(".option")[1].style.border =
              "2px solid green";
            options[i].querySelectorAll(".option")[1].style.backgroundColor =
              "white";
            options[i].querySelectorAll(".option")[1].style.color = "green";
            break;
          case "C":
            options[i].querySelectorAll(".option")[2].style.border =
              "2px solid green";
            options[i].querySelectorAll(".option")[2].style.backgroundColor =
              "white";
            options[i].querySelectorAll(".option")[2].style.color = "green";
            break;
          case "D":
            options[i].querySelectorAll(".option")[3].style.border =
              "2px solid green";
            options[i].querySelectorAll(".option")[3].style.backgroundColor =
              "white";
            options[i].querySelectorAll(".option")[3].style.color = "green";
            break;

          default:
            break;
        }
      } else {
        const selectedValue = selected[i].textContent;
        const ansValue = answer[i].textContent;
        switch (ansValue) {
          case "A":
            options[i].querySelectorAll(".option")[0].style.border =
              "2px solid green";
            options[i].querySelectorAll(".option")[0].style.backgroundColor =
              "white";
            options[i].querySelectorAll(".option")[0].style.color = "green";
            break;
          case "B":
            options[i].querySelectorAll(".option")[1].style.border =
              "2px solid green";
            options[i].querySelectorAll(".option")[1].style.backgroundColor =
              "white";
            options[i].querySelectorAll(".option")[1].style.color = "green";
            break;
          case "C":
            options[i].querySelectorAll(".option")[2].style.border =
              "2px solid green";
            options[i].querySelectorAll(".option")[2].style.backgroundColor =
              "white";
            options[i].querySelectorAll(".option")[2].style.color = "green";
            break;
          case "D":
            options[i].querySelectorAll(".option")[3].style.border =
              "2px solid green";
            options[i].querySelectorAll(".option")[3].style.backgroundColor =
              "white";
            options[i].querySelectorAll(".option")[3].style.color = "green";
            break;

          default:
            break;
        }
        switch (selectedValue) {
          case "A":
            options[i].querySelectorAll(".option")[0].style.border =
              "2px solid red";
            options[i].querySelectorAll(".option")[0].style.backgroundColor =
              "white";
            options[i].querySelectorAll(".option")[0].style.color = "red";
            break;
          case "B":
            options[i].querySelectorAll(".option")[1].style.border =
              "2px solid red";
            options[i].querySelectorAll(".option")[1].style.backgroundColor =
              "white";
            options[i].querySelectorAll(".option")[1].style.color = "red";
            break;
          case "C":
            options[i].querySelectorAll(".option")[2].style.border =
              "2px solid red";
            options[i].querySelectorAll(".option")[2].style.backgroundColor =
              "white";
            options[i].querySelectorAll(".option")[2].style.color = "red";
            break;
          case "D":
            options[i].querySelectorAll(".option")[3].style.border =
              "2px solid red";
            options[i].querySelectorAll(".option")[3].style.backgroundColor =
              "white";
            options[i].querySelectorAll(".option")[3].style.color = "red";
            break;

          default:
            break;
        }
      }
    }
    // allAns.forEach((item, i) => {
    //   arr.push(item.textContent);
    // });
    // console.log(arr);
    setScoreDisplay("block");
    setButDisplay("none");
  };

  useEffect(() => {
    if (time == "00" && secs == "00") {
      submitTest();
      setScoreDisplay("block");
    }
  }, [time, secs]);

  return (
    <div className="container">
      <nav id="nav">
        <div className="first">
          <h1>Test</h1>
        </div>
        <div className="second">
          <div className="timer">
            {time}:{secs}
          </div>
          <div className="identity">
            <div className="name">{name}</div>
            <div className="department">{department}</div>
          </div>
          <div className="course">{subject}</div>
        </div>
      </nav>
      <div className="innerCont">
        <div className="result" style={{ display: scoreDisplay }}>
          <h3>
            Your score is {totalScore}/{questions.length}. View corrections
          </h3>
        </div>
        <h1>Answer all questions</h1>
        {questions.map((item, index) => {
          return (
            <div className="box" key={index} ref={allVals}>
              <span className="number">{index + 1}</span>
              <div className="others">
                <div className="question">{item.question}?</div>
                <div className="options">
                  {JSON.parse(item.options).map((option, i) => {
                    var vals = ["A", "B", "C", "D"];
                    var ans = item.answer;
                    return (
                      <div
                        className="option"
                        key={i}
                        onClick={(e) => {
                          // var updatedOption = {
                          //   option,
                          //   number: index + 1,
                          // };
                          const parentElement = e.target.parentElement;
                          parentElement.getElementsByClassName(
                            "option"
                          )[0].style.backgroundColor = "";
                          parentElement.getElementsByClassName(
                            "option"
                          )[1].style.backgroundColor = "";
                          parentElement.getElementsByClassName(
                            "option"
                          )[2].style.backgroundColor = "";
                          parentElement.getElementsByClassName(
                            "option"
                          )[3].style.backgroundColor = "";
                          e.target.style.backgroundColor = "green";
                          const box =
                            e.target.parentElement.parentElement.parentElement;
                          var selected = box.querySelector(".selected");
                          var answer = box.querySelector(".answer");
                          selected.textContent = vals[i];
                          answer.textContent = item.answer;
                          //   localStorage.setItem("allAnawers", JSON.stringify(arrr))
                        }}
                      >
                        <h1>{vals[i]}</h1>
                        <span>{option}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="ansDesc" style={{ display: scoreDisplay }}>
                  <b>Answer description</b>
                  <br></br>
                  <b className="ans">{item.answer}</b>
                  <br></br>
                  {item.description}
                </div>
                <span className="selected"></span>
                <span className="answer"></span>
              </div>
            </div>
          );
        })}
      </div>
      <footer>
        <button
          onClick={() => {
            const confirmed = window.confirm(
              "Are you sure you want to leave the test?"
            );
            const shouldRedirect = false;
            if (confirmed) {
              navigate("/");
            } else {
              // Stay on the same page
              // You can add optional actions here if needed
            }
          }}
        >
          Leave test
        </button>
        <button
          style={{ display: time == "0" ? "none" : butDisplay }}
          className="submit"
          onClick={() => {
            submitTest();
          }}
        >
          Submit
        </button>
      </footer>
    </div>
  );
}

var arr = [
  {
    question: "When was peace law extablished",
    options: [
      { key: "A", value: "1990" },
      { key: "B", value: "1991" },
      { key: "C", value: "1992" },
      { key: "D", value: "1994" },
    ],
    answer: "A",
  },
  {
    question: "When was Benin captured by the british",
    options: [
      { key: "A", value: "1995" },
      { key: "B", value: "1997" },
      { key: "C", value: "1999" },
      { key: "D", value: "1991" },
    ],
    answer: "A",
  },
  {
    question: "When was peace law extablished",
    options: [
      { key: "A", value: "1990" },
      { key: "B", value: "1990" },
      { key: "C", value: "1990" },
      { key: "D", value: "1990" },
    ],
    answer: "A",
  },
  {
    question: "When was peace law extablished",
    options: [
      { key: "A", value: "1990" },
      { key: "B", value: "1990" },
      { key: "C", value: "1990" },
      { key: "D", value: "1990" },
    ],
    answer: "B",
  },
  {
    question: "When was peace law extablished",
    options: [
      { key: "A", value: "1990" },
      { key: "B", value: "1990" },
      { key: "C", value: "1990" },
      { key: "D", value: "1990" },
    ],
    answer: "A",
  },
  {
    question: "When was peace law extablished",
    options: [
      { key: "A", value: "1990" },
      { key: "B", value: "1990" },
      { key: "C", value: "1990" },
      { key: "D", value: "1990" },
    ],
    answer: "C",
  },
  {
    question: "When was peace law extablished",
    options: [
      { key: "A", value: "1990" },
      { key: "B", value: "1990" },
      { key: "C", value: "1990" },
      { key: "D", value: "1990" },
    ],
    answer: "A",
  },
  {
    question: "When was peace law extablished",
    options: [
      { key: "A", value: "1990" },
      { key: "B", value: "1990" },
      { key: "C", value: "1990" },
      { key: "D", value: "1990" },
    ],
    answer: "B",
  },
];
