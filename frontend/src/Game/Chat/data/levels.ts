export interface ChatMessage {
  id: string;
  text: string;
  type: "incoming" | "outgoing" | "system";
  delay: number; // ms delay before showing
}

export interface GameOption {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
  isCritical?: boolean; // triggers phishing animation
}

export interface GameLevel {
  id: number;
  contactName: string;
  contactIcon: string; // emoji
  status: string;
  messages: ChatMessage[];
  options: GameOption[];
  explanation: {
    title: string;
    points: string[];
  };
  criticalFeedback?: {
    title: string;
    description: string;
  };
}

export const levels: GameLevel[] = [
  {
    id: 1,
    contactName: "Reward Center",
    contactIcon: "🎁",
    status: "online",
    messages: [
      { id: "1-1", text: "🎉 Congratulations! You won ₹5000 Amazon Gift Card!", type: "incoming", delay: 0 },
      { id: "1-2", text: "Claim now: http://reward-bonus-claim2026.xyz", type: "incoming", delay: 3000 },
      { id: "1-3", text: "⚠ Offer expires in 10 minutes.", type: "incoming", delay: 5000 },
    ],
    options: [
      { id: "1a", label: "A", text: "Click the link", isCorrect: false, isCritical: true },
      { id: "1b", label: "B", text: "Ignore the message", isCorrect: false },
      { id: "1c", label: "C", text: "Report & Block", isCorrect: true },
      { id: "1d", label: "D", text: "Verify on official website", isCorrect: true },
    ],
    explanation: {
      title: "Free Reward Scam Detected!",
      points: [
        "Suspicious domain: reward-bonus-claim2026.xyz is not an official site",
        "Urgency pressure: '10 minutes' creates panic to bypass thinking",
        "Too good to be true: Random gift cards are classic bait",
        "Always report and block suspicious contacts",
      ],
    },
    criticalFeedback: {
      title: "⚠ You Fell for a Phishing Scam!",
      description: "A fake loading screen appeared, followed by an OTP request. Your personal data could have been stolen.",
    },
  },
  {
    id: 2,
    contactName: "HDFC Bank Support",
    contactIcon: "🏦",
    status: "online",
    messages: [
      { id: "2-1", text: "Dear customer, your account will be blocked today.", type: "incoming", delay: 0 },
      { id: "2-2", text: "Update KYC immediately: http://hdfc-verify-secure.net", type: "incoming", delay: 2000 },
      { id: "2-3", text: "Failure to comply will result in permanent account suspension.", type: "incoming", delay: 4000 },
    ],
    options: [
      { id: "2a", label: "A", text: "Click the link", isCorrect: false, isCritical: true },
      { id: "2b", label: "B", text: "Call official bank number", isCorrect: true },
      { id: "2c", label: "C", text: "Reply with account number", isCorrect: false, isCritical: true },
      { id: "2d", label: "D", text: "Ignore the message", isCorrect: false },
    ],
    explanation: {
      title: "Bank KYC Scam Exposed!",
      points: [
        "Fake domain: hdfc-verify-secure.net is NOT an official bank website",
        "Threat-based manipulation: 'account will be blocked' creates fear",
        "Banks never ask for KYC updates via chat messages",
        "Always call the official number on your bank card to verify",
      ],
    },
    criticalFeedback: {
      title: "⚠ Banking Credentials Compromised!",
      description: "You entered your details on a fake banking site. Scammers now have access to your account information.",
    },
  },
  {
    id: 3,
    contactName: "Unknown Number",
    contactIcon: "👤",
    status: "online",
    messages: [
      { id: "3-1", text: "Hi, I mistakenly sent you a 6-digit code.", type: "incoming", delay: 0 },
      { id: "3-2", text: "Please forward it to me urgently. It's very important! 🙏", type: "incoming", delay: 2500 },
    ],
    options: [
      { id: "3a", label: "A", text: "Send the code", isCorrect: false, isCritical: true },
      { id: "3b", label: "B", text: "Ignore the message", isCorrect: true },
      { id: "3c", label: "C", text: "Block the number", isCorrect: true },
      { id: "3d", label: "D", text: "Ask the reason", isCorrect: false },
    ],
    explanation: {
      title: "OTP Hijack Attempt Blocked!",
      points: [
        "This is a verification code takeover scam",
        "The code was sent TO YOU for YOUR account — sharing it gives them access",
        "Never share OTPs, even with people who claim it was a mistake",
        "Block unknown numbers requesting sensitive information",
      ],
    },
    criticalFeedback: {
      title: "⚠ Account Hijacked!",
      description: "Your messaging account is now logged in on another device. The scammer has full access to your chats.",
    },
  },
  {
    id: 4,
    contactName: "OLX Buyer",
    contactIcon: "🛒",
    status: "online",
    messages: [
      { id: "4-1", text: "Hi, I'm interested in your product listing.", type: "incoming", delay: 0 },
      { id: "4-2", text: "I accidentally sent ₹10,000 to you by mistake.", type: "incoming", delay: 2500 },
      { id: "4-3", text: "Please scan this QR code to receive the refund. 📲", type: "incoming", delay: 4500 },
    ],
    options: [
      { id: "4a", label: "A", text: "Scan the QR code", isCorrect: false, isCritical: true },
      { id: "4b", label: "B", text: "Refuse & verify independently", isCorrect: true },
      { id: "4c", label: "C", text: "Share UPI ID", isCorrect: false, isCritical: true },
      { id: "4d", label: "D", text: "Accept screen share request", isCorrect: false, isCritical: true },
    ],
    explanation: {
      title: "UPI Refund Scam Prevented!",
      points: [
        "QR codes are for PAYING, not receiving money",
        "Scanning a QR code would debit YOUR account",
        "Screen sharing gives scammers full control of your device",
        "Never share UPI IDs with unverified contacts",
      ],
    },
    criticalFeedback: {
      title: "⚠ Money Stolen via UPI!",
      description: "By scanning the QR code, you authorized a payment FROM your account. ₹10,000 has been debited.",
    },
  },
  {
    id: 5,
    contactName: "Mom ❤️",
    contactIcon: "👩",
    status: "last seen today at 2:15 PM",
    messages: [
      { id: "5-1", text: "🎤 Voice message (0:12)", type: "incoming", delay: 0 },
      { id: "5-2", text: "\"Beta, I am in hospital. Send ₹20,000 urgently to this account: 9876543210@upi\"", type: "incoming", delay: 2000 },
      { id: "5-3", text: "Please hurry, it's an emergency! Don't tell dad. 😢", type: "incoming", delay: 4000 },
    ],
    options: [
      { id: "5a", label: "A", text: "Transfer immediately", isCorrect: false, isCritical: true },
      { id: "5b", label: "B", text: "Call family member directly", isCorrect: true },
      { id: "5c", label: "C", text: "Ask for OTP verification", isCorrect: false },
      { id: "5d", label: "D", text: "Ignore completely", isCorrect: false },
    ],
    explanation: {
      title: "AI Voice Clone Scam Identified!",
      points: [
        "AI can now clone voices from just a few seconds of audio",
        "Emotional manipulation: urgency + secrecy ('don't tell dad')",
        "ALWAYS verify by calling the family member directly on their known number",
        "Scammers use social media to gather family information",
      ],
    },
    criticalFeedback: {
      title: "⚠ Fell for AI Voice Scam!",
      description: "The voice message was generated by AI. The scammer used cloned voice to impersonate your family member.",
    },
  },
];

export const getRank = (score: number): { rank: string; emoji: string; color: string } => {
  if (score >= 100) return { rank: "Cyber Guardian", emoji: "🛡️", color: "text-chat-success" };
  if (score >= 70) return { rank: "Cyber Smart", emoji: "💡", color: "text-chat-score" };
  if (score >= 40) return { rank: "Moderate Risk", emoji: "⚠️", color: "text-chat-warning" };
  return { rank: "High Risk User", emoji: "🔴", color: "text-chat-danger" };
};

export const getBadges = (correctAnswers: number, wrongAnswers: number, score: number) => {
  const badges: { name: string; emoji: string; earned: boolean }[] = [
    { name: "Scam Spotter", emoji: "🔍", earned: wrongAnswers === 0 },
    { name: "Phish Hunter", emoji: "🎣", earned: correctAnswers >= 3 },
    { name: "Cyber Defender", emoji: "🛡️", earned: score > 120 },
    { name: "Digital Guardian", emoji: "👑", earned: correctAnswers === 5 && wrongAnswers === 0 },
  ];
  return badges;
};
