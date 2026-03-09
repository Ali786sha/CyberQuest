import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import type { PasswordCheck } from "@/Game/Password/utils/passwordStrength";
const PasswordChecklist = ({ checks }: { checks: PasswordCheck[] }) => (
  <div className="grid grid-cols-2 gap-1.5">
    {checks.map((c, i) => (
      <motion.div
        key={i}
        className={`flex items-center gap-1.5 text-xs rounded-md px-2 py-1 border ${
          c.met
            ? "border-primary/30 bg-primary/5 text-primary"
            : "border-border bg-muted/30 text-muted-foreground"
        }`}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.05 }}
      >
        {c.met ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
        <span>{c.emoji} {c.label}</span>
      </motion.div>
    ))}
  </div>
);

export default PasswordChecklist;
