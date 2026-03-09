// import { GameProvider, useGame } from "@/Game/CyberDetective/contexts/GameContext";
// import ParticleBackground from "@/Game/CyberDetective/components/game/ParticleBackground";
// import HUD from "@/Game/CyberDetective/components/game/HUD";
// import StartScreen from "@/Game/CyberDetective/components/game/StartScreen";
// import Level1Phishing from "@/Game/CyberDetective/components/game/Level1Phishing";
// import Level2Identity from "@/Game/CyberDetective/components/game/Level2Identity";
// import Level3Browsing from "@/Game/CyberDetective/components/game/Level3Browsing";
// import ResultsScreen from "@/Game/CyberDetective/components/game/ResultsScreen";
// import { AnimatePresence, motion } from "framer-motion";

// const GameContent = () => {
//   const { screen } = useGame();

//   return (
//     <div className="min-h-screen bg-background relative overflow-hidden">
//       <ParticleBackground />
//       {screen !== "start" && <HUD />}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={screen}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           {screen === "start" && <StartScreen />}
//           {screen === "level1" && <Level1Phishing />}
//           {screen === "level2" && <Level2Identity />}
//           {screen === "level3" && <Level3Browsing />}
//           {screen === "results" && <ResultsScreen />}
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

// const CyberDetective = () => (
//   <GameProvider>
//     <GameContent />
//   </GameProvider>
// );

// export default CyberDetective;


import { useEffect } from "react";
import { GameProvider, useGame } from "@/Game/CyberDetective/contexts/GameContext";
import ParticleBackground from "@/Game/CyberDetective/components/game/ParticleBackground";
import HUD from "@/Game/CyberDetective/components/game/HUD";
import StartScreen from "@/Game/CyberDetective/components/game/StartScreen";
import Level1Phishing from "@/Game/CyberDetective/components/game/Level1Phishing";
import Level2Identity from "@/Game/CyberDetective/components/game/Level2Identity";
import Level3Browsing from "@/Game/CyberDetective/components/game/Level3Browsing";
import ResultsScreen from "@/Game/CyberDetective/components/game/ResultsScreen";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  onGameComplete?: (score: number) => void;
};

const GameContent = ({ onGameComplete }: Props) => {
  const game = useGame();
  const { screen } = game;

  // ✅ Score Save API
  const handleGameComplete = async (score: number) => {

  if (onGameComplete) {
    onGameComplete(score);
  }

};

  // ✅ Game finish hone par API call
  useEffect(() => {
    if (screen === "results") {
      handleGameComplete(game.score);
    }
  }, [screen]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleBackground />

      {screen !== "start" && <HUD />}

      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {screen === "start" && <StartScreen />}
          {screen === "level1" && <Level1Phishing />}
          {screen === "level2" && <Level2Identity />}
          {screen === "level3" && <Level3Browsing />}
          {screen === "results" && <ResultsScreen />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const CyberDetective = ({ onGameComplete }: Props) => (
  <GameProvider>
    <GameContent onGameComplete={onGameComplete} />
  </GameProvider>
);

export default CyberDetective;