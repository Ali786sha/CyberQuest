import { useState, useEffect, useCallback, useMemo } from "react";
import { useGame } from "@/Game/CyberDetective/contexts/GameContext";
import { phishingEmails, PhishingEmail } from "@/Game/CyberDetective/data/gameData";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Clock, AlertTriangle, CheckCircle, XCircle, ExternalLink } from "lucide-react";

const TIMER = 20;
const XP_CORRECT = 25;
const SCORE_CORRECT = 100;

const Level1Phishing = () => {
  const { addXP, addScore, loseLife, setScreen, setLevelScore, earnAchievement, isGameOver } = useGame();

  const emails = useMemo(() => {
    const shuffled = [...phishingEmails].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, []);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [timer, setTimer] = useState(TIMER);
  const [feedback, setFeedback] = useState<null | { correct: boolean; explanation: string }>(null);
  const [shaking, setShaking] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [hoveredLink, setHoveredLink] = useState(false);

  const currentEmail: PhishingEmail | undefined = emails[currentIdx];

  useEffect(() => {
    if (feedback || !currentEmail) return;
    if (timer <= 0) {
      handleAnswer(false); // Time out = wrong
      return;
    }
    const t = setTimeout(() => setTimer(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, feedback, currentEmail]);

  const handleAnswer = useCallback((answeredPhishing: boolean) => {
    if (feedback || !currentEmail) return;
    const correct = answeredPhishing === currentEmail.isPhishing;

    if (correct) {
      addXP(XP_CORRECT);
      addScore(SCORE_CORRECT);
      setCorrectCount(c => c + 1);
    } else {
      loseLife();
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }

    setFeedback({ correct, explanation: currentEmail.explanation });
  }, [feedback, currentEmail, addXP, addScore, loseLife]);

  const nextEmail = useCallback(() => {
    if (currentIdx >= emails.length - 1) {
      const finalCorrect = correctCount + (feedback?.correct ? 0 : 0); // already counted
      setLevelScore(1, finalCorrect);
      if (finalCorrect === emails.length) earnAchievement("phishing_pro");
      if (isGameOver) {
        setScreen("results");
      } else {
        setScreen("level2");
      }
      return;
    }
    setCurrentIdx(i => i + 1);
    setTimer(TIMER);
    setFeedback(null);
  }, [currentIdx, emails.length, correctCount, feedback, isGameOver, setScreen, setLevelScore, earnAchievement]);

  useEffect(() => {
    if (isGameOver && feedback) {
      const t = setTimeout(() => setScreen("results"), 1500);
      return () => clearTimeout(t);
    }
  }, [isGameOver, feedback, setScreen]);

  if (!currentEmail) return null;

  return (
    <div className={`min-h-screen pt-16 pb-8 px-4 flex flex-col items-center relative z-10 ${shaking ? "animate-shake" : ""}`}>
      {/* Level header */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-cyber text-sm text-primary neon-text-blue tracking-widest mb-1">LEVEL 1</h2>
        <h3 className="font-cyber text-lg text-foreground">PHISHING EMAIL DETECTOR</h3>
      </motion.div>

      {/* Timer + progress */}
      <div className="flex items-center gap-4 mb-6 w-full max-w-2xl">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <span className={`font-cyber text-sm ${timer <= 5 ? "text-destructive neon-text-red" : "text-primary"}`}>{timer}s</span>
        </div>
        <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "100%" }}
            animate={{ width: `${(timer / TIMER) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span className="text-xs text-muted-foreground">{currentIdx + 1}/{emails.length}</span>
      </div>

      {/* Email card */}
      <motion.div
        key={currentEmail.id}
        className="w-full max-w-2xl bg-card border border-border rounded-sm overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Email header */}
        <div className="border-b border-border p-4 flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-foreground text-sm">{currentEmail.sender}</span>
              <span className="text-xs text-muted-foreground truncate">&lt;{currentEmail.senderEmail}&gt;</span>
            </div>
            <p className="text-sm font-medium text-foreground mt-1">{currentEmail.subject}</p>
          </div>
        </div>

        {/* Email body */}
        <div className="p-4 text-sm text-foreground whitespace-pre-line leading-relaxed">
          {currentEmail.body}
        </div>

        {/* Link */}
        <div className="px-4 pb-4 relative">
          <div
            className="inline-flex items-center gap-1 text-primary underline cursor-pointer text-sm"
            onMouseEnter={() => setHoveredLink(true)}
            onMouseLeave={() => setHoveredLink(false)}
          >
            <ExternalLink className="w-3 h-3" />
            {currentEmail.linkText}
          </div>
          <AnimatePresence>
            {hoveredLink && (
              <motion.div
                className="absolute bottom-full left-4 mb-1 px-3 py-1.5 bg-muted text-xs text-muted-foreground rounded border border-border font-mono"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {currentEmail.realUrl}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Answer buttons */}
      {!feedback && (
        <motion.div
          className="flex gap-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            onClick={() => handleAnswer(false)}
            className="px-6 py-3 font-cyber text-sm border-2 border-secondary text-secondary rounded-sm neon-glow-green hover:bg-secondary hover:text-secondary-foreground transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ✓ LEGITIMATE
          </motion.button>
          <motion.button
            onClick={() => handleAnswer(true)}
            className="px-6 py-3 font-cyber text-sm border-2 border-destructive text-destructive rounded-sm neon-glow-red hover:bg-destructive hover:text-destructive-foreground transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⚠ PHISHING
          </motion.button>
        </motion.div>
      )}

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            className={`mt-6 w-full max-w-2xl p-4 rounded-sm border ${feedback.correct ? "border-secondary bg-secondary/10" : "border-destructive bg-destructive/10"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center gap-2 mb-2">
              {feedback.correct ? (
                <>
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <span className="font-cyber text-sm text-secondary">CORRECT! +{XP_CORRECT} XP</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-destructive" />
                  <span className="font-cyber text-sm text-destructive">SYSTEM BREACH! -1 LIFE</span>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{feedback.explanation}</p>
            <motion.button
              onClick={nextEmail}
              className="mt-3 px-4 py-2 text-xs font-cyber border border-primary text-primary rounded-sm hover:bg-primary hover:text-primary-foreground transition-all"
              whileHover={{ scale: 1.03 }}
            >
              {currentIdx >= emails.length - 1 ? "NEXT LEVEL →" : "NEXT EMAIL →"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Level1Phishing;
