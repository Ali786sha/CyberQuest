import { motion } from "framer-motion";
import { GameLevel } from "@/Game/Chat/data/levels";

interface ExplanationScreenProps {
  level: GameLevel;
  wasCritical: boolean;
  onNext: () => void;
  isLastLevel: boolean;
}

export function ExplanationScreen({ level, wasCritical, onNext, isLastLevel }: ExplanationScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex items-center justify-center p-6"
      style={{ background: "hsl(var(--chat-bg))" }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="bg-background rounded-2xl shadow-lg p-6 max-w-md w-full space-y-4"
      >
        {wasCritical && level.criticalFeedback && (
          <div className="bg-chat-danger/10 border border-chat-danger/30 rounded-xl p-4 animate-shake">
            <h3 className="font-bold text-chat-danger text-lg">{level.criticalFeedback.title}</h3>
            <p className="text-sm text-chat-danger/80 mt-1">{level.criticalFeedback.description}</p>
          </div>
        )}

        <div>
          <h2 className="font-bold text-lg flex items-center gap-2">
            {wasCritical ? "🚨" : "✅"} {level.explanation.title}
          </h2>
        </div>

        <ul className="space-y-2">
          {level.explanation.points.map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex items-start gap-2 text-sm"
            >
              <span className="text-primary mt-0.5">•</span>
              <span>{point}</span>
            </motion.li>
          ))}
        </ul>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-semibold text-sm transition-colors"
        >
          {isLastLevel ? "🏆 View Results" : "➡️ Next Level"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
