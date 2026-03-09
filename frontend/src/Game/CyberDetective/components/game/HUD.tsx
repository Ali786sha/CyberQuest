import { useGame } from "@/Game/CyberDetective/contexts/GameContext";
import { motion } from "framer-motion";
import { Heart, Zap, Trophy } from "lucide-react";

const HUD = () => {
  const { xp, lives, score } = useGame();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 md:px-8 border-b border-border bg-background/80 backdrop-blur-md"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center gap-2">
        <Trophy className="w-4 h-4 text-primary" />
        <span className="font-cyber text-sm text-primary neon-text-blue">{score}</span>
      </div>

      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-secondary" />
        <span className="font-cyber text-sm text-secondary neon-text-green">{xp} XP</span>
      </div>

      <div className="flex items-center gap-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <Heart
            key={i}
            className={`w-5 h-5 transition-all duration-300 ${i < lives ? "text-destructive fill-destructive" : "text-muted-foreground"}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default HUD;
