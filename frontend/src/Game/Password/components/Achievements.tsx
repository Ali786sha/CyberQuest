import { motion } from "framer-motion";

export interface Achievement {
  id: string;
  label: string;
  emoji: string;
  unlocked: boolean;
}

export const ACHIEVEMENT_DEFS: Omit<Achievement, "unlocked">[] = [
  { id: "first_try", label: "First Attempt", emoji: "🎯" },
  { id: "strong", label: "Strong Password", emoji: "💪" },
  { id: "speedy", label: "Speed Demon (<15s)", emoji: "⚡" },
  { id: "no_hints", label: "No Hints Used", emoji: "🧠" },
  { id: "perfect", label: "Perfect Score", emoji: "👑" },
];

const Achievements = ({ achievements }: { achievements: Achievement[] }) => (
  <div className="space-y-2">
    <h3 className="text-xs text-muted-foreground font-display">Achievements</h3>
    <div className="flex flex-wrap gap-2">
      {achievements.map((a) => (
        <motion.div
          key={a.id}
          className={`text-xs px-2.5 py-1 rounded-full border ${
            a.unlocked
              ? "border-primary/40 bg-primary/10 text-primary neon-border"
              : "border-border bg-muted/20 text-muted-foreground opacity-50"
          }`}
          initial={a.unlocked ? { scale: 0 } : {}}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {a.emoji} {a.label}
        </motion.div>
      ))}
    </div>
  </div>
);

export default Achievements;
