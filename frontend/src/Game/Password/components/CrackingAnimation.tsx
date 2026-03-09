import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface CrackingAnimationProps {
  targetWord: string;
  isActive: boolean;
  onComplete: () => void;
  revealedPositions: boolean[];
}

const CrackingAnimation = ({ targetWord, isActive, onComplete, revealedPositions }: CrackingAnimationProps) => {
  const [displayChars, setDisplayChars] = useState<string[]>(Array(targetWord.length).fill("_"));
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (!isActive) {
      const chars = targetWord.split("").map((c, i) => (revealedPositions[i] ? c : "•"));
      setDisplayChars(chars);
      setCycleCount(0);
      return;
    }

    const interval = setInterval(() => {
      setCycleCount((prev) => {
        const next = prev + 1;
        if (next > 20) {
          clearInterval(interval);
          onComplete();
          return prev;
        }
        return next;
      });

      setDisplayChars(
        targetWord.split("").map((char, i) => {
          if (revealedPositions[i]) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
      );
    }, 60);

    return () => clearInterval(interval);
  }, [isActive, targetWord, revealedPositions, onComplete]);

  return (
    <div className="flex gap-1.5 justify-center font-mono text-2xl sm:text-3xl">
      {displayChars.map((char, i) => (
        <motion.span
          key={i}
          className={`inline-flex items-center justify-center w-8 h-10 sm:w-10 sm:h-12 rounded border ${
            revealedPositions[i]
              ? "border-primary bg-primary/10 neon-text text-primary"
              : isActive
              ? "border-secondary/50 text-secondary animate-decode"
              : "border-border text-muted-foreground"
          }`}
          initial={revealedPositions[i] ? { scale: 1.3 } : {}}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

export default CrackingAnimation;
