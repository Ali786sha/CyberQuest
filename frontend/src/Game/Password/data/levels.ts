export interface Level {
  password: string;
  hints: string[];
  description: string;
  points: number;
  badge: string;
  difficulty: string;
}

export const LEVELS: Level[] = [
  {
    password: "admin",
    hints: [
      "🤔 It's the most common default username...",
      "💡 Think 'administrator' but shorter",
      "🔥 Starts with 'a' and has 5 letters",
    ],
    description: "Crack the default system password",
    points: 100,
    badge: "🥉",
    difficulty: "Easy",
  },
  {
    password: "qwerty",
    hints: [
      "🤔 Look at the top row of your keyboard...",
      "💡 First 6 letters on a standard keyboard",
      "🔥 Q-W-E-R-T-Y",
    ],
    description: "Break into the lazy user's account",
    points: 200,
    badge: "🥈",
    difficulty: "Easy",
  },
  {
    password: "dragon",
    hints: [
      "🤔 A mythical fire-breathing creature 🐉",
      "💡 One of the top 10 most used passwords ever",
      "🔥 6 letters, starts with 'd'",
    ],
    description: "Decode the gamer's secret password",
    points: 300,
    badge: "🥇",
    difficulty: "Medium",
  },
  {
    password: "letmein",
    hints: [
      "🤔 What would you say to a door? 🚪",
      "💡 Three words combined: ___ ___ ___",
      "🔥 'let' + 'me' + 'in'",
    ],
    description: "Hack the polite hacker's system",
    points: 400,
    badge: "🏆",
    difficulty: "Medium",
  },
  {
    password: "shadow",
    hints: [
      "🤔 It follows you everywhere but has no weight 👤",
      "💡 Think darkness, silhouette...",
      "🔥 6 letters, common in password lists",
    ],
    description: "Crack the final boss password",
    points: 500,
    badge: "👑",
    difficulty: "Hard",
  },
];
