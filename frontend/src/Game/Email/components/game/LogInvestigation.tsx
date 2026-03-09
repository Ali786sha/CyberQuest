import { useState } from "react";
import { Terminal, Search, CheckCircle, AlertTriangle, ChevronRight, Filter, Download } from "lucide-react";
import { LogEntry } from "@/Game/Email/lib/gameData";
import { cn } from "@/lib/utils";

interface Props {
  logEntries: LogEntry[];
  maliciousIp: string;
  compromisedSystem: string;
  onAction: (action: string, isCorrect: boolean, points: number) => void;
  onComplete: () => void;
  score: number;
}

const QUESTIONS = [
  {
    id: "source",
    question: "Identify the initial attack vector for this incident:",
    options: [
      "Brute force attack on SSH port 22",
      "Phishing email with malicious macro attachment",
      "SQL injection exploit on the web portal",
      "Unpatched VPN gateway vulnerability",
    ],
    correctIndex: 1,
    points: 15,
    tag: "ATT&CK: T1566.001",
    explanation: "The malware was delivered via a phishing email containing a macro-enabled Office document, confirmed by the EDR agent logs showing the process chain: WINWORD.EXE → cmd.exe → powershell.exe.",
  },
  {
    id: "ip",
    question: "Which IP address is the Command & Control (C2) server?",
    options: ["10.0.1.45", "192.168.1.1", "%%MALICIOUS_IP%%", "8.8.8.8"],
    correctIndex: 2,
    points: 15,
    tag: "ATT&CK: T1071",
    explanation: "Firewall logs confirm outbound C2 communication to this external IP address on port 4444 (Metasploit default). NetFlow data shows data exfiltration to this address.",
  },
  {
    id: "system",
    question: "Which system was the initial point of compromise (Patient Zero)?",
    options: ["SQL-SERVER-01", "DC01 – Domain Controller", "%%COMPROMISED%%", "BACKUP-SRV-02"],
    correctIndex: 2,
    points: 10,
    tag: "ATT&CK: T1204.002",
    explanation: "The EDR agent flagged the malicious process chain originating from this workstation immediately after the phishing email was opened by the user.",
  },
  {
    id: "action",
    question: "What is the correct immediate containment action after identifying Patient Zero?",
    options: [
      "Reimage the machine immediately to remove malware",
      "Network isolate the device and preserve forensic evidence",
      "Disconnect all internet access company-wide",
      "Restore from yesterday's backup without investigation",
    ],
    correctIndex: 1,
    points: 20,
    tag: "NIST IR Phase: Containment",
    explanation: "Network isolation prevents lateral movement while preserving evidence for forensic analysis. Full reimaging should only occur after evidence collection is complete (forensic copy of disk image).",
  },
  {
    id: "persistence",
    question: "The attacker established persistence. Which registry key is most commonly abused?",
    options: [
      "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run",
      "HKCU\\Control Panel\\Desktop",
      "HKLM\\SYSTEM\\CurrentControlSet\\Services",
      "HKCR\\Applications",
    ],
    correctIndex: 0,
    points: 10,
    tag: "ATT&CK: T1547.001",
    explanation: "Malware frequently abuses the Run registry key to achieve persistence across reboots without requiring elevated privileges, making it the most common persistence mechanism.",
  },
];

function getLevelStyle(level: string) {
  switch (level) {
    case "CRITICAL": return { bg: "bg-red-50 border-red-200", label: "text-red-700 bg-red-100", ts: "text-red-400", src: "text-red-600" };
    case "ERROR": return { bg: "bg-orange-50 border-orange-200", label: "text-orange-700 bg-orange-100", ts: "text-orange-400", src: "text-orange-600" };
    case "WARN": return { bg: "bg-amber-50 border-amber-200", label: "text-amber-700 bg-amber-100", ts: "text-amber-400", src: "text-amber-600" };
    default: return { bg: "bg-white border-gray-200", label: "text-gray-500 bg-gray-100", ts: "text-gray-400", src: "text-blue-500" };
  }
}

