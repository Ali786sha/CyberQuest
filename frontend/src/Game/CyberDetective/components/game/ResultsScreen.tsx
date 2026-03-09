import { useGame } from "@/Game/CyberDetective/contexts/GameContext";
import { achievements } from "@/Game/CyberDetective/data/gameData";
import { motion } from "framer-motion";
import { RotateCcw, Trophy, Zap, Star } from "lucide-react";

const ResultsScreen = () => {
  const { score, xp, lives, level1Score, level2Score, level3Score, earnedAchievements, resetGame } = useGame();

  const maxScore = 5 * 100 + 5 * 80 + 7 * 80; // rough max
  const percentage = Math.min(100, Math.round((score / maxScore) * 100));

  let rank = "Rookie";
  if (percentage >= 90) rank = "Elite Cyber Detective";
  else if (percentage >= 70) rank = "Senior Agent";
  else if (percentage >= 50) rank = "Junior Detective";

  return (
    <div className="min-h-screen pt-16 pb-8 px-4 flex flex-col items-center justify-center relative z-10">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Trophy className="w-16 h-16 text-primary mx-auto mb-4 neon-text-blue" />
        <h2 className="font-cyber text-2xl md:text-4xl text-primary neon-text-blue mb-2">MISSION COMPLETE</h2>
        <p className="text-muted-foreground text-sm">Case File Summary</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="w-full max-w-md space-y-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="bg-card border border-border rounded-sm p-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Final Score</span>
          <span className="font-cyber text-lg text-primary neon-text-blue">{score}</span>
        </div>
        <div className="bg-card border border-border rounded-sm p-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total XP</span>
          <span className="font-cyber text-lg text-secondary neon-text-green">{xp}</span>
        </div>
        <div className="bg-card border border-border rounded-sm p-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Lives Remaining</span>
          <span className="font-cyber text-lg text-foreground">{lives}/3</span>
        </div>
        <div className="bg-card border border-border rounded-sm p-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Rank</span>
          <span className="font-cyber text-sm text-accent">{rank}</span>
        </div>

        {/* Level breakdown */}
        <div className="bg-card border border-border rounded-sm p-4 space-y-2">
          <h4 className="font-cyber text-xs text-muted-foreground mb-2">LEVEL BREAKDOWN</h4>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">L1: Phishing Detector</span>
            <span className="text-foreground">{level1Score}/5 correct</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">L2: Identity Theft</span>
            <span className="text-foreground">{level2Score}/5 identified</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">L3: Safe Browsing</span>
            <span className="text-foreground">{level3Score}/7 flags found</span>
          </div>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        className="w-full max-w-md mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="font-cyber text-xs text-muted-foreground mb-3">ACHIEVEMENTS</h4>
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((a, i) => {
            const earned = earnedAchievements.includes(a.id);
            return (
              <motion.div
                key={a.id}
                className={`p-3 rounded-sm border text-center ${earned ? "border-secondary bg-secondary/10" : "border-border bg-muted/20 opacity-40"}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: earned ? 1 : 0.4, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <span className="text-2xl">{a.icon}</span>
                <p className="text-xs font-cyber mt-1 text-foreground">{a.name}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Replay */}
      <motion.button
        onClick={resetGame}
        className="px-8 py-3 font-cyber text-sm border-2 border-primary text-primary rounded-sm neon-glow-blue hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <RotateCcw className="w-4 h-4" />
        PLAY AGAIN
      </motion.button>
    </div>
  );
};

export default ResultsScreen;
