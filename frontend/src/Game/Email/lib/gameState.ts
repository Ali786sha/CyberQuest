export type GamePhase = "phishing" | "soc" | "ransomware" | "logs" | "report";

export interface GameState {
  phase: GamePhase;
  score: number;
  infectionLevel: number;
  mistakes: number;
  systemsSaved: number;
  dataLoss: number;
  startTime: number;
  phaseTimes: Record<GamePhase, number>;
  decisionLog: Array<{ action: string; correct: boolean; points: number; phase: GamePhase }>;
  infectionPeak: number;
  ransomPaid: boolean;
  backupRestored: boolean;
  forensicCorrect: boolean;
}

export const initialGameState = (): GameState => ({
  phase: "phishing",
  score: 0,
  infectionLevel: 0,
  mistakes: 0,
  systemsSaved: 9,
  dataLoss: 0,
  startTime: Date.now(),
  phaseTimes: { phishing: 0, soc: 0, ransomware: 0, logs: 0, report: 0 },
  decisionLog: [],
  infectionPeak: 0,
  ransomPaid: false,
  backupRestored: false,
  forensicCorrect: false,
});

export function calcContainmentEfficiency(state: GameState): number {
  const base = 100 - state.infectionPeak;
  const bonus = state.forensicCorrect ? 10 : 0;
  const penalty = state.ransomPaid ? -20 : 0;
  return Math.max(0, Math.min(100, base + bonus + penalty));
}

export function getEvaluation(score: number): "excellent" | "moderate" | "weak" {
  if (score >= 100) return "excellent";
  if (score >= 60) return "moderate";
  return "weak";
}
