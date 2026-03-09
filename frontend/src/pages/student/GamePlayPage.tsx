
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "../../context/AuthContext";

import PasswordFortress from "@/Game/Password/pages/PasswordFortress";
import PasswordGuessingGame from "@/Game/Password/pages/PasswordGuessing";
import Email from "@/Game/Email/pages/Email";
import Chat from "@/Game/Chat/pages/Chat";
import CyberDetective from "@/Game/CyberDetective/pages/CyberDetective";

const API_URL = "http://localhost:5000/api";

const GamePlayPage = () => {

  const { gameId } = useParams();
  const { user, token } = useAuth();

  const [sessionId, setSessionId] = useState("");

  // ================= CREATE GAME SESSION =================

  useEffect(() => {

    const createSession = async () => {

      try {

        const res = await axios.post(
          `${API_URL}/game-sessions`,
          {
            gameId: gameId,
            startTime: new Date()
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setSessionId(res.data._id);

      } catch (err) {

        console.error("Session error:", err);

      }

    };

    if (user && token) createSession();

  }, [user, token, gameId]);

  // ================= SAVE SCORE =================

   const handleGameCompleteBackend = async (finalScore) => {

  try {

    const storedUser = JSON.parse(localStorage.getItem("user"));

    await axios.post(
      `${API_URL}/scores`,
      {
        userId: storedUser._id,
        username: storedUser.name,
        avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${storedUser.name}`,
        points: finalScore,
        level: 1
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("Score saved successfully");

  } catch (err) {

    console.error("Score save error:", err);

  }

};

  // ================= GAME ROUTING =================

  if (gameId === "password-fortress") {
    return (
      <PasswordFortress
        onGameComplete={handleGameCompleteBackend}
      />
    );
  }

  if (gameId === "password-guessing") {
    return (
      <PasswordGuessingGame
        onGameComplete={handleGameCompleteBackend}
      />
    );
  }

  if (gameId === "email") {
    return (
      <Email
        onGameComplete={handleGameCompleteBackend}
      />
    );
  }

  if (gameId === "chat") {
    return (
      <Chat
        onGameComplete={handleGameCompleteBackend}
      />
    );
  }

  if (gameId === "cyberdetective") {
    return (
      <CyberDetective
        onGameComplete={handleGameCompleteBackend}
      />
    );
  }

  // ================= FALLBACK QUIZ GAME =================

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const gameData = {
    title: "Cybersecurity Fundamentals",
    totalQuestions: 1,
    questions: [
      {
        question: "What is the primary purpose of a firewall?",
        options: [
          "Increase internet speed",
          "Filter network traffic",
          "Store passwords",
          "Encrypt emails"
        ],
        correctAnswer: 1
      }
    ]
  };

  // ================= TIMER =================

  useEffect(() => {

    if (timeLeft > 0 && !gameComplete) {

      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);

    }

    if (timeLeft === 0 && !gameComplete) {

      setGameComplete(true);
      handleGameCompleteBackend(score);

    }

  }, [timeLeft]);

  const handleAnswerSelect = (index) => {

    if (!showResult) setSelectedAnswer(index);

  };

  const handleSubmitAnswer = () => {

    if (selectedAnswer === null) return;

    const isCorrect =
      selectedAnswer === gameData.questions[currentQuestion].correctAnswer;

    let updatedScore = score;

    if (isCorrect) {

      updatedScore += 100;
      setScore(updatedScore);

    }

    setShowResult(true);

    setTimeout(() => {

      setGameComplete(true);
      handleGameCompleteBackend(updatedScore);

    }, 2000);

  };

  const formatTime = (seconds) => {

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;

  };

  const progress =
    ((currentQuestion + (showResult ? 1 : 0)) /
      gameData.totalQuestions) * 100;

  // ================= GAME COMPLETE SCREEN =================

  if (gameComplete) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="card-cyber max-w-md w-full text-center">

          <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />

          <h2 className="text-3xl font-bold mb-4">
            Game Complete!
          </h2>

          <p className="text-xl font-semibold mb-6">
            Score: {score}
          </p>

          <Button className="w-full">
            Play Again
          </Button>

        </div>

      </div>

    );

  }

  // ================= MAIN GAME UI =================

  return (

    <div className="max-w-4xl mx-auto space-y-6">

      <div className="card-cyber">

        <div className="flex justify-between">

          <h1 className="text-2xl font-bold">
            {gameData.title}
          </h1>

          <span>{formatTime(timeLeft)}</span>

        </div>

        <Progress value={progress} className="h-2 mt-4" />

      </div>

      <div className="card-cyber">

        <h2 className="text-xl mb-4">
          {gameData.questions[currentQuestion].question}
        </h2>

        <div className="space-y-3">

          {gameData.questions[currentQuestion].options.map((option, index) => (

            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className="w-full p-4 border rounded-lg"
            >
              {option}
            </button>

          ))}

        </div>

        <Button
          onClick={handleSubmitAnswer}
          disabled={selectedAnswer === null || showResult}
          className="w-full mt-4"
        >
          Submit Answer
        </Button>

      </div>

    </div>

  );

};

export default GamePlayPage;