import { useState, useEffect, useRef } from "react";
import {
  ShieldAlert, Wifi, Database, Monitor, Shield, Server,
  AlertTriangle, CheckCircle, ChevronRight, Activity, Bell,
  Lock, Zap, Eye, RefreshCw, Globe, Cpu, HardDrive, Radio
} from "lucide-react";
import { NetworkNode, LogEntry } from "@/Game/Email/lib/gameData";
import { cn } from "@/lib/utils";
import {
  playButtonClick, playCorrectAction, playWrongAction,
  playInfectionSpread, playEmergencySiren, playMalwareAlert
} from "@/Game/Email/lib/soundManager";

interface Props {
  nodes: NetworkNode[];
  infectionLevel: number;
  logEntries: LogEntry[];
  onAction: (action: string, isCorrect: boolean, points: number) => void;
  onAdvance: () => void;
  score: number;
}

const NODE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  firewall: Shield,
  router: Wifi,
  server: Server,
  database: Database,
  workstation: Monitor,
  laptop: Monitor,
};

const ACTIONS = [
  { id: "isolate", label: "Isolate Device", icon: Lock, correct: true, points: 15, desc: "Disconnect infected workstation from network", variant: "primary" },
  { id: "disconnect", label: "Disconnect Network", icon: Globe, correct: true, points: 10, desc: "Sever all external connections", variant: "primary" },
  { id: "block_ip", label: "Block Malicious IP", icon: Shield, correct: true, points: 10, desc: "Add firewall rule to block C2 server", variant: "primary" },
  { id: "full_scan", label: "Run Full Scan", icon: Eye, correct: true, points: 5, desc: "Scan all endpoints for malware", variant: "primary" },
  { id: "restore", label: "Restore Backup", icon: RefreshCw, correct: true, points: 12, desc: "Roll back to clean system state", variant: "primary" },
  { id: "shutdown", label: "Shutdown Server", icon: Zap, correct: false, points: -5, desc: "Warning: will cause data loss", variant: "danger" },
  { id: "ignore", label: "Ignore Alert", icon: Bell, correct: false, points: -10, desc: "Do not ignore active threats", variant: "danger" },
];

const NODE_EMOJI: Record<string, string> = {
  firewall: "🛡️", router: "🌐", server: "🖥️", database: "🗄️", laptop: "💻", workstation: "🖥️"
};

function getSeverityColor(level: string) {
  switch (level) {
    case "CRITICAL": return { badge: "bg-red-100 text-red-700 border border-red-200", row: "bg-red-50/50", dot: "bg-red-500" };
    case "ERROR":    return { badge: "bg-orange-100 text-orange-700 border border-orange-200", row: "bg-orange-50/30", dot: "bg-orange-500" };
    case "WARN":     return { badge: "bg-amber-100 text-amber-700 border border-amber-200", row: "bg-amber-50/30", dot: "bg-amber-400" };
    default:         return { badge: "bg-gray-100 text-gray-600 border border-gray-200", row: "", dot: "bg-gray-400" };
  }
}

