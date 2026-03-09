// import { motion } from "framer-motion";
// import { getRank } from "@/Game/Chat/data/levels";

// interface ScoreHeaderProps {
//   score: number;
//   currentLevel: number;
//   totalLevels: number;
// }

// export function ScoreHeader({ score, currentLevel, totalLevels }: ScoreHeaderProps) {
//   const { rank, emoji } = getRank(score);
//   const progress = ((currentLevel + 1) / totalLevels) * 100;

//   return (
//     <div className="bg-chat-header text-primary-foreground px-4 py-2">
//       <div className="flex items-center justify-between text-xs sm:text-sm">
//         <span>🛡 Score: <strong>{score}</strong></span>
//         <span>📊 Level: <strong>{currentLevel + 1}</strong> of {totalLevels}</span>
//         <span>🏆 {emoji} <strong>{rank}</strong></span>
//       </div>
//       <div className="mt-1.5 h-1.5 rounded-full bg-primary-foreground/20 overflow-hidden">
//         <motion.div
//           className="h-full rounded-full bg-primary-foreground/80"
//           initial={{ width: 0 }}
//           animate={{ width: `${progress}%` }}
//           transition={{ duration: 0.5 }}
//         />
//       </div>
//     </div>
//   );
// }


import { motion } from "framer-motion";
import { getRank } from "@/Game/Chat/data/levels";

interface ScoreHeaderProps {
  score: number;
  currentLevel: number;
  totalLevels: number;
}

export function ScoreHeader({ score, currentLevel, totalLevels }: ScoreHeaderProps) {
  const { rank, emoji } = getRank(score);
  const progress = ((currentLevel + 1) / totalLevels) * 100;

  return (
    <div className="bg-chat-header text-white px-4 py-2">
  <div className="flex items-center justify-between text-xs sm:text-sm">
    <span>🛡 Score: <strong>{score}</strong></span>
    <span>📊 Level: <strong>{currentLevel + 1}</strong> of {totalLevels}</span>
    <span>🏆 {emoji} <strong>{rank}</strong></span>
  </div>

  <div className="mt-1.5 h-1.5 rounded-full bg-white/20 overflow-hidden">
    <motion.div
      className="h-full rounded-full bg-[#25D366]"
      
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5 }}
    />
  </div>
</div>
  );
}
