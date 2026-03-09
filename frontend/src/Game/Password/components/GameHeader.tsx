import { motion } from "framer-motion";
import { Shield } from "lucide-react";

interface GameHeaderProps {
  score: number;
  level: number;
  totalLevels: number;
  badges: string[];
}

const GameHeader = ({ score, level, totalLevels, badges }: GameHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <Shield className="w-8 h-8 text-primary neon-text" />
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-primary neon-text">
          CyberCrack
        </h1>
        <span className="text-lg">🔐</span>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <div className="px-3 py-1.5 rounded-lg bg-muted border border-border">
          <span className="text-muted-foreground">LVL </span>
          <span className="text-secondary font-bold neon-text-cyan">{level}/{totalLevels}</span>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-muted border border-border">
          <span className="text-muted-foreground">PTS </span>
          <span className="text-primary font-bold neon-text">{score}</span>
        </div>
        {badges.length > 0 && (
          <motion.div
            className="flex gap-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {badges.map((badge, i) => (
              <span key={i} className="text-lg">{badge}</span>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GameHeader;
