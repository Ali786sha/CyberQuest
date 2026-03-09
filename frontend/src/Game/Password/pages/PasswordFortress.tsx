import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Shield, Send, RotateCcw, Lightbulb, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Lock3D from "@/Game/Password/components/Lock3D";
import PasswordStrengthBar from "@/Game/Password/components/PasswordStrengthBar";
import PasswordChecklist from "@/Game/Password/components/PasswordChecklist";
import Achievements, { Achievement, ACHIEVEMENT_DEFS } from "@/Game/Password/components/Achievements";
import { Button } from "@/Game/Password/components/ui/button";
import { Input } from "@/Game/Password/components/ui/input";
import {
  getChecks,
  getStrength,
  isValid,
  getFeedbackMessage,
  HINTS,
} from "@/Game/Password/utils/passwordStrength";
import { playTyping, playError, playSuccess, playUnlock } from "@/Game/Password/utils/sounds";

type Props = {
  onGameComplete?: (score: number) => void;
};

const PasswordFortress = ({ onGameComplete }: Props) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintMessage, setHintMessage] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [checking, setChecking] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>(
    ACHIEVEMENT_DEFS.map((a) => ({ ...a, unlocked: false }))
  );
  const startTime = useRef(Date.now());

  const strength = getStrength(password);
  const checks = getChecks(password);
  const feedback = getFeedbackMessage(password);

  const unlock = (id: string) =>
    setAchievements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, unlocked: true } : a))
    );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    playTyping();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || checking || unlocked) return;

    setAttempts((a) => a + 1);
    setChecking(true);

    // Typewriter checking effect
    setTimeout(() => {
      setChecking(false);

      if (isValid(password)) {
        playSuccess();
        setTimeout(playUnlock, 400);
        setUnlocked(true);
        setMessage("Hurray! You saved the system! 🕵️‍♀️🎉");
        setMessageType("success");

        // Score
        const bonus = Math.max(500 - (attempts * 50) - (hintsUsed * 100), 100);
        setScore(bonus);

        if (onGameComplete) {
        onGameComplete(bonus);
          }


        // Achievements
        unlock("strong");
        if (attempts === 0) unlock("first_try");
        if (hintsUsed === 0) unlock("no_hints");
        if (Date.now() - startTime.current < 15000) unlock("speedy");
        if (attempts === 0 && hintsUsed === 0) unlock("perfect");

        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ["#00ff88", "#00e5ff", "#a855f7"] });
        setTimeout(() => confetti({ particleCount: 60, spread: 100, origin: { y: 0.5 } }), 400);
      } else {
        playError();
        setShaking(true);
        setTimeout(() => setShaking(false), 600);
        setMessage("Password Incorrect! " + feedback);
        setMessageType("error");
      }
    }, 1200);
  };

  const handleHint = () => {
    const idx = hintsUsed % HINTS.length;
    setHintMessage(HINTS[idx]);
    setHintsUsed((h) => h + 1);
    setTimeout(() => setHintMessage(""), 4000);
  };

  const handleReset = () => {
    setPassword("");
    setAttempts(0);
    setScore(0);
    setHintsUsed(0);
    setHintMessage("");
    setUnlocked(false);
    setMessage("");
    setMessageType("");
    setChecking(false);
    setAchievements(ACHIEVEMENT_DEFS.map((a) => ({ ...a, unlocked: false })));
    startTime.current = Date.now();
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 sm:py-10 relative overflow-hidden">
      <div className="scanline absolute inset-0 z-0" />
      <div className="relative z-10 w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-secondary neon-text-cyan" />
            <h1 className="text-2xl font-display font-bold text-secondary neon-text-cyan">
              Password Fortress
            </h1>
            <span className="text-lg">🏰</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-muted border border-border text-sm">
            <span className="text-muted-foreground">PTS </span>
            <span className="text-primary font-bold neon-text">{score}</span>
          </div>
        </div>

        {/* 3D Lock */}
        <Lock3D unlocked={unlocked} shaking={shaking} />

        {/* Main Card */}
        <motion.div
          className={`bg-card border border-border rounded-xl p-5 sm:p-8 space-y-5 ${shaking ? "animate-shake" : ""}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <p className="text-foreground font-display text-lg font-semibold text-center">
            {unlocked ? "🔓 System Unlocked!" : "🔒 Create a strong password to unlock the system"}
          </p>

          {/* Strength Bar */}
          <PasswordStrengthBar strength={strength} />

          {/* Checklist */}
          <PasswordChecklist checks={checks} />

          {/* Feedback */}
          <p className="text-center text-sm text-secondary">{feedback}</p>

          {/* Hint */}
          <AnimatePresence>
            {hintMessage && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="text-center text-xs p-2 rounded-lg border border-accent/30 bg-accent/5 text-accent"
              >
                💡 {hintMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message */}
          <AnimatePresence mode="wait">
            {message && (
              <motion.div
                key={message}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`text-center text-sm font-mono p-3 rounded-lg border ${
                  messageType === "success"
                    ? "border-primary/30 bg-primary/5 text-primary"
                    : "border-destructive/30 bg-destructive/5 text-destructive"
                }`}
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Checking animation */}
          {checking && (
            <div className="text-center text-secondary text-sm font-mono animate-pulse">
              Analyzing password
              <span className="inline-block w-6 text-left">
                <span className="terminal-cursor">...</span>
              </span>
            </div>
          )}

          {/* Input */}
          {!unlocked ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  value={password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a strong password…"
                  disabled={checking}
                  className="pr-10 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary focus:border-primary font-mono"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Button
                type="submit"
                disabled={checking || !password.trim()}
                className="bg-primary text-primary-foreground hover:bg-primary/90 neon-border font-bold"
              >
                <Send className="w-4 h-4" />
              </Button>
              {attempts >= 3 && (
                <Button
                  type="button"
                  onClick={handleHint}
                  variant="outline"
                  className="border-accent/50 text-accent hover:bg-accent/10"
                >
                  <Lightbulb className="w-4 h-4" />
                </Button>
              )}
            </form>
          ) : (
            <div className="flex justify-center">
              <Button
                onClick={handleReset}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 neon-border-cyan font-bold px-8"
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Try Again
              </Button>
            </div>
          )}

          {/* Stats */}
          <div className="flex justify-center gap-6 text-xs text-muted-foreground">
            <span>Attempts: {attempts}</span>
            <span>Hints: {hintsUsed}</span>
          </div>
        </motion.div>

        {/* Achievements */}
        <Achievements achievements={achievements} />

        {/* Tip */}
        <p className="text-center text-xs text-muted-foreground">
          🛡️ Tip: Use a mix of letters, numbers, and symbols for the strongest passwords!
        </p>
      </div>
    </div>
  );
};

export default PasswordFortress;
