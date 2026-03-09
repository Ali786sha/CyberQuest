import { useState, useCallback, useRef } from "react";
import { levels, getRank, getBadges } from "@/Game/Chat/data/levels";

export type GamePhase = "start" | "playing" | "explanation" | "critical" | "finished";

export interface LeaderboardEntry {
  name: string;
  score: number;
  time: string;
  timeMs: number;
}

const loadLeaderboard = (): LeaderboardEntry[] => {
  try {
    const stored = localStorage.getItem("cyber-leaderboard");
    return stored ? JSON.parse(stored) : [
      { name: "Aarav", score: 135, time: "3m 42s", timeMs: 222000 },
      { name: "Sneha", score: 120, time: "4m 10s", timeMs: 250000 },
      { name: "Rahul", score: 115, time: "5m 01s", timeMs: 301000 },
    ];
  } catch { return []; }
};

const saveLeaderboard = (entries: LeaderboardEntry[]) => {
  localStorage.setItem("cyber-leaderboard", JSON.stringify(entries));
};

export function useGameState() {
  const [phase, setPhase] = useState<GamePhase>("start");
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(100);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(loadLeaderboard);
  const [playerName, setPlayerName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const startTimeRef = useRef<number>(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const level = levels[currentLevel];

  const startGame = useCallback(() => {
    setPhase("playing");
    setCurrentLevel(0);
    setScore(100);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setVisibleMessages([]);
    setShowOptions(false);
    setSelectedOption(null);
    setSubmitted(false);
    setPlayerName("");
    startTimeRef.current = Date.now();
    // Start revealing messages for level 0
    revealMessages(0);
  }, []);

  const revealMessages = useCallback((levelIdx: number) => {
    setVisibleMessages([]);
    setShowOptions(false);
    setSelectedOption(null);
    const lvl = levels[levelIdx];
    lvl.messages.forEach((msg, i) => {
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, msg.id]);
        if (i === lvl.messages.length - 1) {
          setTimeout(() => setShowOptions(true), 1000);
        }
      }, msg.delay + 500);
    });
  }, []);

  const selectOption = useCallback((optionId: string) => {
    if (selectedOption) return;
    setSelectedOption(optionId);
    const option = level.options.find(o => o.id === optionId);
    if (!option) return;

    if (option.isCorrect) {
      // +15 for safe, +20 for report/verify (first option that is correct)
      const bonus = option.text.toLowerCase().includes("report") || option.text.toLowerCase().includes("verify") || option.text.toLowerCase().includes("call") ? 20 : 15;
      setScore(prev => prev + bonus);
      setCorrectAnswers(prev => prev + 1);
      setTimeout(() => setPhase("explanation"), 1500);
    } else {
      setScore(prev => prev - 20);
      setWrongAnswers(prev => prev + 1);
      if (option.isCritical && level.criticalFeedback) {
        setTimeout(() => setPhase("critical"), 1000);
      } else {
        setTimeout(() => setPhase("explanation"), 1500);
      }
    }
  }, [selectedOption, level, currentLevel]);

  const nextLevel = useCallback(() => {
    if (currentLevel < levels.length - 1) {
      const next = currentLevel + 1;
      setCurrentLevel(next);
      setPhase("playing");
      revealMessages(next);
    } else {
      const elapsed = Date.now() - startTimeRef.current;
      setElapsedTime(elapsed);
      setPhase("finished");
    }
  }, [currentLevel, revealMessages]);

  const formatTime = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}m ${secs.toString().padStart(2, "0")}s`;
  };

  const submitScore = useCallback(() => {
    if (!playerName.trim() || submitted) return;
    const entry: LeaderboardEntry = {
      name: playerName.trim(),
      score,
      time: formatTime(elapsedTime),
      timeMs: elapsedTime,
    };
    const updated = [...leaderboard, entry]
      .sort((a, b) => b.score - a.score || a.timeMs - b.timeMs)
      .slice(0, 10);
    setLeaderboard(updated);
    saveLeaderboard(updated);
    setSubmitted(true);
  }, [playerName, score, elapsedTime, leaderboard, submitted]);

  const restart = useCallback(() => {
    setPhase("start");
    setCurrentLevel(0);
    setScore(100);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setVisibleMessages([]);
    setShowOptions(false);
    setSelectedOption(null);
    setSubmitted(false);
    setPlayerName("");
  }, []);

  return {
    phase, currentLevel, score, correctAnswers, wrongAnswers,
    visibleMessages, showOptions, selectedOption, level,
    leaderboard, playerName, setPlayerName, submitted, elapsedTime,
    startGame, selectOption, nextLevel, submitScore, restart,
    formatTime, rank: getRank(score), badges: getBadges(correctAnswers, wrongAnswers, score),
  };
}
