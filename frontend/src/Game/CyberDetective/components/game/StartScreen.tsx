import { useGame } from "@/Game/CyberDetective/contexts/GameContext";
import { motion } from "framer-motion";
import GlitchText from "./GlitchText";
import { Shield } from "lucide-react";

const StartScreen = () => {
  const { setScreen } = useGame();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative z-10 px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="mb-6"
      >
        <Shield className="w-20 h-20 text-primary neon-text-blue" strokeWidth={1.5} />
      </motion.div>

      <GlitchText
        text="CYBER DETECTIVE"
        className="text-3xl md:text-6xl font-bold tracking-wider text-primary neon-text-blue mb-2"
      />
      <GlitchText
        text="SCAM HUNTER"
        className="text-xl md:text-3xl font-bold tracking-widest text-secondary neon-text-green mb-8"
      />

      <motion.p
        className="text-muted-foreground text-center max-w-md mb-12 text-sm md:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Save the Digital World from Scammers
      </motion.p>

      <motion.button
        onClick={() => setScreen("level1")}
        className="relative px-10 py-4 font-cyber text-lg tracking-wider bg-transparent border-2 border-primary text-primary rounded-sm neon-glow-blue animate-pulse-neon hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        START GAME
      </motion.button>

      <motion.div
        className="mt-8 flex gap-6 text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <span>3 LEVELS</span>
        <span>•</span>
        <span>3 LIVES</span>
        <span>•</span>
        <span>∞ FUN</span>
      </motion.div>
    </div>
  );
};

export default StartScreen;
