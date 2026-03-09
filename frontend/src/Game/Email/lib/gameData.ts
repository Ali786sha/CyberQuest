export type AttachmentType = ".exe" | ".zip" | ".pdf" | ".docm" | ".xlsm" | ".bat";
export type MalwareType = "ransomware" | "trojan" | "keylogger" | "worm" | "spyware";
export type NodeType = "workstation" | "server" | "database" | "firewall" | "router" | "laptop";

export interface PhishingScenario {
  senderName: string;
  senderEmail: string;
  senderInitial: string;
  senderColor: string;
  subject: string;
  preview: string;
  body: string;
  attachment: { name: string; type: AttachmentType; size: string };
  isPhishing: boolean;
  spamWarning: boolean;
  timestamp: string;
  malwareType: MalwareType;
}

export interface NetworkNode {
  id: string;
  label: string;
  type: NodeType;
  x: number;
  y: number;
  infected: boolean;
  critical: boolean;
}

export interface LogEntry {
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR" | "CRITICAL";
  source: string;
  message: string;
  ip?: string;
  hash?: string;
}

export interface GameScenario {
  phishing: PhishingScenario;
  networkNodes: NetworkNode[];
  maliciousIp: string;
  malwareType: MalwareType;
  attackVector: string;
  compromisedSystem: string;
  btcAmount: string;
  encryptedFiles: string[];
  logEntries: LogEntry[];
}

