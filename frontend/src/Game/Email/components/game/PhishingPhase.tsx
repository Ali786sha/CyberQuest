import { useState, useEffect } from "react";
import { playEmailNotification, playButtonClick, playCorrectAction, playWrongAction } from "@/Game/Email/lib/soundManager";
import gmailLogo from "@/Game/Email/assets/gmail-logo.png";
import {
  Search, Settings, ChevronDown, Paperclip, Star, MoreVertical,
  Reply, Forward, Trash2, ShieldAlert, ScanLine, AlertTriangle,
  CheckCircle, X, RefreshCw, Edit3, ChevronLeft, ChevronRight,
  Bell, HelpCircle, Grid3x3, Inbox, Send, Clock, FileText,
  AlertOctagon, Archive, Tag, Users, Plus, Menu
} from "lucide-react";
import { PhishingScenario } from "@/Game/Email/lib/gameData";
import { cn } from "@/lib/utils";

interface Props {
  scenario: PhishingScenario;
  onCorrect: () => void;
  onWrong: () => void;
}

const INBOX_PREVIEWS = [
  { sender: "James Whitfield", subject: "Team lunch Friday – RSVP by EOD", preview: "Hey everyone, just a reminder that our team lunch is this Friday at noon...", time: "9:41 AM", starred: false, read: true, tag: "" },
  { sender: "Confluence Alerts", subject: "Page updated: Q1 OKRs and Roadmap", preview: "Sarah Chen has updated the page 'Q1 2025 OKRs'. Click to view changes...", time: "8:15 AM", starred: false, read: true, tag: "" },
  { sender: "GitHub", subject: "[acme/platform] Pull request #847 opened", preview: "alex.dev opened pull request #847: Refactor authentication middleware to support OAuth2...", time: "Yesterday", starred: true, read: true, tag: "" },
  { sender: "Zoom", subject: "Recording available: Weekly Standup 01/14", preview: "Your Zoom meeting recording is now available. Duration: 24 minutes. Click to view...", time: "Yesterday", starred: false, read: true, tag: "" },
  { sender: "Slack", subject: "New messages in #engineering (12 unread)", preview: "tom.baker: Just pushed the fix for the auth bug. priya.sharma: Can someone review PR #849?...", time: "Jan 13", starred: false, read: true, tag: "" },
  { sender: "Google Calendar", subject: "Reminder: All-hands meeting tomorrow 10 AM", preview: "You have an event tomorrow. All-Hands Q1 Planning – Conference Room B – 10:00 AM–11:00 AM...", time: "Jan 13", starred: false, read: true, tag: "" },
];

const SIDEBAR_ITEMS = [
  { label: "Inbox", icon: Inbox, count: 3, active: true },
  { label: "Starred", icon: Star, count: 0, active: false },
  { label: "Snoozed", icon: Clock, count: 0, active: false },
  { label: "Sent", icon: Send, count: 0, active: false },
  { label: "Drafts", icon: FileText, count: 2, active: false },
  { label: "Spam", icon: AlertOctagon, count: 1, active: false },
  { label: "Trash", icon: Trash2, count: 0, active: false },
];

const CATEGORIES = [
  { label: "Categories", icon: Tag },
  { label: "All Mail", icon: Archive },
  { label: "Contacts", icon: Users },
];

type UserAction = "report" | "delete" | "scan" | "ignore" | null;

// Google Gmail SVG logo
// function GmailLogo() {
//   return (
//     <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none">
//       <path d="M3 9a3 3 0 0 1 3-3h24a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9z" fill="white" stroke="#e0e0e0" strokeWidth="0.5"/>
//       <path d="M3 9l15 10L33 9" stroke="none"/>
//       <path d="M3 9l15 10L33 9M3 27V9l15 10 15-10v18" fill="none"/>
//       {/* Gmail M shape */}
//       <path d="M6 10.5L18 19.5L30 10.5V27H24V16.5L18 21L12 16.5V27H6V10.5Z" fill="#EA4335"/>
//       <path d="M6 10.5L12 15V27H6V10.5Z" fill="#C5221F"/>
//       <path d="M30 10.5L24 15V27H30V10.5Z" fill="#C5221F"/>
//     </svg>
//   );
// }

