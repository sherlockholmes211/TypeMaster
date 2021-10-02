import { placeholder } from "@babel/types";
import React, { useState, useRef, useEffect } from "react";
import "./Mainpage.css";

const getCloud = () =>
  `Once, a group of frogs was roaming around the forest in search of water. Suddenly, two frogs in the group accidentally fell into a deep pit.

The other frogs worried about their friends in the pit.Soon, one of the two frogs started to believe the other frogs — that they’ll never be able to escape the pit and eventually died after giving up.

The other frog keeps trying and eventually jumps so high that he escapes the pit. The other frogs were shocked at this and wondered how he did it.

The difference was that the second frog was deaf and couldn’t hear the discouragement of the group. He simply thought they were cheering him on!`.split(
    " "
  );
//  .sort(()=>Math.random()>0.5?1:-1)

function Word(props) {
  const { text, active, correct } = props;

  if (correct === true) {
    return <span className="correct"> {text} </span>;
  }
  if (correct === false) {
    return <span className="incorrect"> {text} </span>;
  }
  if (active) {
    return <span className="active"> {text} </span>;
  }
  return <span> {text} </span>;
}

Word = React.memo(Word);

function Timer(props) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const { correctWords, startCounting } = props;
  useEffect(() => {
    let id;
    if (startCounting) {
      id = setInterval(() => {
        setTimeElapsed((oldTime) => oldTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(id);
    };
  }, [startCounting]);
  const minutes = timeElapsed / 60;
  return (
    <div class="card">
      <div class="container">
        <p>
          <b>Time:</b> {timeElapsed}
        </p>
        <p>
          <b>Speed:</b> {(correctWords / minutes || 0).toFixed(2)}WPM
        </p>
      </div>
    </div>
  );
}
function Mainpage() {
  const [userInput, setUserInput] = useState(" ");
  const cloud = useRef(getCloud());
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctWordArray, setCorrectWordArray] = useState([]);
  const [startCounting, setStartCounting] = useState(false);
  function processInput(value) {
    if (activeWordIndex === cloud.current.length) {
      return;
    }
    if (!startCounting) {
      setStartCounting(true);
    }
    if (value.endsWith(" ")) {
      if (activeWordIndex === cloud.current.length - 1) {
        setStartCounting(false);
        setUserInput("Completed");
      } else {
        setUserInput("");
      }

      setActiveWordIndex((index) => index + 1);

      setCorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWordIndex] = word === cloud.current[activeWordIndex];
        return newResult;
      });
    } else {
      setUserInput(value);
    }
  }

  function refreshPage() {
    return window.location.reload(false);
  }
  return (
    <div className="main">
      <div className="center">
        <h1 className="fontname">Typing Test</h1>
        <Timer
          startCounting={startCounting}
          correctWords={correctWordArray.filter(Boolean).length}
        />
        <p className="parah">
          {cloud.current.map((word, index) => {
            return (
              <Word
                text={word}
                active={index === activeWordIndex}
                correct={correctWordArray[index]}
              />
            );
          })}
        </p>

        <input
          placeholder={"Start Typing..."}
          type="text"
          value={userInput}
          onChange={(e) => processInput(e.target.value)}
        />
      </div>
      <div>
        <button className="button" onClick={refreshPage}>
          <b>
            <h3>Click to Restart!</h3>
          </b>
        </button>
      </div>
    </div>
  );
}

export default Mainpage;