export default function SOCDashboard({ nodes: initialNodes, infectionLevel, logEntries, onAction, onAdvance, score }: Props) {
  const [nodes, setNodes] = useState<NetworkNode[]>(() =>
    // Safety: ensure initialNodes is a valid array
    Array.isArray(initialNodes) ? initialNodes : []
  );
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [actionFeedback, setActionFeedback] = useState<{ msg: string; correct: boolean } | null>(null);
  const [actionsUsed, setActionsUsed] = useState<Set<string>>(new Set());
  const [canAdvance, setCanAdvance] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const prevInfectionRef = useRef(infectionLevel);

  // Sync nodes if initialNodes prop changes (e.g. on re-render)
  useEffect(() => {
    if (Array.isArray(initialNodes) && initialNodes.length > 0) {
      setNodes(initialNodes);
    }
  }, [initialNodes]);

  // Spread infection to nodes
  useEffect(() => {
    const intervalMs = infectionLevel > 50 ? 3000 : 6000;
    const t = setInterval(() => {
      setNodes(prev => {
        if (!Array.isArray(prev) || prev.length === 0) return prev;
        const uninfected = prev.filter(n => n && !n.infected);
        if (uninfected.length === 0) return prev;
        const target = uninfected[Math.floor(Math.random() * uninfected.length)];
        if (!target) return prev;
        playInfectionSpread();
        return prev.map(n => (n && n.id === target.id ? { ...n, infected: true } : n));
      });
    }, intervalMs);
    return () => clearInterval(t);
  }, [infectionLevel]);

  // Play emergency siren when infection crosses 80%
  useEffect(() => {
    if (infectionLevel >= 80 && prevInfectionRef.current < 80) {
      playEmergencySiren();
    }
    prevInfectionRef.current = infectionLevel;
  }, [infectionLevel]);

  // Stream log entries one at a time
  useEffect(() => {
    if (!Array.isArray(logEntries) || logEntries.length === 0) return;
    let i = 0;
    const t = setInterval(() => {
      if (i < logEntries.length) {
        const entry = logEntries[i];
        if (entry) {
          setLogs(prev => [...prev, entry]);
          if (entry.level === "CRITICAL" || entry.level === "ERROR") {
            playMalwareAlert();
          }
        }
        i++;
      } else {
        clearInterval(t);
      }
    }, 900);
    return () => clearInterval(t);
  }, [logEntries]);

  // Auto-scroll
  useEffect(() => {
    if (alertRef.current) alertRef.current.scrollTop = alertRef.current.scrollHeight;
    if (logRef.current)   logRef.current.scrollTop   = logRef.current.scrollHeight;
  }, [logs]);

  useEffect(() => {
    if (actionsUsed.size >= 3) setCanAdvance(true);
  }, [actionsUsed]);

  const handleAction = (action: typeof ACTIONS[0]) => {
    if (actionsUsed.has(action.id)) return;
    playButtonClick();
    setActionsUsed(prev => new Set([...prev, action.id]));
    onAction(action.label, action.correct, action.points);
    if (action.correct) {
      playCorrectAction();
    } else {
      playWrongAction();
    }
    setActionFeedback({
      msg: action.correct
        ? `✓ ${action.label} executed successfully`
        : `✗ ${action.label} — poor response decision`,
      correct: action.correct,
    });
    if (action.id === "isolate" || action.id === "restore") {
      setNodes(prev =>
        Array.isArray(prev)
          ? prev.map(n => n && n.infected && !n.critical ? { ...n, infected: false } : n)
          : prev
      );
    }
    setTimeout(() => setActionFeedback(null), 3000);
  };

  // Safe derived values
  const safeNodes = Array.isArray(nodes) ? nodes.filter(Boolean) : [];
  const infectedCount = safeNodes.filter(n => n.infected).length;
  const infectionColor =
    infectionLevel > 70 ? "bg-red-500" :
    infectionLevel > 40 ? "bg-orange-500" : "bg-yellow-500";
  const infectionTextColor =
    infectionLevel > 70 ? "text-red-600" :
    infectionLevel > 40 ? "text-orange-600" : "text-amber-600";
  const safeLogs = Array.isArray(logs) ? logs.filter(Boolean) : [];

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-corp overflow-hidden">
      {/* Header */}
      <header className="flex items-center gap-4 px-5 py-0 bg-white border-b border-gray-200 h-14 shrink-0 z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-blue-700 rounded-lg flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-gray-900 tracking-tight">ACME Corp – Security Operations Center</span>
          <span className="ml-1 flex items-center gap-1 text-[10px] bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse inline-block" />LIVE
          </span>
        </div>

        <div className="flex-1" />

        {/* Score */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg">
          <Activity className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-xs text-gray-600">Score</span>
          <span className="text-sm font-bold text-blue-700">{score}</span>
        </div>

        {/* Infection Meter */}
        <div className="flex items-center gap-3 min-w-72 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">Infection</span>
          <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-700", infectionColor, infectionLevel > 70 && "animate-pulse")}
              style={{ width: `${Math.min(100, Math.max(0, infectionLevel))}%` }}
            />
          </div>
          <span className={cn("text-sm font-bold min-w-10 text-right tabular-nums", infectionTextColor)}>{infectionLevel}%</span>
        </div>

        {canAdvance && (
          <button
            onClick={() => { playButtonClick(); onAdvance(); }}
            className="flex items-center gap-1.5 bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-blue-800 transition-colors shadow-sm"
          >
            Continue <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Alert Feed */}
        <div className="w-60 shrink-0 border-r border-gray-200 flex flex-col bg-white overflow-hidden">
          <div className="px-3 py-2.5 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-red-500" />
                <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Live Alerts</span>
              </div>
              <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">{safeLogs.length}</span>
            </div>
          </div>
          <div ref={alertRef} className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {safeLogs.map((log, i) => {
              const s = getSeverityColor(log?.level ?? "INFO");
              return (
                <div key={i} className={cn("px-3 py-2.5 animate-fade-in", s.row)}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", s.dot)} />
                    <span className={cn("text-[10px] font-bold px-1 py-0.5 rounded", s.badge)}>{log?.level ?? "INFO"}</span>
                    <span className="text-[10px] text-gray-400 truncate">{log?.source ?? ""}</span>
                  </div>
                  <p className="text-[11px] text-gray-700 leading-relaxed line-clamp-2">{log?.message ?? ""}</p>
                  {log?.ip && <p className="text-[10px] text-blue-500 mt-0.5 font-mono">{log.ip}</p>}
                </div>
              );
            })}
            {safeLogs.length === 0 && (
              <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                <Radio className="w-6 h-6 mb-2 animate-pulse" />
                <p className="text-xs">Monitoring...</p>
              </div>
            )}
          </div>
        </div>

        {/* Center: Network Map */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Network Topology Map</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 border border-blue-500 inline-block" />
                Clean ({safeNodes.length - infectedCount})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block animate-pulse" />
                Infected ({infectedCount})
              </span>
            </div>
          </div>
          <div className="flex-1 relative overflow-hidden bg-gray-50/50">
            {/* Grid background */}
            <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {safeNodes.length > 0 ? (
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 340" preserveAspectRatio="xMidYMid meet">
                {/* Connection lines */}
                {safeNodes.map((node, i) =>
                  safeNodes.slice(i + 1).map(other => {
                    if (!node || !other) return null;
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist > 220) return null;
                    const bothInfected = node.infected && other.infected;
                    return (
                      <line
                        key={`${node.id}-${other.id}`}
                        x1={node.x + 20} y1={node.y + 22}
                        x2={other.x + 20} y2={other.y + 22}
                        stroke={bothInfected ? "#ef4444" : "#d1d5db"}
                        strokeWidth={bothInfected ? 1.5 : 1}
                        strokeDasharray={bothInfected ? "5 3" : ""}
                        opacity={bothInfected ? 0.8 : 0.6}
                      />
                    );
                  })
                )}

                {/* Nodes */}
                {safeNodes.map(node => {
                  if (!node) return null;
                  return (
                    <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                      {node.infected && (
                        <>
                          <circle cx="20" cy="22" r="26" fill="#ef444415" className="animate-ping" style={{ animationDuration: "1.5s" }} />
                          <circle cx="20" cy="22" r="20" fill="#ef444408" />
                        </>
                      )}
                      <rect
                        x="0" y="4" width="40" height="38" rx="8"
                        fill={node.infected ? "#fef2f2" : node.critical ? "#eff6ff" : "#f9fafb"}
                        stroke={node.infected ? "#ef4444" : node.critical ? "#3b82f6" : "#d1d5db"}
                        strokeWidth={node.infected ? 1.5 : 1}
                        filter={node.infected ? "drop-shadow(0 0 4px #ef444440)" : ""}
                      />
                      <text x="20" y="29" textAnchor="middle" fontSize="18">
                        {NODE_EMOJI[node.type] ?? "💻"}
                      </text>
                      <text
                        x="20" y="54" textAnchor="middle" fontSize="8.5"
                        fill={node.infected ? "#ef4444" : "#6b7280"}
                        fontWeight={node.infected ? "700" : "500"}
                      >{node.label}</text>
                      {node.infected && (
                        <text x="20" y="65" textAnchor="middle" fontSize="7" fill="#ef4444" fontWeight="600">⚠ INFECTED</text>
                      )}
                    </g>
                  );
                })}
              </svg>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                Loading network topology...
              </div>
            )}
          </div>
        </div>

        {/* Right: System Logs */}
        <div className="w-72 shrink-0 border-l border-gray-200 flex flex-col bg-white overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">System Logs</span>
            </div>
            <span className="text-[10px] text-gray-400 font-mono">LIVE</span>
          </div>
          <div ref={logRef} className="flex-1 overflow-y-auto p-3 space-y-1 bg-gray-50 font-mono text-[11px]">
            {safeLogs.map((log, i) => {
              const s = getSeverityColor(log?.level ?? "INFO");
              const ts = log?.timestamp?.split(" ")?.[1] ?? "";
              return (
                <div key={i} className={cn("rounded px-2 py-1.5 border animate-fade-in leading-relaxed", s.row, "border-transparent")}>
                  <span className="text-gray-400">[{ts}] </span>
                  <span className={cn("font-bold", {
                    "text-red-600":    log?.level === "CRITICAL",
                    "text-orange-600": log?.level === "ERROR",
                    "text-amber-600":  log?.level === "WARN",
                    "text-gray-500":   log?.level === "INFO",
                  })}>[{(log?.level ?? "INFO").slice(0, 4)}] </span>
                  <span className="text-gray-700">{log?.message ?? ""}</span>
                  {log?.ip   && <span className="text-blue-500"> → {log.ip}</span>}
                  {log?.hash && <span className="text-purple-500"> [{log.hash}]</span>}
                </div>
              );
            })}
            {safeLogs.length === 0 && (
              <div className="flex items-center justify-center h-20 text-gray-400 text-xs">
                <HardDrive className="w-4 h-4 mr-2 animate-pulse" /> Collecting logs...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <footer className="border-t border-gray-200 bg-white px-4 py-3 shrink-0">
        {actionFeedback && (
          <div className={cn(
            "mb-2.5 text-xs font-medium px-4 py-2 rounded-lg flex items-center gap-2 animate-fade-in border",
            actionFeedback.correct
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-600 border-red-200"
          )}>
            {actionFeedback.correct
              ? <CheckCircle className="w-3.5 h-3.5 shrink-0" />
              : <AlertTriangle className="w-3.5 h-3.5 shrink-0" />}
            {actionFeedback.msg}
          </div>
        )}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1 shrink-0">Response Actions:</span>
          {ACTIONS.map(action => {
            const used = actionsUsed.has(action.id);
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => handleAction(action)}
                disabled={used}
                title={action.desc}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                  used
                    ? "bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed"
                    : action.variant === "danger"
                    ? "bg-white border-gray-200 text-gray-500 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                    : "bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                )}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                {action.label}
                {used && <CheckCircle className="w-3 h-3 ml-0.5 text-gray-300" />}
              </button>
            );
          })}
        </div>
        {!canAdvance && (
          <p className="text-[11px] text-gray-400 mt-2">
            Take at least 3 response actions to proceed to forensic investigation. ({actionsUsed.size}/3 completed)
          </p>
        )}
      </footer>
    </div>
  );
}
