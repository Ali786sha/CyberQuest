export interface PasswordCheck {
  label: string;
  met: boolean;
  emoji: string;
}

export const getChecks = (pw: string): PasswordCheck[] => [
  { label: "At least 8 characters", met: pw.length >= 8, emoji: "📏" },
  { label: "One uppercase letter", met: /[A-Z]/.test(pw), emoji: "🔠" },
  { label: "One number", met: /[0-9]/.test(pw), emoji: "🔢" },
  { label: "One special character", met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw), emoji: "✨" },
];

export const getStrength = (pw: string): number => {
  if (!pw) return 0;
  const checks = getChecks(pw);
  const met = checks.filter((c) => c.met).length;
  return Math.round((met / checks.length) * 100);
};

export const getStrengthLabel = (strength: number): { text: string; color: string } => {
  if (strength === 0) return { text: "Empty", color: "text-muted-foreground" };
  if (strength <= 25) return { text: "Weak 😰", color: "text-destructive" };
  if (strength <= 50) return { text: "Fair 🤔", color: "text-warning" };
  if (strength <= 75) return { text: "Good 😊", color: "text-secondary" };
  return { text: "Strong 💪🔥", color: "text-primary" };
};

export const isValid = (pw: string): boolean => getChecks(pw).every((c) => c.met);

export const HINTS = [
  "Try mixing uppercase and lowercase letters! 🔠",
  "Numbers make passwords harder to guess! 🔢",
  "Special characters like @#$% add extra security! ✨",
  "Longer passwords are always stronger! 📏",
  "Think of a phrase and abbreviate it! 💡",
];

export const getFeedbackMessage = (pw: string): string => {
  if (!pw) return "Start typing your password… 🖊️";
  const checks = getChecks(pw);
  const unmet = checks.filter((c) => !c.met);
  if (unmet.length === 0) return "Perfect! Hit submit to unlock! 🎯";
  if (pw.length < 8) return "Almost there! Keep going 🏃‍♀️";
  if (!checks[1].met) return "Add an uppercase letter to level up! 🔠";
  if (!checks[2].met) return "Add a number to level up! 🔢";
  if (!checks[3].met) return "Special character missing! ✨";
  return "Keep going! You're close! 💪";
};