const phishingPool: Omit<PhishingScenario, "isPhishing" | "spamWarning" | "timestamp" | "malwareType">[] = [
  {
    senderName: "IT Security Team",
    senderEmail: "security-alerts@corp-it-systems.com",
    senderInitial: "IT",
    senderColor: "#1565C0",
    subject: "URGENT: Password Reset Required – Your Account Will Be Suspended",
    preview: "Your corporate account has been flagged for suspicious activity. Immediate action required.",
    body: `<p>Dear Employee,</p>
<p>Our security monitoring systems have detected <strong>unauthorized access attempts</strong> on your corporate account from an unrecognized device.</p>
<p>To protect your account and ensure business continuity, you must <strong>reset your password immediately</strong> by opening the attached secure form.</p>
<p style="background:#fff3cd;padding:12px;border-left:4px solid #ffc107;border-radius:2px;">⚠️ Failure to complete this process within 24 hours will result in account suspension and loss of access to corporate systems.</p>
<p>Please open <strong>SecureReset_Form.docm</strong> and follow the on-screen instructions.</p>
<p>Best regards,<br/>Corporate IT Security Team<br/>Help Desk: +1-800-555-0192</p>`,
    attachment: { name: "SecureReset_Form.docm", type: ".docm", size: "342 KB" },
  },
  {
    senderName: "Sarah Mitchell – HR Department",
    senderEmail: "hr.payroll@corporate-payslip-portal.net",
    senderInitial: "SM",
    senderColor: "#6A1B9A",
    subject: "Your Q4 2024 Payslip is Ready – Download Attached",
    preview: "Your latest payslip document is now available. Please review and confirm receipt.",
    body: `<p>Hi,</p>
<p>Please find your <strong>Q4 2024 payslip</strong> attached to this email as requested by Payroll Management.</p>
<p>This document contains sensitive financial information. Please do not forward this email.</p>
<p style="background:#f8d7da;padding:12px;border-left:4px solid #dc3545;border-radius:2px;">🔒 The document is password-protected. Your password is the last 4 digits of your employee ID followed by your birth year.</p>
<p>If you experience any issues opening the file, please contact HR at extension 4421.</p>
<p>Regards,<br/>Sarah Mitchell<br/>HR & Payroll Division</p>`,
    attachment: { name: "Payslip_Q4_2024_Confidential.xlsm", type: ".xlsm", size: "1.2 MB" },
  },
  {
    senderName: "Microsoft 365 Admin",
    senderEmail: "noreply@microsoft-365-security.org",
    senderInitial: "M",
    senderColor: "#0078D4",
    subject: "Action Required: Suspicious Sign-In Detected on Your M365 Account",
    preview: "We detected a sign-in attempt from Russia (Moscow). Verify your identity now.",
    body: `<p>Dear Microsoft 365 User,</p>
<p>We detected a sign-in attempt to your Microsoft 365 account from a location that doesn't match your usual activity:</p>
<table style="border-collapse:collapse;width:100%;margin:12px 0;font-size:13px;">
  <tr style="background:#f5f5f5;"><td style="padding:8px;border:1px solid #e0e0e0;">Location</td><td style="padding:8px;border:1px solid #e0e0e0;"><strong>Moscow, Russia</strong></td></tr>
  <tr><td style="padding:8px;border:1px solid #e0e0e0;">IP Address</td><td style="padding:8px;border:1px solid #e0e0e0;">185.220.101.47</td></tr>
  <tr style="background:#f5f5f5;"><td style="padding:8px;border:1px solid #e0e0e0;">Device</td><td style="padding:8px;border:1px solid #e0e0e0;">Unknown Windows 11 PC</td></tr>
  <tr><td style="padding:8px;border:1px solid #e0e0e0;">Time</td><td style="padding:8px;border:1px solid #e0e0e0;">02:14 AM UTC</td></tr>
</table>
<p>Run the attached security diagnostic tool to verify your account integrity and revoke unauthorized sessions.</p>
<p>Microsoft Security Team</p>`,
    attachment: { name: "MS365_Security_Diagnostic.exe", type: ".exe", size: "4.7 MB" },
  },
  {
    senderName: "David Chen – Finance",
    senderEmail: "d.chen@acme-finance-corp.com",
    senderInitial: "DC",
    senderColor: "#2E7D32",
    subject: "Revised Invoice #INV-2024-8847 – Please Process Urgently",
    preview: "Attached is the revised invoice for the Q4 vendor contract. Wire transfer details updated.",
    body: `<p>Hi Team,</p>
<p>Please find attached the revised invoice <strong>#INV-2024-8847</strong> for the vendor services contracted in Q4. The banking details have been updated as per our vendor's request.</p>
<p>Kindly process the wire transfer of <strong>$47,250.00 USD</strong> to the new account listed in the invoice before end of business today to avoid late payment penalties.</p>
<p style="background:#fff3cd;padding:12px;border-left:4px solid #ffc107;border-radius:2px;">⚠️ Note: The previous banking details are no longer valid. Please use only the details in the attached invoice document.</p>
<p>Let me know if you need anything else.</p>
<p>David Chen<br/>VP Finance<br/>Direct: +1-212-555-0847</p>`,
    attachment: { name: "Invoice_INV-2024-8847_Revised.zip", type: ".zip", size: "891 KB" },
  },
  {
    senderName: "DocuSign System",
    senderEmail: "dse@docusign-secure-mail.com",
    senderInitial: "DS",
    senderColor: "#FFB300",
    subject: "Your Document is Ready to Sign – Action Required",
    preview: "Jennifer Walsh has sent you a document to review and sign electronically.",
    body: `<p>Hello,</p>
<p><strong>Jennifer Walsh</strong> has sent you a document via DocuSign Secure Portal for your review and signature.</p>
<div style="background:#f8f9fa;border:1px solid #e0e0e0;border-radius:4px;padding:16px;margin:12px 0;">
  <p style="margin:0 0 8px;"><strong>📄 Document:</strong> Employment_Contract_Amendment_2025.pdf</p>
  <p style="margin:0 0 8px;"><strong>From:</strong> jennifer.walsh@corp-legal.com</p>
  <p style="margin:0;"><strong>Expires:</strong> 48 hours from now</p>
</div>
<p>To review and sign the document, please open the attached PDF file and use your registered digital signature.</p>
<p>DocuSign Electronic Signature Service</p>`,
    attachment: { name: "Employment_Contract_Amendment.pdf", type: ".pdf", size: "2.1 MB" },
  },
];

