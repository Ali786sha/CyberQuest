
import { useState, useCallback, useEffect } from "react";
import { initSoundManager } from "@/Game/Email/lib/soundManager";
import { generateScenario, GameScenario } from "@/Game/Email/lib/gameData";
import { GameState, GamePhase, initialGameState } from "@/Game/Email/lib/gameState";
import PhishingPhase from "@/Game/Email/components/game/PhishingPhase";
import SOCDashboard from "@/Game/Email/components/game/SOCDashboard";
import RansomwareScreen from "@/Game/Email/components/game/RansomwareScreen";
import LogInvestigation from "@/Game/Email/components/game/LogInvestigation";
import FinalReport from "@/Game/Email/components/game/FinalReport";

type Props = {
  onGameComplete?: (score: number) => void;
};

export default function Index({ onGameComplete }: Props) {

  const [scenario, setScenario] = useState<GameScenario>(() => generateScenario());
  const [gameState, setGameState] = useState<GameState>(() => initialGameState());

  // ✅ SCORE SAVE API

  const handleGameComplete = async (score: number) => {

  if (onGameComplete) {
    onGameComplete(score);
  }

};
  useEffect(() => {
    initSoundManager();
  }, []);

  const updateState = useCallback((updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  }, []);

  const logDecision = useCallback((action: string, correct: boolean, points: number, phase: GamePhase) => {
    setGameState(prev => ({
      ...prev,
      score: Math.max(0, prev.score + points),
      mistakes: correct ? prev.mistakes : prev.mistakes + 1,
      decisionLog: [...prev.decisionLog, { action, correct, points, phase }],
    }));
  }, []);

  const handlePhishingCorrect = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + 10,
      infectionLevel: 10,
      infectionPeak: Math.max(prev.infectionPeak, 10),
      decisionLog: [...prev.decisionLog, { action: "Report Phishing", correct: true, points: 10, phase: "phishing" }],
      phase: "soc",
    }));
  }, []);

  const handlePhishingWrong = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      score: Math.max(0, prev.score - 5),
      mistakes: prev.mistakes + 1,
      infectionLevel: 35,
      infectionPeak: Math.max(prev.infectionPeak, 35),
      systemsSaved: Math.max(0, prev.systemsSaved - 2),
      decisionLog: [...prev.decisionLog, { action: "Missed Phishing", correct: false, points: -5, phase: "phishing" }],
      phase: "soc",
    }));
  }, []);

  const handleSOCAction = useCallback((action: string, correct: boolean, points: number) => {
    setGameState(prev => {

      const newInfection = correct
        ? Math.max(0, prev.infectionLevel - 8)
        : Math.min(100, prev.infectionLevel + 15);

      const newPeak = Math.max(prev.infectionPeak, newInfection);

      return {
        ...prev,
        score: Math.max(0, prev.score + points),
        mistakes: correct ? prev.mistakes : prev.mistakes + 1,
        infectionLevel: newInfection,
        infectionPeak: newPeak,
        systemsSaved: correct ? Math.min(9, prev.systemsSaved + 1) : Math.max(0, prev.systemsSaved - 1),
        decisionLog: [...prev.decisionLog, { action, correct, points, phase: "soc" }],
      };
    });
  }, []);

  const handleSOCAdvance = useCallback(() => {
    setGameState(prev => {

      const shouldGoRansomware = prev.infectionLevel > 40;

      return {
        ...prev,
        phase: shouldGoRansomware ? "ransomware" : "logs",
      };
    });
  }, []);

  const handleRansomwareAction = useCallback((action: string, correct: boolean, points: number) => {
    setGameState(prev => {

      const newInfection = correct
        ? Math.max(0, prev.infectionLevel - 10)
        : Math.min(100, prev.infectionLevel + 10);

      const newPeak = Math.max(prev.infectionPeak, newInfection);

      return {
        ...prev,
        score: Math.max(0, prev.score + points),
        mistakes: correct ? prev.mistakes : prev.mistakes + 1,
        infectionLevel: newInfection,
        infectionPeak: newPeak,
        ransomPaid: action === "Pay Ransom" ? true : prev.ransomPaid,
        backupRestored: action === "Restore Backup" ? true : prev.backupRestored,
        decisionLog: [...prev.decisionLog, { action, correct, points, phase: "ransomware" }],
      };
    });
  }, []);

  const handleRansomwareAdvance = useCallback(() => {
    updateState({ phase: "logs" });
  }, [updateState]);

  const handleLogAction = useCallback((action: string, correct: boolean, points: number) => {
    setGameState(prev => ({
      ...prev,
      score: Math.max(0, prev.score + points),
      mistakes: correct ? prev.mistakes : prev.mistakes + 1,
      forensicCorrect: correct ? true : prev.forensicCorrect,
      decisionLog: [...prev.decisionLog, { action, correct, points, phase: "logs" }],
    }));
  }, []);

  const handleLogComplete = useCallback(() => {
    updateState({ phase: "report" });
  }, [updateState]);

  const handleRestart = useCallback(() => {
    setScenario(generateScenario());
    setGameState(initialGameState());
  }, []);

  const phase = gameState.phase;

  if (phase === "phishing") {
    return (
      <PhishingPhase
        scenario={scenario.phishing}
        onCorrect={handlePhishingCorrect}
        onWrong={handlePhishingWrong}
      />
    );
  }

  if (phase === "soc") {
    return (
      <SOCDashboard
        nodes={scenario.networkNodes}
        infectionLevel={gameState.infectionLevel}
        logEntries={scenario.logEntries}
        onAction={handleSOCAction}
        onAdvance={handleSOCAdvance}
        score={gameState.score}
      />
    );
  }

  if (phase === "ransomware") {
    return (
      <RansomwareScreen
        btcAmount={scenario.btcAmount}
        encryptedFiles={scenario.encryptedFiles}
        infectionLevel={gameState.infectionLevel}
        onAction={handleRansomwareAction}
        onAdvance={handleRansomwareAdvance}
        score={gameState.score}
      />
    );
  }

  if (phase === "logs") {
    return (
      <LogInvestigation
        logEntries={scenario.logEntries}
        maliciousIp={scenario.maliciousIp}
        compromisedSystem={scenario.compromisedSystem}
        onAction={handleLogAction}
        onComplete={handleLogComplete}
        score={gameState.score}
      />
    );
  }

  if (phase === "report") {

    handleGameComplete(gameState.score);

    return (
      <FinalReport
        state={gameState}
        onRestart={handleRestart}
      />
    );
  }

  return null;
}