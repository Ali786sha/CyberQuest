import { Shield, TrendingDown, Server, AlertTriangle, Clock, CheckCircle, RotateCcw, Star, Activity, Target, FileText, Award } from "lucide-react";
import { GameState, calcContainmentEfficiency, getEvaluation } from "@//Game/Email/lib/gameState";
import { cn } from "@/lib/utils";

interface Props {
  state: GameState;
  onRestart: () => void;
}

const TOPICS = [
  { label: "Phishing Detection", icon: "🎣", desc: "Identifying social engineering, spoofed senders & malicious attachments" },
  { label: "Malware Analysis", icon: "🦠", desc: "Understanding malware types, behaviors and execution chains" },
  { label: "Network Isolation", icon: "🌐", desc: "Containing threats through network segmentation and device isolation" },
  { label: "Ransomware Response", icon: "🔐", desc: "Proper IR procedures and decision-making during ransomware incidents" },
  { label: "Backup & Recovery", icon: "💾", desc: "Restoring systems from clean backups after successful compromise" },
  { label: "Log Investigation", icon: "📋", desc: "SIEM log analysis, threat hunting and forensic evidence collection" },
  { label: "Incident Response Strategy", icon: "🛡️", desc: "End-to-end SOC workflow, escalation procedures and IR lifecycle" },
];

