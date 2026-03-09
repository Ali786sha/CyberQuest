import { useState, useEffect, useRef } from "react";
import { Timer, ShieldAlert, Lock, FileX, CheckCircle, AlertTriangle, Phone, RefreshCw, Key, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";
import { playRansomwareAlarm, playButtonClick, playCorrectAction, playWrongAction } from "@/Game/Email/lib/soundManager";

interface Props {
  btcAmount: string;
  encryptedFiles: string[];
  infectionLevel: number;
  onAction: (action: string, isCorrect: boolean, points: number) => void;
  onAdvance: () => void;
  score: number;
}

const RANSOM_ACTIONS = [
  { id: "isolate", label: "Isolate System", icon: Wifi, correct: true, points: 20, desc: "Critical first step: disconnect infected systems from network", badge: "Recommended" },
  { id: "restore", label: "Restore from Backup", icon: RefreshCw, correct: true, points: 20, desc: "Recover encrypted data from last clean backup snapshot", badge: "Recommended" },
  { id: "ir", label: "Call Incident Response", icon: Phone, correct: true, points: 10, desc: "Engage IR team for professional forensic containment", badge: "" },
  { id: "decrypt", label: "Attempt Decryption", icon: Key, correct: false, points: -5, desc: "Without the private key, decryption is cryptographically impossible", badge: "" },
  { id: "pay", label: "Pay Ransom", icon: ShieldAlert, correct: false, points: -20, desc: "No guarantee of recovery. Funds criminal infrastructure", badge: "High Risk" },
];

export default function RansomwareScreen({ btcAmount, encryptedFiles, infectionLevel, onAction, onAdvance, score }: Props) {
  const [timeLeft, setTimeLeft] = useState(72 * 3600);
  const [actionsUsed, setActionsUsed] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState<{ msg: string; correct: boolean } | null>(null);
  const [fileIdx, setFileIdx] = useState(3);
  const [canAdvance, setCanAdvance] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Play ransomware alarm on mount
    const t = setTimeout(() => playRansomwareAlarm(), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(prev => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setFileIdx(prev => Math.min(encryptedFiles.length, prev + 1)), 500);
    return () => clearInterval(t);
  }, [encryptedFiles.length]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [fileIdx]);

  useEffect(() => {
    if (actionsUsed.has("isolate") || actionsUsed.has("restore")) setCanAdvance(true);
  }, [actionsUsed]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const fmt = (v: number) => String(v).padStart(2, "0");

  const handleAction = (action: typeof RANSOM_ACTIONS[0]) => {
    if (actionsUsed.has(action.id)) return;
    playButtonClick();
    setActionsUsed(prev => new Set([...prev, action.id]));
    onAction(action.label, action.correct, action.points);
    if (action.correct) playCorrectAction(); else playWrongAction();
    setFeedback({
      msg: action.correct ? `${action.label} — ${action.desc}` : `${action.label} — ${action.desc}`,
      correct: action.correct,
    });
    setTimeout(() => setFeedback(null), 4000);
  };

  const usdAmount = (parseFloat(btcAmount) * 43250).toLocaleString();

  return (
    <div className="flex flex-col h-screen bg-white font-corp overflow-hidden">
      {/* Warning top bar */}
      <div className="bg-red-600 px-5 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 text-white">
          <ShieldAlert className="w-4 h-4 animate-pulse" />
          <span className="text-sm font-bold tracking-wide">CRITICAL SECURITY INCIDENT — RANSOMWARE DETECTED</span>
        </div>
        <div className="text-white/80 text-xs font-mono">
          Score: {score} &nbsp;|&nbsp; Infection: {infectionLevel}% &nbsp;|&nbsp; Threat Level: CRITICAL
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Ransom Note */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-6 py-6">
            {/* Main notice card */}
            <div className="border border-red-200 rounded-2xl overflow-hidden shadow-sm mb-5">
              {/* Card header */}
              <div className="bg-red-50 border-b border-red-200 px-6 py-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                    <Lock className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-red-700 mb-1">Your Corporate Files Have Been Encrypted</h1>
                    <p className="text-sm text-red-500 leading-relaxed">
                      All critical business data has been encrypted with AES-256-CBC + RSA-4096. Your unique decryption key is held on our secure server.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6 bg-white">
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  Your files are not accessible. The only way to recover your data is to obtain the decryption key.
                  Any attempt to use third-party recovery tools will permanently damage your encrypted files.
                  Do not modify, rename, or delete encrypted files.
                </p>

                {/* Payment demand */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-5">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Payment Demand</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-black text-gray-900">{btcAmount}</span>
                    <span className="text-xl font-bold text-gray-500">BTC</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">≈ ${usdAmount} USD at current exchange rate</p>
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <p className="text-[10px] text-gray-400 mb-1 font-mono">PAYMENT ADDRESS (BTC)</p>
                    <p className="text-xs font-mono text-gray-700 break-all">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</p>
                  </div>
                </div>

                {/* Countdown */}
                <div className="border border-red-100 bg-red-50/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Timer className="w-4 h-4 text-red-600" />
                    <span className="text-xs font-bold text-red-700 uppercase tracking-wider">Time Remaining Before Price Doubles</span>
                  </div>
                  <div className="flex gap-3 mb-2">
                    {[{ v: hours, l: "HOURS" }, { v: minutes, l: "MIN" }, { v: seconds, l: "SEC" }].map(({ v, l }) => (
                      <div key={l} className="flex-1 bg-white border border-red-200 rounded-xl p-3 text-center shadow-sm">
                        <div className="text-3xl font-black text-red-600 font-mono tabular-nums">{fmt(v)}</div>
                        <div className="text-[9px] text-red-400 font-bold tracking-widest mt-0.5">{l}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-red-500 text-center">Files will be permanently destroyed if payment is not received.</p>
                </div>
              </div>
            </div>

            {/* Encrypted Files */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm mb-5">
              <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileX className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Encrypted Files</span>
                </div>
                <span className="text-xs text-gray-400 font-mono">{fileIdx}/{encryptedFiles.length} files</span>
              </div>
              <div ref={scrollRef} className="h-36 overflow-y-auto p-4 font-mono text-xs space-y-1.5 bg-gray-50">
                {encryptedFiles.slice(0, fileIdx).map((file, i) => (
                  <div key={i} className={cn("flex items-center gap-2.5", i === fileIdx - 1 && "animate-fade-in")}>
                    <Lock className="w-3 h-3 text-red-400 shrink-0" />
                    <span className="text-gray-500 truncate">{file}</span>
                    <span className="ml-auto text-red-400 shrink-0">.enc</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: IR Actions Panel */}
        <div className="w-80 shrink-0 border-l border-gray-200 flex flex-col bg-white overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2 mb-0.5">
              <ShieldAlert className="w-4 h-4 text-blue-700" />
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Incident Response</span>
            </div>
            <p className="text-[11px] text-gray-500">Select the correct response actions. Sequence matters.</p>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={cn(
              "mx-4 mt-3 flex items-start gap-2 text-xs px-3 py-2.5 rounded-lg border animate-fade-in",
              feedback.correct ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-600"
            )}>
              {feedback.correct
                ? <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                : <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />}
              <span className="leading-relaxed">{feedback.msg}</span>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {RANSOM_ACTIONS.map(action => {
              const used = actionsUsed.has(action.id);
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => handleAction(action)}
                  disabled={used}
                  className={cn(
                    "w-full flex items-start gap-3 px-4 py-3.5 rounded-xl border text-left transition-all",
                    used
                      ? "bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed"
                      : action.correct
                      ? "bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer"
                      : "bg-white border-gray-200 hover:border-red-200 hover:bg-red-50 cursor-pointer"
                  )}
                >
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                    used ? "bg-gray-100" : action.correct ? "bg-blue-50" : "bg-red-50"
                  )}>
                    <Icon className={cn("w-4.5 h-4.5", used ? "text-gray-400" : action.correct ? "text-blue-600" : "text-red-500")} style={{ width: "18px", height: "18px" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-gray-800">{action.label}</span>
                      {action.badge && !used && (
                        <span className={cn("text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide",
                          action.badge === "Recommended" ? "bg-blue-100 text-blue-700" :
                          action.badge === "High Risk" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"
                        )}>{action.badge}</span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed">{action.desc}</p>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-1">
                    <span className={cn("text-sm font-bold", action.points > 0 ? "text-green-600" : "text-red-500")}>
                      {action.points > 0 ? `+${action.points}` : action.points}
                    </span>
                    {used && <CheckCircle className="w-3.5 h-3.5 text-gray-400" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-4 border-t border-gray-100">
            {canAdvance ? (
              <button
                onClick={onAdvance}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
              >
                <ShieldAlert className="w-4 h-4" /> Proceed to Forensic Investigation
              </button>
            ) : (
              <p className="text-[11px] text-gray-400 text-center">
                Complete "Isolate System" or "Restore from Backup" to continue.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
