// import { motion } from "framer-motion";

// interface StartScreenProps {
//   onStart: () => void;
// }

// export function StartScreen({ onStart }: StartScreenProps) {
//   return (
//     <div className="flex items-center justify-center min-h-screen" style={{ background: "hsl(var(--chat-bg))" }}>
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ type: "spring", damping: 20 }}
//         className="bg-background rounded-3xl shadow-xl p-8 max-w-sm w-full mx-4 text-center space-y-6"
//       >
//         <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-4xl mx-auto">
//           🔒
//         </div>
//         <div>
//           <h1 className="text-2xl font-bold">SafeChat</h1>
//           <p className="text-sm text-muted-foreground mt-1">Cyber Awareness Training Game</p>
//         </div>
//         <div className="text-left space-y-2 text-sm text-muted-foreground bg-secondary rounded-xl p-4">
//           <p>🛡️ <strong>5 realistic scam scenarios</strong></p>
//           <p>🎯 <strong>Starting score: 100 points</strong></p>
//           <p>⚡ <strong>Choose wisely — wrong moves cost points!</strong></p>
//           <p>🏆 <strong>Earn badges & climb the leaderboard</strong></p>
//         </div>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={onStart}
//           className="w-full bg-primary text-primary-foreground rounded-xl py-3.5 font-bold text-base animate-pulse-glow"
//         >
//           🚀 Start Training
//         </motion.button>
//         <p className="text-[10px] text-muted-foreground">
//           For educational purposes only. No real brands or logos used.
//         </p>
//       </motion.div>
//     </div>
//   );
// }


import { motion } from "framer-motion";

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: "hsl(var(--chat-bg))" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="bg-background rounded-3xl shadow-xl p-8 max-w-sm w-full mx-4 text-center space-y-6"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-4xl mx-auto">
          🔒
        </div>
        <div>
          <h1 className="text-2xl font-bold">SafeChat</h1>
          <p className="text-sm text-muted-foreground mt-1">Cyber Awareness Training Game</p>
        </div>
        <div className="text-left space-y-2 text-sm text-muted-foreground bg-[#1f2c34] rounded-xl p-4">
          <p>🛡️ <strong>5 realistic scam scenarios</strong></p>
          <p>🎯 <strong>Starting score: 100 points</strong></p>
          <p>⚡ <strong>Choose wisely — wrong moves cost points!</strong></p>
          <p>🏆 <strong>Earn badges & climb the leaderboard</strong></p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="w-full bg-primary text-primary-foreground rounded-xl py-3.5 font-bold text-base animate-pulse-glow">
          🚀 Start Training
        </motion.button>
        <p className="text-[10px] text-muted-foreground">
          For educational purposes only. No real brands or logos used.
        </p>
      </motion.div>
    </div>
  );
}
