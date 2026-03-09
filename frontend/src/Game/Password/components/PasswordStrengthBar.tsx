import { motion } from "framer-motion";
import { getStrengthLabel } from "@/Game/Password/utils/passwordStrength";

interface Props {
  strength: number;
}

const PasswordStrengthBar = ({ strength }: Props) => {
  const { text, color } = getStrengthLabel(strength);
  const barColor =
    strength <= 25
      ? "bg-destructive"
      : strength <= 50
      ? "bg-warning"
      : strength <= 75
      ? "bg-secondary"
      : "bg-primary";

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">Password Strength</span>
        <span className={color}>{text}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${strength}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{ boxShadow: strength === 100 ? "var(--neon-glow)" : undefined }}
        />
      </div>
    </div>
  );
};

export default PasswordStrengthBar;