const networkTopologies: NetworkNode[][] = [
  [
    { id: "fw1", label: "Firewall", type: "firewall", x: 50, y: 50, infected: false, critical: true },
    { id: "rt1", label: "Router", type: "router", x: 200, y: 50, infected: false, critical: true },
    { id: "srv1", label: "Web Server", type: "server", x: 350, y: 30, infected: false, critical: true },
    { id: "db1", label: "Database", type: "database", x: 500, y: 50, infected: false, critical: true },
    { id: "ws1", label: "WS-001", type: "workstation", x: 120, y: 170, infected: false, critical: false },
    { id: "ws2", label: "WS-002", type: "workstation", x: 260, y: 170, infected: false, critical: false },
    { id: "ws3", label: "WS-003", type: "workstation", x: 380, y: 170, infected: false, critical: false },
    { id: "lt1", label: "Laptop-A", type: "laptop", x: 500, y: 170, infected: false, critical: false },
    { id: "srv2", label: "File Server", type: "server", x: 200, y: 270, infected: false, critical: true },
  ],
  [
    { id: "fw1", label: "Perimeter FW", type: "firewall", x: 280, y: 30, infected: false, critical: true },
    { id: "rt1", label: "Core Switch", type: "router", x: 280, y: 110, infected: false, critical: true },
    { id: "srv1", label: "App Server", type: "server", x: 100, y: 200, infected: false, critical: true },
    { id: "db1", label: "SQL Server", type: "database", x: 460, y: 200, infected: false, critical: true },
    { id: "ws1", label: "Finance-PC", type: "workstation", x: 60, y: 300, infected: false, critical: false },
    { id: "ws2", label: "HR-PC", type: "workstation", x: 180, y: 300, infected: false, critical: false },
    { id: "ws3", label: "Dev-PC", type: "workstation", x: 300, y: 300, infected: false, critical: false },
    { id: "lt1", label: "Exec-Laptop", type: "laptop", x: 420, y: 300, infected: false, critical: false },
    { id: "srv2", label: "Backup Srv", type: "server", x: 540, y: 300, infected: false, critical: false },
  ],
];

const maliciousIps = [
  "185.220.101.47", "45.142.212.100", "103.152.220.47", "194.165.16.29",
  "91.121.87.45", "77.91.79.56", "5.188.206.14", "95.214.27.4"
];

const encryptedFilePools = [
  ["Q4_Financial_Report_2024.xlsx", "Employee_Salaries_Master.xlsx", "Corporate_Strategy_2025.docx",
   "Client_Database_Export.csv", "Source_Code_Repository.zip", "Server_Backup_Dec2024.tar",
   "Legal_Contracts_Archive.zip", "HR_Records_All_Staff.xlsx", "Network_Config_Backup.cfg",
   "Customer_PII_Database.sql", "Trade_Secrets_R&D.docx", "Board_Meeting_Minutes_2024.pdf"],
  ["Active_Directory_Export.ldif", "VPN_Credentials_List.txt", "Production_Database.bak",
   "SSL_Certificates_Bundle.pfx", "API_Keys_Master.env", "Cloud_Infrastructure_Config.yml",
   "Incident_Response_Plan.pdf", "Vulnerability_Scan_Results.xlsx", "Penetration_Test_Report.pdf",
   "Disaster_Recovery_Plan.docx", "System_Architecture_Diagram.vsd", "Security_Audit_2024.pdf"],
];

