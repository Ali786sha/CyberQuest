import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Lightbulb, Send, RotateCcw, Terminal, Lock, Unlock, Zap } from "lucide-react";
import GameHeader from "@/Game/Password/components/GameHeader";
import CrackingAnimation from "@/Game/Password/components/CrackingAnimation";
import { LEVELS } from "@/Game/Password/data/levels";
import { Button } from "@/Game/Password/components/ui/button";
import { Input } from "@/Game/Password/components/ui/input";

type Props = {
  onGameComplete?: (score: number) => void;
};

const FAILURE_MESSAGES = [
  "❌ ACCESS DENIED — Try again, hacker!",
  "🚫 Nope! The firewall stands strong!",
  "💀 Wrong password! Security +1, You 0",
  "🔒 Not quite... keep cracking!",
  "⚠️ Intrusion attempt failed!",
];

const SUCCESS_MESSAGES = [
  "🎉 ACCESS GRANTED! You're in!",
  "🔓 Password cracked! Brilliant!",
  "💚 System breached! Nice work!",
  "🏆 Encryption defeated! You're a pro!",
];

const Index = ({ onGameComplete }: Props) => {

  const [currentLevel, setCurrentLevel] = useState(0);
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isCracking, setIsCracking] = useState(false);
  const [revealedPositions, setRevealedPositions] = useState<boolean[]>([]);
  const [isShaking, setIsShaking] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const level = LEVELS[currentLevel];

  useEffect(() => {
    setRevealedPositions(Array(level.password.length).fill(false));
  }, [currentLevel, level.password.length]);

  const fireConfetti = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ["#00ff88", "#00e5ff", "#a855f7"] });
    setTimeout(() => confetti({ particleCount: 50, spread: 100, origin: { y: 0.5 } }), 300);
  };

  const handleCrackComplete = useCallback(() => {
    setIsCracking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guess.trim() || isCracking) return;

    setAttempts((a) => a + 1);
    setIsCracking(true);

    setTimeout(() => {
      setIsCracking(false);

      if (guess.toLowerCase() === level.password.toLowerCase()) {

        const earned = Math.max(level.points - hintsUsed * 50, 50);
        setScore((s) => s + earned);
        setBadges((b) => [...b, level.badge]);
        setRevealedPositions(Array(level.password.length).fill(true));

        setMessage(`${SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)]} (+${earned} pts)`);
        setMessageType("success");

        fireConfetti();

        if (currentLevel >= LEVELS.length - 1) {

          const finalScore = score + earned;

          if (onGameComplete) {
            onGameComplete(finalScore);
          }

          setTimeout(() => setGameComplete(true), 1500);
        }

      } else {

        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);

        setMessage(FAILURE_MESSAGES[Math.floor(Math.random() * FAILURE_MESSAGES.length)]);
        setMessageType("error");

      }

      setGuess("");

    }, 1300);
  };

  const handleHint = () => {
    if (hintsUsed >= level.hints.length) return;

    setMessage(`💡 Hint ${hintsUsed + 1}: ${level.hints[hintsUsed]}`);
    setHintsUsed((h) => h + 1);

    const hidden = revealedPositions.map((r, i) => (!r ? i : -1)).filter((i) => i >= 0);

    if (hidden.length > 0) {
      const idx = hidden[Math.floor(Math.random() * hidden.length)];
      setRevealedPositions((prev) => prev.map((r, i) => (i === idx ? true : r)));
    }
  };

  const handleNextLevel = () => {

    if (currentLevel < LEVELS.length - 1) {
      setCurrentLevel((l) => l + 1);
      setHintsUsed(0);
      setMessage("");
      setMessageType("");
      setAttempts(0);
    }

  };

  const handleRestart = () => {

    setCurrentLevel(0);
    setScore(0);
    setBadges([]);
    setHintsUsed(0);
    setMessage("");
    setMessageType("");
    setGameComplete(false);
    setAttempts(0);
    setGuess("");

  };

  const isLevelSolved = revealedPositions.every(Boolean) && messageType === "success";

  if (gameComplete) {

    return (

      <div className="min-h-screen flex items-center justify-center p-4">

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-6"
        >

          <div className="text-6xl">👑🎉🏆</div>

          <h1 className="text-4xl font-bold text-primary">
            MISSION COMPLETE
          </h1>

          <p className="text-xl">
            Final Score: {score} pts
          </p>

          <Button
            onClick={handleRestart}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
          >
            <RotateCcw className="w-4 h-4 mr-2" /> Play Again
          </Button>

        </motion.div>

      </div>

    );

  }

  return (

    <div className="min-h-screen flex flex-col items-center px-4 py-6">

      <div className="w-full max-w-2xl space-y-6">

        <GameHeader
          score={score}
          level={currentLevel + 1}
          totalLevels={LEVELS.length}
          badges={badges}
        />

        <motion.div
          className={`bg-card border border-border rounded-xl p-6 space-y-6 ${isShaking ? "animate-shake" : ""}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >

          {/* Level Info */}
          <div className="space-y-2">

            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <Terminal className="w-3.5 h-3.5" />
              <span>level_{currentLevel + 1}.exe</span>
              <span className="px-1.5 py-0.5 rounded bg-muted text-secondary text-[10px] font-bold">
                {level.difficulty}
              </span>
            </div>

            <p className="text-lg font-semibold flex items-center gap-2">
              {isLevelSolved ? <Unlock className="w-5 h-5 text-green-500" /> : <Lock className="w-5 h-5 text-red-500" />}
              {level.description}
            </p>

          </div>

          <div className="py-4">
            <CrackingAnimation
              targetWord={level.password}
              isActive={isCracking}
              onComplete={handleCrackComplete}
              revealedPositions={revealedPositions}
            />
          </div>

          <AnimatePresence>
            {message && (
              <motion.div
                key={message}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-sm font-mono p-3 rounded-lg border"
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          {!isLevelSolved ? (

            <form onSubmit={handleSubmit} className="flex gap-2">

              <Input
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Enter password guess..."
                disabled={isCracking}
                className="flex-1 font-mono"
              />

              <Button type="submit" disabled={isCracking || !guess.trim()}>
                {isCracking ? <Zap className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>

              <Button
                type="button"
                onClick={handleHint}
                disabled={hintsUsed >= level.hints.length || isCracking}
                variant="outline"
              >
                <Lightbulb className="w-4 h-4" />
              </Button>

            </form>

          ) : (

            <div className="flex justify-center">

              {currentLevel < LEVELS.length - 1 && (
                <Button onClick={handleNextLevel}>
                  Next Level →
                </Button>
              )}

            </div>

          )}

          <div className="flex justify-center gap-6 text-xs text-muted-foreground">
            <span>Attempts: {attempts}</span>
            <span>Hints: {hintsUsed}/{level.hints.length}</span>
          </div>

        </motion.div>

      </div>

    </div>

  );

};

export default Index;