import { useEffect, useState, useContext } from "react";

import dinoA from "../assets/DinoDiem.png";
import dinoB from "../assets/DinoDiemIjo.png";
import axios from "axios";
import background from "../assets/bg.png";

export default function HomePage({ socket }) {
  const [myCount, setMyCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);
  const [room, setRoom] = useState("");
  const [isWaiting, setIsWaiting] = useState(true);
  const [timer, setTimer] = useState(10);
  const [otherVote, setOtherVote] = useState(0);
  const [myVote, setMyVote] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [score, setScore] = useState(0);

  function handleAdd() {
    if (room) {
      socket.emit("count:add", { room });
      console.log(localStorage.getItem("userId"));
    }
  }

  function handleVote() {
    if (room) {
      socket.emit("vote", { room });
    }
  }

  function handleScore() {
    if (room) {
      axios.post(
        "http://localhost:3000/score",
        { score: myScore },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setMyScore(0);
    }
  }

  useEffect(() => {
    socket.connect();

    socket.on("message", (message) => {
      console.log(message);
      const matched = message.match(/room (\d+)/);
      if (matched) {
        setRoom(`room-${matched[1]}`);
      }

      if (message.includes("Waiting")) {
        setIsWaiting(true);
      } else {
        setIsWaiting(false);
      }
    });

    socket.on("count:update", (counts, score) => {
      const userIds = Object.keys(counts);
      const myId = socket.id;

      setMyCount(counts[myId]);
      const otherUserId = userIds.find((id) => id !== myId);
      if (otherUserId) {
        setOtherCount(counts[otherUserId]);
      }
      setMyScore(counts[myId]);
      const otherScore = userIds.find((id) => id !== myId);
      if (otherScore) {
        setOtherScore(counts[otherScore]);
      }
    });

    socket.on("vote:update", (vote) => {
      const userIds = Object.keys(vote);
      const myId = socket.id;

      setMyVote(vote[myId]);
      const otherUserId = userIds.find((id) => id !== myId);
      if (otherUserId) {
        setOtherVote(vote[otherUserId]);
      }
    });

    socket.on("timer:update", (timeLeft) => {
      setTimer(timeLeft);
      if (timeLeft <= 0) {
        console.log(localStorage.getItem("username"));
        setTimer(timeLeft);
      }
    });

    return () => {
      socket.off("message");
      socket.off("count:update");
      socket.off("timer:update");
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (timer <= 0) {
      setScore(myCount);
      console.log(score);
    }

    if (myScore === score) {
      handleScore();
    }
  }, [myScore, score, timer]);

  console.log(myCount);

  return (
    <div className="text-center w-screen h-screen ">
      <img
        className="w-full h-full object-cover absolute  left-5 z-[-1]  "
        src={background}
        alt="background"
      />

      {/* Scores and Timer */}
      <div className="flex justify-center space-x-10 mb-10 pt-12">
        {/* Player 1 */}
        <div>
          <p className="text-6xl font-bold mb-12">{myCount}</p>
          <p className="text-2xl font-bold">nama</p>
          <img src={dinoA} alt="Superman Dino" className="w-28 h-28 mb-12" />
        </div>
        {/* Player 2 */}
        <div>
          <p className="text-6xl font-bold mb-12">{otherCount}</p>
          <p className="text-2xl font-bold">nama</p>
          <img src={dinoB} alt="Batman Dino" className="w-28 h-28 mb-12" />
        </div>
      </div>

      {/* Timer */}
      <span className="countdown font-mono text-6xl">
        <span style={{ "--value": `${timer}` }}></span>
      </span>

      {/* Action Buttons */}

      <div className="flex items-center justify-center space-x-8 mb-4">
        {timer === 0 || (timer < 11 && timer >= 10) ? (
          <button
            onClick={handleVote}
            className="bg-gray-800 rounded-full w-20 h-20"
          >
            READY
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-green-500 rounded-full w-20 h-20"
          >
            CLICK
          </button>
        )}
      </div>
    </div>
  );
}