const logPools: LogEntry[][] = [
  [
    { timestamp: "2025-01-15 08:42:17", level: "INFO", source: "AuthService", message: "User john.carter logged in from 10.0.1.45", ip: "10.0.1.45" },
    { timestamp: "2025-01-15 08:43:02", level: "WARN", source: "EmailGateway", message: "Macro-enabled attachment received from external sender", ip: "185.220.101.47" },
    { timestamp: "2025-01-15 08:43:45", level: "ERROR", source: "EDR-Agent", message: "Suspicious process spawned: WINWORD.EXE -> cmd.exe -> powershell.exe", hash: "a3f7c9e2b1d4" },
    { timestamp: "2025-01-15 08:44:01", level: "CRITICAL", source: "Firewall", message: "Outbound C2 connection attempt blocked to 185.220.101.47:4444", ip: "185.220.101.47" },
    { timestamp: "2025-01-15 08:44:33", level: "CRITICAL", source: "SIEM", message: "Lateral movement detected: 10.0.1.45 -> 10.0.1.100 (SMB exploit)", ip: "10.0.1.100" },
    { timestamp: "2025-01-15 08:45:12", level: "ERROR", source: "AV-Engine", message: "Malware hash match: Trojan.GenericKD.47291048 – quarantine failed", hash: "e9f2a8d3c741" },
    { timestamp: "2025-01-15 08:45:44", level: "CRITICAL", source: "DLP", message: "Mass file encryption detected on \\\\fileserver\\shares\\finance\\", ip: "10.0.1.45" },
    { timestamp: "2025-01-15 08:46:01", level: "CRITICAL", source: "IDS", message: "Ransomware signature detected – dropping packets from 10.0.1.45", ip: "10.0.1.45" },
    { timestamp: "2025-01-15 08:46:30", level: "ERROR", source: "AuthService", message: "219 failed login attempts on domain controller DC01", ip: "10.0.1.45" },
    { timestamp: "2025-01-15 08:47:11", level: "WARN", source: "NetFlow", message: "Abnormal data exfiltration: 4.2GB outbound to 185.220.101.47", ip: "185.220.101.47" },
  ],
  [
    { timestamp: "2025-01-15 11:22:05", level: "INFO", source: "VPN-Server", message: "Remote session established: emily.walsh from 91.121.87.45", ip: "91.121.87.45" },
    { timestamp: "2025-01-15 11:23:18", level: "WARN", source: "Proxy", message: "Malicious domain contacted: update-security-patch.ru", ip: "91.121.87.45" },
    { timestamp: "2025-01-15 11:24:02", level: "ERROR", source: "EDR-Agent", message: "PowerShell encoded command execution detected on LAPTOP-EW01", hash: "b7d4e1f8a295" },
    { timestamp: "2025-01-15 11:24:45", level: "CRITICAL", source: "SIEM", message: "Credential harvesting tool detected: Mimikatz variant", hash: "c3a9e7f2b481" },
    { timestamp: "2025-01-15 11:25:11", level: "CRITICAL", source: "AD-Monitor", message: "Privilege escalation: emily.walsh added to Domain Admins group", ip: "10.0.2.55" },
    { timestamp: "2025-01-15 11:25:33", level: "ERROR", source: "Firewall", message: "Port scan detected from 10.0.2.55 targeting internal subnet", ip: "10.0.2.55" },
    { timestamp: "2025-01-15 11:26:07", level: "CRITICAL", source: "Backup", message: "Shadow copy deletion detected – ransomware pre-stage activity", hash: "f1c7b3d9e642" },
    { timestamp: "2025-01-15 11:26:44", level: "CRITICAL", source: "AV-Engine", message: "Ransomware dropped: Lockbit3.0 variant on SQL-SERVER-01", hash: "a8e3d2c9f147" },
    { timestamp: "2025-01-15 11:27:01", level: "ERROR", source: "Database", message: "Unauthorized database dump in progress – 847 tables affected", ip: "10.0.2.55" },
    { timestamp: "2025-01-15 11:27:30", level: "WARN", source: "NetFlow", message: "C2 beacon detected: 60-second intervals to 91.121.87.45", ip: "91.121.87.45" },
  ],
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateScenario(): GameScenario {
  const phishingTemplate = randomFrom(phishingPool);
  const topology = JSON.parse(JSON.stringify(randomFrom(networkTopologies))) as NetworkNode[];
  const maliciousIp = randomFrom(maliciousIps);
  const malwareType: MalwareType = randomFrom(["ransomware", "trojan", "keylogger", "worm", "spyware"]);
  const encryptedFiles = randomFrom(encryptedFilePools);
  const logs = randomFrom(logPools);
  const compromisedNode = topology.find(n => n.type === "workstation" || n.type === "laptop");

  const btcAmounts = ["1.47", "2.13", "0.87", "3.05", "1.92"];
  const attackVectors = [
    "Phishing email with malicious macro",
    "Spear-phishing via spoofed executive email",
    "Social engineering with fake IT support",
    "Business Email Compromise (BEC)",
    "Watering hole attack via email link",
  ];

  const phishing: PhishingScenario = {
    ...phishingTemplate,
    isPhishing: true,
    spamWarning: Math.random() > 0.4,
    timestamp: `${Math.floor(Math.random() * 12) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")} ${Math.random() > 0.5 ? "AM" : "PM"}`,
    malwareType,
  };

  return {
    phishing,
    networkNodes: topology,
    maliciousIp,
    malwareType,
    attackVector: randomFrom(attackVectors),
    compromisedSystem: compromisedNode?.label ?? "WS-001",
    btcAmount: randomFrom(btcAmounts),
    encryptedFiles,
    logEntries: logs.map(l => ({ ...l, ip: l.ip === maliciousIps[0] ? maliciousIp : l.ip })),
  };
}