export default function PhishingPhase({ scenario, onCorrect, onWrong }: Props) {
  const [emailOpen, setEmailOpen] = useState(false);
  const [action, setAction] = useState<UserAction>(null);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<"clean" | "malware" | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackCorrect, setFeedbackCorrect] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [starredPhishing, setStarredPhishing] = useState(false);

  // Play email notification when inbox loads
  useEffect(() => {
    const t = setTimeout(() => playEmailNotification(), 800);
    return () => clearTimeout(t);
  }, []);

  const attachmentIcon = () => {
    const t = scenario.attachment.type;
    if (t === ".exe" || t === ".bat") return { emoji: "⚙️", color: "text-red-500 bg-red-50 border-red-200" };
    if (t === ".docm" || t === ".xlsm") return { emoji: "📊", color: "text-orange-500 bg-orange-50 border-orange-200" };
    if (t === ".zip") return { emoji: "🗜️", color: "text-yellow-600 bg-yellow-50 border-yellow-200" };
    return { emoji: "📄", color: "text-blue-500 bg-blue-50 border-blue-200" };
  };

  const handleAction = (act: UserAction) => {
    if (showFeedback) return;
    playButtonClick();
    setAction(act);
    const correct = act === "report" || act === "delete";
    setFeedbackCorrect(correct);
    setShowFeedback(true);
    if (correct) playCorrectAction(); else playWrongAction();
    setTimeout(() => {
      if (correct) onCorrect();
      else onWrong();
    }, 2400);
  };

  const handleScan = () => {
    if (scanning || scanResult) return;
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanResult("malware");
    }, 1800);
  };

  const att = attachmentIcon();

  return (
    <div className="flex flex-col h-screen bg-white font-corp overflow-hidden select-none">
      {/* Gmail Top Bar */}
      <header className="flex items-center gap-2 px-3 py-1.5 bg-white border-b border-gray-200 h-16 shrink-0 z-10">
        {/* Left: Hamburger + Gmail Logo + Text */}
        <div className="flex items-center gap-1 w-64 shrink-0">
          <button className="p-2.5 rounded-full hover:bg-gray-100 transition-colors">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-2 ml-1 cursor-pointer">
            {/* <GmailLogo /> */}
            <img src={gmailLogo} alt="Gmail Logo" className="w-9 h-9" />
            <span className="text-gray-600 text-xl font-light tracking-tight" style={{ fontFamily: "'Google Sans', sans-serif" }}>Gmail</span>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200/70 rounded-2xl px-5 py-3 transition-colors group focus-within:bg-white focus-within:shadow-md focus-within:border focus-within:border-gray-300">
            <Search className="w-5 h-5 text-gray-500 shrink-0" />
            <input
              className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-500"
              placeholder="Search mail"
            />
            <button className="opacity-0 group-focus-within:opacity-100 transition-opacity">
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Right: Icons + Avatar */}
        <div className="flex items-center gap-1 ml-auto">
          <div className="flex items-center gap-0.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 mr-2">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-xs text-amber-700 font-medium ml-1">SOC Training Mode</span>
          </div>
          <button className="p-2.5 rounded-full hover:bg-gray-100 transition-colors">
            <HelpCircle className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2.5 rounded-full hover:bg-gray-100 transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2.5 rounded-full hover:bg-gray-100 transition-colors">
            <Grid3x3 className="w-5 h-5 text-gray-600" />
          </button>
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold ml-1 cursor-pointer">JC</div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className={cn("shrink-0 bg-white pt-1 overflow-y-auto transition-all duration-200", sidebarCollapsed ? "w-16" : "w-64")}>
          {/* Compose Button */}
          <div className="px-2 py-2">
            <button className={cn(
              "flex items-center gap-3 rounded-2xl shadow-sm hover:shadow-md transition-all bg-white border border-gray-200",
              sidebarCollapsed ? "w-12 h-12 justify-center p-0 mx-auto" : "px-5 py-3.5 w-full"
            )}>
              <Edit3 className="w-5 h-5 text-gray-700 shrink-0" />
              {!sidebarCollapsed && <span className="text-sm font-medium text-gray-800">Compose</span>}
            </button>
          </div>

          {/* Nav Items */}
          <nav className="mt-1">
            {SIDEBAR_ITEMS.map(item => (
              <div
                key={item.label}
                className={cn(
                  "flex items-center rounded-r-full cursor-pointer transition-colors mx-1",
                  item.active ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-gray-100",
                  sidebarCollapsed ? "w-11 h-11 justify-center px-3" : "px-4 py-1.5 pr-6 gap-4"
                )}
              >
                <item.icon className={cn("shrink-0", sidebarCollapsed ? "w-5 h-5" : "w-[18px] h-[18px]", item.active && "text-blue-700")} />
                {!sidebarCollapsed && (
                  <>
                    <span className={cn("flex-1 text-sm", item.active ? "font-semibold" : "font-normal")}>{item.label}</span>
                    {item.count > 0 && <span className={cn("text-xs font-semibold", item.active ? "text-blue-800" : "text-gray-800")}>{item.count}</span>}
                  </>
                )}
              </div>
            ))}

            {!sidebarCollapsed && (
              <>
                <div className="mt-3 mb-1">
                  <button className="flex items-center gap-2 px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-r-full w-full cursor-pointer transition-colors">
                    <ChevronDown className="w-4 h-4" /> More
                  </button>
                </div>
                <div className="mt-3 px-4 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center justify-between">
                  <span>Labels</span>
                  <Plus className="w-4 h-4 cursor-pointer hover:text-gray-700" />
                </div>
                {CATEGORIES.map(c => (
                  <div key={c.label} className="flex items-center gap-4 px-4 py-1.5 mx-1 rounded-r-full text-sm cursor-pointer hover:bg-gray-100 transition-colors text-gray-600">
                    <c.icon className="w-[18px] h-[18px] shrink-0" />
                    <span>{c.label}</span>
                  </div>
                ))}
              </>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden flex flex-col border-l border-gray-200">
          {!emailOpen ? (
            <>
              {/* Inbox Tabs */}
              <div className="flex border-b border-gray-200 bg-white shrink-0">
                <div className="flex items-center gap-2 px-6 py-3 border-b-2 border-blue-600 cursor-pointer">
                  <Inbox className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Primary</span>
                </div>
                <div className="flex items-center gap-2 px-6 py-3 cursor-pointer hover:bg-gray-50 transition-colors">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Promotions</span>
                </div>
                <div className="flex items-center gap-2 px-6 py-3 cursor-pointer hover:bg-gray-50 transition-colors">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Social</span>
                </div>
              </div>

              {/* Toolbar */}
              <div className="flex items-center gap-2 px-4 py-1.5 border-b border-gray-100 bg-white shrink-0">
                <input type="checkbox" className="w-4 h-4 rounded accent-blue-600" />
                <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                <div className="w-px h-5 bg-gray-200 mx-1" />
                <button className="p-1.5 rounded hover:bg-gray-100 transition-colors" title="Refresh">
                  <RefreshCw className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </button>
                <div className="flex-1" />
                <span className="text-xs text-gray-500">1–{INBOX_PREVIEWS.length + 1} of {INBOX_PREVIEWS.length + 1}</span>
                <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Email List */}
              <div className="flex-1 overflow-y-auto">
                {/* Phishing Email Row – UNREAD */}
                <div
                  className="flex items-center gap-3 px-4 py-0 border-b border-gray-100 cursor-pointer hover:shadow-sm bg-white transition-all group h-[52px]"
                  onClick={() => setEmailOpen(true)}
                >
                  <input type="checkbox" className="w-4 h-4 rounded accent-blue-600 shrink-0 opacity-0 group-hover:opacity-100" onClick={e => e.stopPropagation()} />
                  <button onClick={e => { e.stopPropagation(); setStarredPhishing(p => !p); }} className="shrink-0">
                    <Star className={cn("w-4 h-4 transition-colors", starredPhishing ? "text-yellow-400 fill-yellow-400" : "text-gray-300 group-hover:text-gray-400")} />
                  </button>
                  <div
                    className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: scenario.senderColor }}
                  >
                    {scenario.senderInitial}
                  </div>
                  <div className="flex-1 min-w-0 flex items-center gap-2">
                    <span className="font-bold text-[13px] text-gray-900 w-44 shrink-0 truncate">{scenario.senderName}</span>
                    {scenario.spamWarning && (
                      <span className="text-[10px] bg-red-100 text-red-600 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold shrink-0">Spam</span>
                    )}
                    <span className="text-[13px] text-gray-900 font-semibold truncate">{scenario.subject}</span>
                    <span className="text-[13px] text-gray-500 truncate hidden lg:block"> – {scenario.preview}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Paperclip className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium w-16 text-right">{scenario.timestamp}</span>
                  </div>
                </div>

                {/* Other inbox emails */}
                {INBOX_PREVIEWS.map((em, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-0 border-b border-gray-100 cursor-pointer hover:shadow-sm hover:bg-white bg-gray-50/30 transition-all group h-[52px]">
                    <input type="checkbox" className="w-4 h-4 rounded accent-blue-600 shrink-0 opacity-0 group-hover:opacity-100" />
                    <Star className={cn("w-4 h-4 shrink-0 transition-colors", em.starred ? "text-yellow-400 fill-yellow-400" : "text-gray-200 group-hover:text-gray-300")} />
                    <div className="w-8 h-8 rounded-full shrink-0 bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-semibold">
                      {em.sender.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0 flex items-center gap-2">
                      <span className="text-[13px] text-gray-500 font-normal w-44 shrink-0 truncate">{em.sender}</span>
                      <span className="text-[13px] text-gray-600 font-normal truncate">{em.subject}</span>
                      <span className="text-[13px] text-gray-400 truncate hidden lg:block"> – {em.preview}</span>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0 w-16 text-right">{em.time}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Email Open View */
            <div className="flex-1 overflow-y-auto bg-white">
              {/* Email Toolbar */}
              <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-200 sticky top-0 bg-white z-10">
                <button onClick={() => setEmailOpen(false)} className="p-2 rounded hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm text-gray-600">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <div className="flex-1" />
                <button className="p-2 rounded hover:bg-gray-100 transition-colors" title="Archive"><Archive className="w-4 h-4 text-gray-500" /></button>
                <button className="p-2 rounded hover:bg-gray-100 transition-colors" title="Spam"><AlertOctagon className="w-4 h-4 text-gray-500" /></button>
                <button className="p-2 rounded hover:bg-gray-100 transition-colors" title="Delete"><Trash2 className="w-4 h-4 text-gray-500" /></button>
                <div className="w-px h-5 bg-gray-200 mx-1" />
                <button className="p-2 rounded hover:bg-gray-100 transition-colors"><MoreVertical className="w-4 h-4 text-gray-500" /></button>
              </div>

              <div className="max-w-3xl mx-auto px-6 py-5">
                {/* Spam / Phishing Banner */}
                {scenario.spamWarning && (
                  <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4 mb-5">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <span className="font-semibold text-red-700">This message seems dangerous. </span>
                      <span className="text-red-600">Google has identified this email as potentially dangerous. Many people marked similar messages as phishing scams.</span>
                    </div>
                    <button className="ml-auto shrink-0 text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
                  </div>
                )}

                {/* Subject */}
                <h2 className="text-2xl font-normal text-gray-900 mb-5">{scenario.subject}</h2>

                {/* Sender Row */}
                <div className="flex items-start gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ background: scenario.senderColor }}
                  >
                    {scenario.senderInitial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="font-semibold text-sm text-gray-900">{scenario.senderName}</span>
                      <span className="text-xs text-gray-500">&lt;{scenario.senderEmail}&gt;</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                      <span>to me</span>
                      <span>·</span>
                      <span>{scenario.timestamp}</span>
                      <button className="hover:text-gray-700 transition-colors"><ChevronDown className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="Star">
                      <Star className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="Reply">
                      <Reply className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" title="More">
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Email Body */}
                <div
                  className="text-sm text-gray-800 leading-relaxed mb-5 pb-5 border-b border-gray-100"
                  style={{ fontFamily: "Arial, sans-serif" }}
                  dangerouslySetInnerHTML={{ __html: scenario.body }}
                />

                {/* Attachment */}
                <div className="mb-6">
                  <p className="text-xs text-gray-500 mb-2 font-medium">1 Attachment</p>
                  <div className={cn("inline-flex items-center gap-3 border rounded-xl p-3 pr-4 cursor-pointer hover:shadow-sm transition-all bg-white max-w-xs", att.color.split(" ").slice(1).join(" "))}>
                    <div className={cn("w-10 h-12 rounded-lg flex items-center justify-center text-2xl border", att.color.split(" ").slice(1).join(" "))}>
                      {att.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800 truncate">{scenario.attachment.name}</div>
                      <div className="text-xs text-gray-500">{scenario.attachment.size} · {scenario.attachment.type.toUpperCase().replace(".", "")}</div>
                    </div>
                    {scanResult === "malware" ? (
                      <span className="flex items-center gap-1 text-xs bg-red-600 text-white px-2 py-1 rounded-full font-semibold ml-1 shrink-0">
                        <ShieldAlert className="w-3 h-3" /> MALWARE
                      </span>
                    ) : scanResult === "clean" ? (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full ml-1 shrink-0">✓ Clean</span>
                    ) : (
                      <button
                        onClick={handleScan}
                        disabled={scanning}
                        className="ml-1 shrink-0 flex items-center gap-1.5 text-xs bg-gray-100 hover:bg-gray-200 border border-gray-200 px-2.5 py-1.5 rounded-full text-gray-700 transition-colors disabled:opacity-60"
                      >
                        <ScanLine className={cn("w-3.5 h-3.5", scanning && "animate-spin")} />
                        {scanning ? "Scanning..." : "Scan"}
                      </button>
                    )}
                  </div>
                </div>

                {/* SOC Action Panel */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldAlert className="w-4 h-4 text-blue-700" />
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">SOC Analyst Action Required</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleAction("report")}
                      disabled={!!showFeedback}
                      className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 shadow-sm"
                    >
                      <ShieldAlert className="w-4 h-4" /> Report Phishing
                    </button>
                    <button
                      onClick={() => handleAction("delete")}
                      disabled={!!showFeedback}
                      className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" /> Delete Email
                    </button>
                    <button
                      onClick={() => handleAction("ignore")}
                      disabled={!!showFeedback}
                      className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-400 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-sm"
                    >
                      Ignore
                    </button>
                  </div>
                  {scanResult === "malware" && (
                    <p className="text-xs text-red-600 mt-3 flex items-center gap-1.5 font-medium">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Malware confirmed in attachment. Immediate action required.
                    </p>
                  )}
                </div>

                {/* Reply Area */}
                <div className="mt-6 border border-gray-200 rounded-xl p-4 flex items-center gap-3 cursor-text hover:shadow-sm transition-shadow">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">JC</div>
                  <div className="flex-1 text-sm text-gray-400">Reply to {scenario.senderName}...</div>
                  <div className="flex items-center gap-2">
                    <Reply className="w-4 h-4 text-gray-400" />
                    <Forward className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Feedback Overlay */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in backdrop-blur-sm">
          <div className={cn(
            "bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center border-t-4 animate-slide-up",
            feedbackCorrect ? "border-green-500" : "border-red-500"
          )}>
            {feedbackCorrect ? (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-9 h-9 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Threat Neutralized</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  Correct. You identified and reported the phishing email. The attachment contained <strong className="text-gray-700">{scenario.malwareType}</strong> malware that has been contained.
                </p>
                <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 text-green-700 font-bold text-sm">
                  <CheckCircle className="w-4 h-4" /> +10 Points Awarded
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldAlert className="w-9 h-9 text-red-600 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Security Incident Detected</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  The malicious attachment executed. <strong className="text-gray-700">{scenario.malwareType}</strong> malware is spreading through the corporate network.
                </p>
                <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-2 text-red-600 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4" /> –5 Points · Infection Spreading
                </div>
              </>
            )}
            <p className="text-xs text-gray-400 mt-5">Advancing to SOC Dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
}