export default function LogInvestigation({ logEntries, maliciousIp, compromisedSystem, onAction, onComplete, score }: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [completed, setCompleted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>("ALL");

  const processOption = (opt: string) =>
    opt.replace("%%MALICIOUS_IP%%", maliciousIp).replace("%%COMPROMISED%%", compromisedSystem);

  const handleAnswer = (qId: string, optIdx: number, correctIdx: number) => {
    if (answers[qId] !== undefined) return;
    const isCorrect = optIdx === correctIdx;
    const q = QUESTIONS.find(q => q.id === qId)!;
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
    setFeedback(prev => ({ ...prev, [qId]: isCorrect }));
    onAction(`Forensic: ${q.question.slice(0, 35)}...`, isCorrect, isCorrect ? q.points : -5);
    const newAnswers = { ...answers, [qId]: optIdx };
    if (Object.keys(newAnswers).length === QUESTIONS.length) setCompleted(true);
  };

  const LEVELS = ["ALL", "CRITICAL", "ERROR", "WARN", "INFO"];
  const filteredLogs = logEntries.filter(l => {
    const matchSearch = !searchTerm || l.message.toLowerCase().includes(searchTerm.toLowerCase()) || (l.ip?.includes(searchTerm)) || (l.hash?.includes(searchTerm));
    const matchLevel = selectedLevel === "ALL" || l.level === selectedLevel;
    return matchSearch && matchLevel;
  });

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-corp overflow-hidden">
      {/* Header */}
      <header className="flex items-center gap-3 px-5 py-0 bg-white border-b border-gray-200 h-14 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gray-800 rounded-lg flex items-center justify-center">
            <Terminal className="w-4 h-4 text-green-400" />
          </div>
          <span className="text-sm font-bold text-gray-900">Digital Forensics & Log Investigation</span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
            <span className="text-xs text-gray-500">Questions</span>
            <span className="text-xs font-bold text-gray-900">{answeredCount}/{QUESTIONS.length}</span>
            <div className="flex gap-0.5 ml-1">
              {QUESTIONS.map((_, i) => (
                <div key={i} className={cn("w-2 h-2 rounded-full", answers[QUESTIONS[i].id] !== undefined ? (feedback[QUESTIONS[i].id] ? "bg-green-500" : "bg-red-400") : "bg-gray-200")} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg">
            <span className="text-xs text-gray-600">Score</span>
            <span className="text-sm font-bold text-blue-700">{score}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: SIEM Log Viewer */}
        <div className="w-1/2 border-r border-gray-200 flex flex-col overflow-hidden bg-white">
          {/* Log Toolbar */}
          <div className="px-3 py-2 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
            <div className="flex items-center gap-1.5 flex-1 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5">
              <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <input
                className="flex-1 text-xs outline-none placeholder:text-gray-400 text-gray-700 font-mono"
                placeholder="Filter logs by IP, keyword, hash..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-1">
              {LEVELS.map(l => (
                <button
                  key={l}
                  onClick={() => setSelectedLevel(l)}
                  className={cn(
                    "text-[10px] px-2 py-1 rounded font-semibold transition-colors",
                    selectedLevel === l
                      ? l === "CRITICAL" ? "bg-red-500 text-white" : l === "ERROR" ? "bg-orange-500 text-white" : l === "WARN" ? "bg-amber-500 text-white" : "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  )}
                >{l}</button>
              ))}
            </div>
          </div>

          {/* Log Entries */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5 font-mono">
            {filteredLogs.map((log, i) => {
              const s = getLevelStyle(log.level);
              return (
                <div key={i} className={cn("rounded-lg px-3 py-2 border text-[11px] leading-relaxed", s.bg)}>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide", s.label)}>{log.level}</span>
                    <span className={cn("text-[10px]", s.ts)}>{log.timestamp}</span>
                    <span className={cn("font-semibold", s.src)}>{log.source}</span>
                  </div>
                  <p className="text-gray-700">{log.message}</p>
                  {log.ip && (
                    <p className={cn("mt-0.5 text-[10px] font-mono", log.ip === maliciousIp ? "text-red-600 font-bold" : "text-blue-600")}>
                      → IP: {log.ip} {log.ip === maliciousIp && "⚠ SUSPICIOUS"}
                    </p>
                  )}
                  {log.hash && <p className="text-purple-600 mt-0.5 text-[10px]">→ Hash: {log.hash}</p>}
                </div>
              );
            })}
            {filteredLogs.length === 0 && (
              <div className="flex items-center justify-center h-32 text-gray-400 text-xs">
                No logs match your filter.
              </div>
            )}
          </div>
        </div>

        {/* Right: Forensic Questions */}
        <div className="w-1/2 flex flex-col overflow-hidden bg-gray-50">
          <div className="px-4 py-2.5 border-b border-gray-200 bg-white flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Forensic Analysis</span>
            <span className="text-[10px] text-gray-400">Use the SIEM logs to identify answers</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {QUESTIONS.map((q, qi) => {
              const answered = answers[q.id] !== undefined;
              const isCorrect = feedback[q.id];
              return (
                <div
                  key={q.id}
                  className={cn(
                    "bg-white border rounded-xl overflow-hidden shadow-sm transition-all",
                    answered ? (isCorrect ? "border-green-200" : "border-red-200") : "border-gray-200"
                  )}
                >
                  {/* Question header */}
                  <div className={cn("px-4 py-3 border-b flex items-start gap-3", answered ? (isCorrect ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100") : "bg-gray-50 border-gray-100")}>
                    <span className="w-6 h-6 rounded-full bg-blue-700 text-white text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5">{qi + 1}</span>
                    <div className="flex-1">
                      <p className="text-[13px] font-semibold text-gray-900 mb-0.5">{q.question}</p>
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-mono">{q.tag}</span>
                    </div>
                    {answered && (
                      isCorrect
                        ? <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                        : <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                    )}
                  </div>

                  {/* Options */}
                  <div className="p-3 space-y-1.5">
                    {q.options.map((opt, oi) => {
                      const processed = processOption(opt);
                      const selected = answers[q.id] === oi;
                      const correct = oi === q.correctIndex;
                      return (
                        <button
                          key={oi}
                          onClick={() => handleAnswer(q.id, oi, q.correctIndex)}
                          disabled={answered}
                          className={cn(
                            "w-full text-left px-3 py-2.5 rounded-lg border text-[12px] transition-all flex items-center gap-2",
                            answered
                              ? correct
                                ? "bg-green-50 border-green-300 text-green-800 font-medium"
                                : selected && !correct
                                ? "bg-red-50 border-red-300 text-red-700"
                                : "bg-gray-50 border-gray-200 text-gray-400"
                              : "bg-white border-gray-200 text-gray-800 hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
                          )}
                        >
                          <span className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 shrink-0">
                            {["A", "B", "C", "D"][oi]}
                          </span>
                          <span className="flex-1">{processed}</span>
                          {answered && correct && <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0" />}
                          {answered && selected && !correct && <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />}
                        </button>
                      );
                    })}

                    {/* Explanation */}
                    {answered && (
                      <div className={cn("mt-1.5 text-[11px] px-3 py-2 rounded-lg border leading-relaxed", isCorrect ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-600")}>
                        <strong>{isCorrect ? `+${q.points} pts — ` : "-5 pts — "}</strong>{q.explanation}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {completed && (
              <button
                onClick={onComplete}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-sm shadow-sm animate-fade-in"
              >
                View Final Incident Report <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
