import { useState, useCallback, useEffect } from "react";
import { useGame } from "@/Game/CyberDetective/contexts/GameContext";
import { browsingScenario } from "@/Game/CyberDetective/data/gameData";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Lock, AlertTriangle, CheckCircle, X, Gift } from "lucide-react";

const XP_PER_FLAG = 20;

const Level3Browsing = () => {
  const { addXP, addScore, loseLife, setScreen, setLevelScore, earnAchievement, isGameOver } = useGame();
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  const toggle = (id: string) => {
    if (submitted) return;
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const submit = useCallback(() => {
    setSubmitted(true);
    const correctFlags = browsingScenario.redFlags.filter(f => f.isRedFlag && flagged.has(f.id));
    const wrongFlags = browsingScenario.redFlags.filter(f => !f.isRedFlag && flagged.has(f.id));

    addXP(correctFlags.length * XP_PER_FLAG);
    addScore(correctFlags.length * 80);
    if (wrongFlags.length > 0) loseLife();

    setLevelScore(3, correctFlags.length);
    const totalRedFlags = browsingScenario.redFlags.filter(f => f.isRedFlag).length;
    if (correctFlags.length === totalRedFlags && wrongFlags.length === 0) {
      earnAchievement("safe_surfer");
    }
  }, [flagged, addXP, addScore, loseLife, setLevelScore, earnAchievement]);

  useEffect(() => {
    if (isGameOver && submitted) {
      const t = setTimeout(() => setScreen("results"), 1500);
      return () => clearTimeout(t);
    }
  }, [isGameOver, submitted, setScreen]);

  return (
    <div className="min-h-screen pt-16 pb-8 px-4 flex flex-col items-center relative z-10">
      <motion.div className="text-center mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-cyber text-sm text-primary neon-text-blue tracking-widest mb-1">LEVEL 3</h2>
        <h3 className="font-cyber text-lg text-foreground">SAFE BROWSING QUEST</h3>
        <p className="text-xs text-muted-foreground mt-2">Click all the red flags on this suspicious website</p>
      </motion.div>

      {/* Fake browser window */}
      <motion.div
        className="w-full max-w-2xl bg-card border border-border rounded-sm overflow-hidden relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Browser chrome */}
        <div className="bg-muted/50 p-2 border-b border-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-accent/40" />
              <div className="w-3 h-3 rounded-full bg-secondary/40" />
            </div>
          </div>
          {/* URL bar */}
          <button
            onClick={() => toggle("url")}
            className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-sm text-left transition-all ${
              flagged.has("url") ? "bg-destructive/20 border border-destructive" : "bg-input border border-transparent"
            } ${!submitted ? "cursor-pointer hover:border-primary" : ""}`}
          >
            <button
              onClick={(e) => { e.stopPropagation(); toggle("https"); }}
              className={`flex-shrink-0 ${flagged.has("https") ? "text-destructive" : "text-muted-foreground"}`}
            >
              <Globe className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-foreground truncate">{browsingScenario.url}</span>
          </button>
        </div>

        {/* Page content */}
        <div className="p-6 relative">
          {/* Logo */}
          <button
            onClick={() => toggle("logo")}
            className={`inline-block mb-4 px-4 py-2 text-xl font-cyber transition-all rounded-sm ${
              flagged.has("logo") ? "bg-destructive/20 border border-destructive" : "hover:bg-muted/30"
            }`}
          >
            <span className="text-primary">arn</span>
            <span className="text-secondary">azon</span>
          </button>

          {/* Welcome text with grammar errors */}
          <button
            onClick={() => toggle("grammar")}
            className={`block w-full text-left mb-6 p-2 rounded-sm transition-all ${
              flagged.has("grammar") ? "bg-destructive/20 border border-destructive" : "hover:bg-muted/30"
            }`}
          >
            <p className="text-sm text-foreground">Wellcome to you're Arnazon acount</p>
          </button>

          {/* Login form */}
          <button
            onClick={() => toggle("form")}
            className={`block w-full max-w-xs mb-4 p-4 rounded-sm border transition-all ${
              flagged.has("form") ? "bg-destructive/20 border-destructive" : "border-border hover:border-primary"
            }`}
          >
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Email</label>
                <div className="w-full h-8 bg-input rounded-sm border border-border" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Password</label>
                <div className="w-full h-8 bg-input rounded-sm border border-border" />
              </div>
            </div>
          </button>

          {/* SSN field */}
          <button
            onClick={() => toggle("ssn")}
            className={`block w-full max-w-xs mb-6 p-3 rounded-sm border transition-all ${
              flagged.has("ssn") ? "bg-destructive/20 border-destructive" : "border-border hover:border-primary"
            }`}
          >
            <label className="text-xs text-destructive block mb-1">⚠ Please enter your Social Security Number for verification</label>
            <div className="w-full h-8 bg-input rounded-sm border border-border" />
          </button>

          {/* Footer */}
          <button
            onClick={() => toggle("footer")}
            className={`block w-full text-left p-2 rounded-sm transition-all border-t border-border ${
              flagged.has("footer") ? "bg-destructive/20 border-destructive" : "hover:bg-muted/30"
            }`}
          >
            <p className="text-xs text-muted-foreground">© 2024 Arnazon Inc. All rights reserved.</p>
          </button>

          {/* Popup */}
          <AnimatePresence>
            {showPopup && (
              <motion.div
                className={`absolute top-4 right-4 w-64 p-4 rounded-sm border shadow-lg transition-all ${
                  flagged.has("popup") ? "bg-destructive/20 border-destructive" : "bg-card border-secondary"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <button
                  onClick={(e) => { e.stopPropagation(); setShowPopup(false); }}
                  className="absolute top-1 right-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3 h-3" />
                </button>
                <button
                  onClick={() => toggle("popup")}
                  className="w-full text-left"
                >
                  <Gift className="w-6 h-6 text-secondary mb-2" />
                  <p className="text-xs text-foreground font-semibold">🎉 Congratulations!</p>
                  <p className="text-xs text-muted-foreground mt-1">You've won a $500 gift card! Click HERE!</p>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Flagged count */}
      <p className="text-xs text-muted-foreground mt-4">
        {flagged.size} item{flagged.size !== 1 ? "s" : ""} flagged
      </p>

      {/* Actions */}
      <div className="mt-4">
        {!submitted ? (
          <motion.button
            onClick={submit}
            className="px-8 py-3 font-cyber text-sm border-2 border-primary text-primary rounded-sm neon-glow-blue hover:bg-primary hover:text-primary-foreground transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            SUBMIT ANALYSIS
          </motion.button>
        ) : !isGameOver ? (
          <motion.button
            onClick={() => setScreen("results")}
            className="px-8 py-3 font-cyber text-sm border-2 border-primary text-primary rounded-sm neon-glow-blue hover:bg-primary hover:text-primary-foreground transition-all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            VIEW RESULTS →
          </motion.button>
        ) : null}
      </div>

      {/* Results overlay */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            className="w-full max-w-2xl mt-4 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {browsingScenario.redFlags.map(flag => (
              <div
                key={flag.id}
                className={`p-3 rounded-sm border text-xs ${
                  flag.isRedFlag
                    ? flagged.has(flag.id)
                      ? "border-secondary bg-secondary/10"
                      : "border-destructive/50 bg-destructive/5"
                    : flagged.has(flag.id)
                      ? "border-destructive bg-destructive/10"
                      : "border-border"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {flag.isRedFlag ? (
                    <AlertTriangle className="w-3 h-3 text-destructive" />
                  ) : (
                    <CheckCircle className="w-3 h-3 text-secondary" />
                  )}
                  <span className="font-semibold text-foreground">{flag.label}: {flag.description}</span>
                </div>
                <p className="text-muted-foreground">{flag.explanation}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Level3Browsing;
