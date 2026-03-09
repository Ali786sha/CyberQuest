import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type GameScreen = "start" | "level1" | "level2" | "level3" | "results";

interface GameState {
  screen: GameScreen;
  xp: number;
  lives: number;
  score: number;
  level1Score: number;
  level2Score: number;
  level3Score: number;
  earnedAchievements: string[];
}

interface GameContextType extends GameState {
  setScreen: (s: GameScreen) => void;
  addXP: (amount: number) => void;
  loseLife: () => void;
  addScore: (amount: number) => void;
  setLevelScore: (level: 1 | 2 | 3, score: number) => void;
  earnAchievement: (id: string) => void;
  resetGame: () => void;
  isGameOver: boolean;
}

const initialState: GameState = {
  screen: "start",
  xp: 0,
  lives: 3,
  score: 0,
  level1Score: 0,
  level2Score: 0,
  level3Score: 0,
  earnedAchievements: [],
};

const GameContext = createContext<GameContextType | null>(null);

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GameState>(initialState);

  const setScreen = useCallback((screen: GameScreen) => setState(s => ({ ...s, screen })), []);
  const addXP = useCallback((amount: number) => setState(s => ({ ...s, xp: s.xp + amount })), []);
  const loseLife = useCallback(() => setState(s => ({ ...s, lives: Math.max(0, s.lives - 1) })), []);
  const addScore = useCallback((amount: number) => setState(s => ({ ...s, score: s.score + amount })), []);
  const setLevelScore = useCallback((level: 1 | 2 | 3, score: number) =>
    setState(s => ({ ...s, [`level${level}Score`]: score })), []);
  const earnAchievement = useCallback((id: string) =>
    setState(s => s.earnedAchievements.includes(id) ? s : { ...s, earnedAchievements: [...s.earnedAchievements, id] }), []);
  const resetGame = useCallback(() => setState(initialState), []);

  return (
    <GameContext.Provider value={{
      ...state,
      setScreen,
      addXP,
      loseLife,
      addScore,
      setLevelScore,
      earnAchievement,
      resetGame,
      isGameOver: state.lives <= 0,
    }}>
      {children}
    </GameContext.Provider>
  );
};
