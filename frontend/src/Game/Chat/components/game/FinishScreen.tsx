
import { motion } from "framer-motion";
import { getRank, getBadges } from "@/Game/Chat/data/levels";
import type { LeaderboardEntry } from "@/Game/Chat/hooks/useGameState";

interface FinishScreenProps {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  elapsedTime: number;
  formatTime: (t: number) => string;
  leaderboard: any[];
  playerName: string;
  setPlayerName: (name: string) => void;
  submitted: boolean;
  onSubmit: () => void;
  onRestart: () => void;
  onGameComplete?: (finalScore: number) => Promise<void>; // ✅ add this line
}

export function FinishScreen({
  score, correctAnswers, wrongAnswers, elapsedTime, formatTime,
  leaderboard, playerName, setPlayerName, submitted, onSubmit, onRestart,
}: FinishScreenProps) {
  const { rank, emoji, color } = getRank(score);
  const badges = getBadges(correctAnswers, wrongAnswers, score);
  const earnedBadges = badges.filter(b => b.earned);

  return (
    <div className="min-h-screen overflow-y-auto py-8 px-4" style={{ background: "hsl(var(--chat-bg))" }}>
      <div className="max-w-lg mx-auto space-y-6">
        {/* Score Card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-background rounded-2xl shadow-lg p-6 text-center space-y-3"
        >
          <div className="text-5xl">{emoji}</div>
          <h1 className="text-2xl font-bold">Game Complete!</h1>
          <div className="text-4xl font-bold text-primary">{score}</div>
          <p className="text-sm text-muted-foreground">Cyber Safety Score</p>
          <div className={`text-lg font-bold ${color}`}>🎖 {rank}</div>
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <span>⏱ {formatTime(elapsedTime)}</span>
            <span>✅ {correctAnswers}/5</span>
            <span>❌ {wrongAnswers}/5</span>
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-background rounded-2xl shadow-lg p-6 space-y-3"
        >
          <h2 className="font-bold text-base">🏅 Badges Earned</h2>
          <div className="grid grid-cols-2 gap-3">
            {badges.map(badge => (
              <div
                key={badge.name}
                className={`rounded-xl p-3 text-center text-sm border ${
                  badge.earned
                    ? "bg-chat-success/10 border-chat-success/30"
                    : "bg-secondary border-border opacity-40"
                }`}
              >
                <div className="text-2xl">{badge.emoji}</div>
                <div className="font-medium mt-1">{badge.name}</div>
                {badge.earned && <span className="text-[10px] text-chat-success">Unlocked!</span>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Name + Submit */}
        {!submitted && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-background rounded-2xl shadow-lg p-6 space-y-3"
          >
            <h2 className="font-bold text-base">📝 Enter Your Name</h2>
            <input
              type="text"
              placeholder="Your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              maxLength={20}
            />
            <button
              onClick={onSubmit}
              disabled={!playerName.trim()}
              className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-semibold text-sm disabled:opacity-40 transition-all hover:opacity-90"
            >
              Submit Score
            </button>
          </motion.div>
        )}

        {/* Leaderboard */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-background rounded-2xl shadow-lg p-6 space-y-3"
        >
          <h2 className="font-bold text-base">🏆 Leaderboard</h2>
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary text-muted-foreground">
                  <th className="py-2 px-3 text-left">Rank</th>
                  <th className="py-2 px-3 text-left">Name</th>
                  <th className="py-2 px-3 text-right">Score</th>
                  <th className="py-2 px-3 text-right">Time</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, i) => (
                  <tr key={i} className="border-t border-border/50">
                    <td className="py-2 px-3 font-medium">
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                    </td>
                    <td className="py-2 px-3">{entry.name}</td>
                    <td className="py-2 px-3 text-right font-bold text-primary">{entry.score}</td>
                    <td className="py-2 px-3 text-right text-muted-foreground">{entry.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onRestart}
            className="flex-1 bg-primary text-primary-foreground rounded-xl py-3 font-semibold text-sm hover:opacity-90 transition-all"
          >
            🔄 Play Again
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 border-2 border-primary text-primary rounded-xl py-3 font-semibold text-sm hover:bg-primary/5 transition-all"
          >
            📜 Certificate
          </button>
        </div>
      </div>
    </div>
  );
}

