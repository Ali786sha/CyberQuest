import { useState, useCallback, useEffect } from "react";
import { useGame } from "@/Game/CyberDetective/contexts/GameContext";
import { socialProfile } from "@/Game/CyberDetective/data/gameData";
import { motion, AnimatePresence } from "framer-motion";
import { User, CheckCircle, MapPin, Phone, Mail, Briefcase, Calendar, Key, Palmtree, Clock } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  dob: <Calendar className="w-4 h-4" />,
  phone: <Phone className="w-4 h-4" />,
  email: <Mail className="w-4 h-4" />,
  location: <MapPin className="w-4 h-4" />,
  workplace: <Briefcase className="w-4 h-4" />,
  password_hint: <Key className="w-4 h-4" />,
  vacation: <Palmtree className="w-4 h-4" />,
  joined: <Clock className="w-4 h-4" />,
};

const XP_PER_CORRECT = 20;

const Level2Identity = () => {
  const { addXP, addScore, loseLife, setScreen, setLevelScore, earnAchievement, isGameOver } = useGame();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const toggle = (id: string) => {
    if (submitted) return;
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const submit = useCallback(() => {
    setSubmitted(true);
    const riskyItems = socialProfile.items.filter(i => i.isRisky);
    const correctSelections = socialProfile.items.filter(i => i.isRisky && selected.has(i.id));
    const wrongSelections = socialProfile.items.filter(i => !i.isRisky && selected.has(i.id));

    const score = correctSelections.length;
    const penalty = wrongSelections.length;

    addXP(score * XP_PER_CORRECT);
    addScore(score * 80);
    if (penalty > 0) loseLife();

    setLevelScore(2, score);
    if (score === riskyItems.length && penalty === 0) earnAchievement("privacy_protector");

    setTimeout(() => setShowResults(true), 500);
  }, [selected, addXP, addScore, loseLife, setLevelScore, earnAchievement]);

  useEffect(() => {
    if (isGameOver && submitted) {
      const t = setTimeout(() => setScreen("results"), 1500);
      return () => clearTimeout(t);
    }
  }, [isGameOver, submitted, setScreen]);

  return (
    <div className="min-h-screen pt-16 pb-8 px-4 flex flex-col items-center relative z-10">
      <motion.div className="text-center mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-cyber text-sm text-primary neon-text-blue tracking-widest mb-1">LEVEL 2</h2>
        <h3 className="font-cyber text-lg text-foreground">IDENTITY THEFT CHALLENGE</h3>
        <p className="text-xs text-muted-foreground mt-2">Click all the risky information a scammer could exploit</p>
      </motion.div>

      {/* Profile card */}
      <motion.div
        className="w-full max-w-lg bg-card border border-border rounded-sm overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Profile header */}
        <div className="p-6 border-b border-border flex items-center gap-4 bg-muted/30">
          <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h4 className="font-cyber text-base text-foreground">{socialProfile.name}</h4>
            <p className="text-xs text-muted-foreground">Public Profile</p>
          </div>
        </div>

        {/* Profile items */}
        <div className="divide-y divide-border">
          {socialProfile.items.map((item, i) => {
            const isSelected = selected.has(item.id);
            const showResult = submitted;
            let borderColor = "border-transparent";
            if (showResult) {
              if (item.isRisky && isSelected) borderColor = "border-secondary";
              else if (item.isRisky && !isSelected) borderColor = "border-destructive/50";
              else if (!item.isRisky && isSelected) borderColor = "border-destructive";
            } else if (isSelected) {
              borderColor = "border-primary";
            }

            return (
              <motion.button
                key={item.id}
                onClick={() => toggle(item.id)}
                className={`w-full text-left p-4 flex items-center gap-3 transition-all border-l-4 ${borderColor} ${!submitted ? "hover:bg-muted/30 cursor-pointer" : "cursor-default"} ${isSelected && !submitted ? "bg-primary/5" : ""}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="text-muted-foreground">{iconMap[item.id]}</div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <p className="text-sm text-foreground">{item.value}</p>
                  {showResults && (
                    <motion.p
                      className="text-xs text-muted-foreground mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {item.riskReason}
                    </motion.p>
                  )}
                </div>
                {showResult && (
                  <div className="flex-shrink-0">
                    {item.isRisky ? (
                      <span className="text-xs text-destructive font-cyber">RISKY</span>
                    ) : (
                      <span className="text-xs text-secondary font-cyber">SAFE</span>
                    )}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Actions */}
      <div className="mt-6">
        {!submitted ? (
          <motion.button
            onClick={submit}
            className="px-8 py-3 font-cyber text-sm border-2 border-primary text-primary rounded-sm neon-glow-blue hover:bg-primary hover:text-primary-foreground transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CheckCircle className="w-4 h-4 inline mr-2" />
            SUBMIT ANALYSIS
          </motion.button>
        ) : showResults && !isGameOver ? (
          <motion.button
            onClick={() => setScreen("level3")}
            className="px-8 py-3 font-cyber text-sm border-2 border-primary text-primary rounded-sm neon-glow-blue hover:bg-primary hover:text-primary-foreground transition-all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            NEXT LEVEL →
          </motion.button>
        ) : null}
      </div>
    </div>
  );
};

export default Level2Identity;
