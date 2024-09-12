import { useEffect, useState, useContext } from "react";
import { themeMode } from "../context/ThemeMode";
import dinoA from "../assets/DinoSprites_tard.gif";
import dinoB from "../assets/DinoSprites_vita.gif";
import axios from "axios";

export default function HomePage({ socket }) {
  const { currentTheme, theme } = useContext(themeMode);
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
    <div className="text-center" data-theme={theme[currentTheme]?.dataTheme}>
      <h1 className="text-4xl font-bold mb-4">CLICKY Dino</h1>

      {/* Scores and Timer */}
      <div className="grid grid-cols-2 gap-10 mb-4">
        {/* Player 1 */}
        <div>
          <p className="text-6xl font-bold">{myCount}</p>
          <img src={dinoA} alt="Superman Dino" className="w-24 h-24 mb-4" />
        </div>
        {/* Player 2 */}
        <div>
          <p className="text-6xl font-bold">{otherCount}</p>
          <img src={dinoB} alt="Batman Dino" className="w-24 h-24 mb-4" />
        </div>
      </div>

      {/* Timer */}
      <div className="text-4xl mb-4">{timer}</div>

      {/* Action Buttons */}

      <div className="flex items-center justify-center space-x-8 mb-4">
        {timer === 0 || timer < 11 && timer >= 10 ? (
          <button onClick={handleVote} className="bg-gray-800 rounded-full w-20 h-20">
            Vote
          </button>
        ) : (
          <button onClick={handleAdd} className="bg-green-500 rounded-full w-20 h-20">
            Add
          </button>
        )}
      </div>
    </div>
  );
}