const EVAL_TEXT = {
  excellent: {
    title: "Excellent Performance",
    badge: "SOC Analyst – Expert Level",
    grade: "A",
    gradeColor: "text-green-600",
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
    barColor: "bg-green-500",
    desc: "You demonstrate strong knowledge of phishing detection, malware containment, and incident response. Your rapid containment and forensic accuracy reflect professional-level SOC competency. You are ready for Tier 2 analyst responsibilities.",
  },
  moderate: {
    title: "Moderate Performance",
    badge: "SOC Analyst – Developing",
    grade: "B",
    gradeColor: "text-amber-600",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    barColor: "bg-amber-500",
    desc: "You understand basic malware handling but should improve network isolation speed and forensic response accuracy. Focus on faster threat containment and deeper SIEM log analysis. Review NIST IR framework and MITRE ATT&CK.",
  },
  weak: {
    title: "Needs Improvement",
    badge: "SOC Analyst – Trainee",
    grade: "C",
    gradeColor: "text-red-600",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    barColor: "bg-red-500",
    desc: "You need significant improvement in phishing detection, system isolation, and ransomware handling. Review incident response procedures, practice log analysis, and study the MITRE ATT&CK framework. Consider additional cybersecurity training.",
  },
};

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}m ${sec}s`;
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  sub?: string;
  accent?: "default" | "danger" | "success" | "warning";
}

function StatCard({ label, value, icon, sub, accent = "default" }: StatCardProps) {
  const accentMap = {
    default: "border-gray-200",
    danger: "border-red-200 bg-red-50/30",
    success: "border-green-200 bg-green-50/30",
    warning: "border-amber-200 bg-amber-50/30",
  };
  return (
    <div className={cn("bg-white border rounded-xl p-5 transition-all hover:shadow-sm", accentMap[accent])}>
      <div className="flex items-center gap-2 mb-3 text-gray-500">{icon}<span className="text-[10px] uppercase tracking-widest font-bold">{label}</span></div>
      <div className="text-2xl font-black text-gray-900 mb-1">{value}</div>
      {sub && <div className="text-xs text-gray-400">{sub}</div>}
    </div>
  );
}

export default function FinalReport({ state, onRestart }: Props) {
  const eval_ = getEvaluation(state.score);
  const ev = EVAL_TEXT[eval_];
  const efficiency = calcContainmentEfficiency(state);
  const elapsed = Date.now() - state.startTime;
  const correctDecisions = state.decisionLog.filter(d => d.correct).length;
  const totalDecisions = state.decisionLog.length;
  const accuracyPct = totalDecisions > 0 ? Math.round((correctDecisions / totalDecisions) * 100) : 0;
  const stars = eval_ === "excellent" ? 3 : eval_ === "moderate" ? 2 : 1;

  return (
    <div className="min-h-screen bg-gray-50 font-corp overflow-y-auto">
      {/* Header bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-3">
          <div className="w-7 h-7 bg-blue-700 rounded-lg flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-gray-900">Post-Incident Analysis Report</span>
          <span className="text-xs text-gray-400 ml-1">Malware Outbreak: System Under Attack</span>
          <div className="flex-1" />
          <button
            onClick={onRestart}
            className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors text-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" /> New Simulation
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Hero: Score + Evaluation */}
        <div className="grid grid-cols-3 gap-5 mb-6">
          {/* Score card */}
          <div className="col-span-1 bg-blue-700 rounded-2xl p-6 text-white flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 opacity-80" />
              <span className="text-xs font-semibold uppercase tracking-wider opacity-80">Final Score</span>
            </div>
            <div>
              <div className="text-6xl font-black mb-1">{state.score}</div>
              <div className="text-blue-200 text-sm">out of 150 points</div>
              {/* Progress bar */}
              <div className="mt-4 h-1.5 bg-blue-600 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, (state.score / 150) * 100)}%` }} />
              </div>
            </div>
            <div className="flex justify-center gap-1 mt-4">
              {[1, 2, 3].map(s => (
                <Star key={s} className={cn("w-6 h-6", s <= stars ? "text-yellow-300 fill-yellow-300" : "text-blue-500 fill-blue-500")} />
              ))}
            </div>
          </div>

          {/* Evaluation card */}
          <div className={cn("col-span-2 rounded-2xl border-2 p-6", ev.bg, ev.border)}>
            <div className="flex items-start gap-4 h-full">
              <div className={cn("text-6xl font-black w-16 text-center shrink-0", ev.gradeColor)}>{ev.grade}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Award className={cn("w-4 h-4", ev.color)} />
                  <span className={cn("text-xs font-bold uppercase tracking-wider", ev.color)}>{ev.badge}</span>
                </div>
                <h2 className={cn("text-lg font-bold mb-2", ev.color)}>{ev.title}</h2>
                <p className={cn("text-sm leading-relaxed", ev.color, "opacity-90")}>{ev.desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <StatCard
            label="Infection Peak"
            value={`${state.infectionPeak}%`}
            icon={<AlertTriangle className="w-4 h-4 text-red-500" />}
            sub={state.infectionPeak < 40 ? "Low exposure — excellent" : state.infectionPeak < 70 ? "Moderate exposure" : "High exposure — critical failure"}
            accent={state.infectionPeak < 40 ? "success" : state.infectionPeak < 70 ? "warning" : "danger"}
          />
          <StatCard
            label="Systems Saved"
            value={`${state.systemsSaved}/9`}
            icon={<Server className="w-4 h-4 text-blue-600" />}
            sub={`${state.systemsSaved === 9 ? "All systems protected" : `${9 - state.systemsSaved} systems compromised`}`}
            accent={state.systemsSaved >= 7 ? "success" : state.systemsSaved >= 4 ? "warning" : "danger"}
          />
          <StatCard
            label="Response Time"
            value={formatTime(elapsed)}
            icon={<Clock className="w-4 h-4 text-blue-600" />}
            sub="Total session duration"
          />
          <StatCard
            label="Decision Accuracy"
            value={`${accuracyPct}%`}
            icon={<Activity className="w-4 h-4 text-blue-600" />}
            sub={`${correctDecisions}/${totalDecisions} correct decisions`}
            accent={accuracyPct >= 80 ? "success" : accuracyPct >= 60 ? "warning" : "danger"}
          />
          <StatCard
            label="Mistakes Made"
            value={state.mistakes}
            icon={<TrendingDown className="w-4 h-4 text-orange-500" />}
            sub={state.mistakes === 0 ? "Perfect — zero mistakes!" : state.mistakes < 3 ? "Good performance" : "Review response procedures"}
            accent={state.mistakes === 0 ? "success" : state.mistakes < 3 ? "default" : "danger"}
          />
          <StatCard
            label="Containment Efficiency"
            value={`${efficiency}%`}
            icon={<Shield className="w-4 h-4 text-green-600" />}
            sub={efficiency > 80 ? "Excellent containment" : efficiency > 60 ? "Adequate containment" : "Poor containment — needs work"}
            accent={efficiency > 80 ? "success" : efficiency > 60 ? "warning" : "danger"}
          />
        </div>

        {/* Decision Log + Topics */}
        <div className="grid grid-cols-2 gap-5 mb-6">
          {/* Decision Log */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-bold text-gray-800">Decision Log</span>
              </div>
              <span className="text-xs text-gray-400 font-mono">{correctDecisions}/{totalDecisions} correct</span>
            </div>
            <div className="divide-y divide-gray-50 max-h-60 overflow-y-auto">
              {state.decisionLog.map((d, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3">
                  {d.correct
                    ? <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    : <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <span className="text-[12px] text-gray-800 truncate block">{d.action}</span>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded capitalize">{d.phase}</span>
                  </div>
                  <span className={cn("text-sm font-bold shrink-0", d.correct ? "text-green-600" : "text-red-500")}>
                    {d.points > 0 ? `+${d.points}` : d.points}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Topics Covered */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
              <Award className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-bold text-gray-800">Topics Covered</span>
            </div>
            <div className="p-4 space-y-3 max-h-60 overflow-y-auto">
              {TOPICS.map(topic => (
                <div key={topic.label} className="flex items-start gap-3">
                  <span className="text-lg shrink-0">{topic.icon}</span>
                  <div>
                    <div className="text-[12px] font-semibold text-gray-800">{topic.label}</div>
                    <div className="text-[11px] text-gray-400 leading-relaxed">{topic.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Restart */}
        <div className="text-center">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-800 transition-colors text-sm shadow-sm"
          >
            <RotateCcw className="w-4 h-4" /> Run New Simulation
          </button>
          <p className="text-xs text-gray-400 mt-3">Each session uses a unique randomized scenario. No two playthroughs are the same.</p>
        </div>
      </div>
    </div>
  );
}
