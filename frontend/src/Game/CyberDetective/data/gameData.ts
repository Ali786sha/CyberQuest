export interface PhishingEmail {
  id: number;
  sender: string;
  senderEmail: string;
  subject: string;
  body: string;
  linkText: string;
  realUrl: string;
  isPhishing: boolean;
  explanation: string;
}

export const phishingEmails: PhishingEmail[] = [
  {
    id: 1,
    sender: "PayPal Security",
    senderEmail: "security@paypa1-support.com",
    subject: "⚠️ Your account has been limited",
    body: "Dear Customer,\n\nWe've noticed unusual activity on your account. Your account access has been limited until you verify your information. Click the link below immediately to restore access.",
    linkText: "Verify Your Account Now",
    realUrl: "http://paypa1-phish.ru/verify",
    isPhishing: true,
    explanation: "The sender email uses '1' instead of 'l' in PayPal. The real URL leads to a Russian domain. PayPal never asks you to verify via email links."
  },
  {
    id: 2,
    sender: "Amazon",
    senderEmail: "order-update@amazon.com",
    subject: "Your order #302-4851923 has shipped",
    body: "Hello,\n\nGreat news! Your order has shipped and is on its way. You can track your package using the link below.\n\nEstimated delivery: 3-5 business days.",
    linkText: "Track Your Package",
    realUrl: "https://amazon.com/track/302-4851923",
    isPhishing: false,
    explanation: "This is a legitimate Amazon shipping notification. The sender email matches Amazon's domain, and the tracking link goes to amazon.com."
  },
  {
    id: 3,
    sender: "Netflix Support",
    senderEmail: "billing@netflix-account-update.com",
    subject: "Payment Failed - Update Billing Info",
    body: "Your Netflix membership payment was declined. To avoid service interruption, please update your payment method within 24 hours or your account will be suspended permanently.",
    linkText: "Update Payment Method",
    realUrl: "http://netflix-billing-update.xyz/payment",
    isPhishing: true,
    explanation: "The email creates false urgency. The sender domain is not netflix.com. The link goes to a suspicious .xyz domain. Netflix sends billing issues through their app."
  },
  {
    id: 4,
    sender: "Google",
    senderEmail: "no-reply@accounts.google.com",
    subject: "Security alert: New sign-in on Windows",
    body: "A new sign-in was detected on your Google Account.\n\nDevice: Windows PC\nLocation: New York, US\nTime: Today at 2:34 PM\n\nIf this was you, no action is needed.",
    linkText: "Review Activity",
    realUrl: "https://myaccount.google.com/security",
    isPhishing: false,
    explanation: "This is a legitimate Google security alert. The sender is from google.com and the link points to the official Google security page."
  },
  {
    id: 5,
    sender: "IRS Tax Refund",
    senderEmail: "refund@irs-tax-return.net",
    subject: "You have a pending tax refund of $4,287.00",
    body: "Dear Taxpayer,\n\nAfter the last annual calculation, we have determined you are eligible for a tax refund of $4,287.00. To claim your refund, submit your information through our secure portal.",
    linkText: "Claim Your Refund",
    realUrl: "http://irs-refund-claim.com/submit",
    isPhishing: true,
    explanation: "The IRS never contacts taxpayers by email about refunds. The domain is fake (irs.gov is the real one). This is a classic tax scam phishing attempt."
  },
  {
    id: 6,
    sender: "Microsoft 365",
    senderEmail: "admin@microsft-365.com",
    subject: "Your password expires in 24 hours",
    body: "Your Microsoft 365 password will expire soon. To keep your account active and avoid losing access to your files, click below to reset your password immediately.",
    linkText: "Reset Password Now",
    realUrl: "http://microsft-365.com/reset-pwd",
    isPhishing: true,
    explanation: "'Microsoft' is misspelled as 'microsft' in the domain. Microsoft never sends password expiry emails with direct reset links. The URL is suspicious."
  },
  {
    id: 7,
    sender: "LinkedIn",
    senderEmail: "messages-noreply@linkedin.com",
    subject: "You have 3 new connection requests",
    body: "Hi there,\n\nYou have 3 pending connection requests on LinkedIn. Log in to review and accept them.\n\nKeep growing your professional network!",
    linkText: "View Connections",
    realUrl: "https://www.linkedin.com/mynetwork/",
    isPhishing: false,
    explanation: "This is a legitimate LinkedIn notification. The sender domain is linkedin.com and the link goes to the official LinkedIn network page."
  },
];

export interface SocialProfile {
  name: string;
  avatar: string;
  items: ProfileItem[];
}

export interface ProfileItem {
  id: string;
  label: string;
  value: string;
  isRisky: boolean;
  riskReason: string;
}

export const socialProfile: SocialProfile = {
  name: "Sarah Mitchell",
  avatar: "SM",
  items: [
    { id: "dob", label: "Birthday", value: "March 15, 1992", isRisky: true, riskReason: "Date of birth is used for identity verification by banks and government agencies. Scammers use it to reset passwords." },
    { id: "phone", label: "Phone", value: "+1 (555) 234-8901", isRisky: true, riskReason: "Phone numbers can be used for SIM swapping attacks, allowing hackers to intercept 2FA codes and take over accounts." },
    { id: "email", label: "Email", value: "sarah.m92@gmail.com", isRisky: false, riskReason: "Email shown on profiles is common and generally acceptable. Most people's emails are already somewhat public." },
    { id: "location", label: "Lives in", value: "742 Oak Street, Portland, OR", isRisky: true, riskReason: "Full home address enables physical stalking, mail theft, and social engineering attacks targeting your residence." },
    { id: "workplace", label: "Works at", value: "TechVault Inc.", isRisky: false, riskReason: "Workplace info is common on professional profiles and generally low-risk when shared alone." },
    { id: "password_hint", label: "Password Hint", value: "My first pet's name + birth year", isRisky: true, riskReason: "Password hints reveal the structure of your password. Combined with other public info, attackers can guess your credentials." },
    { id: "vacation", label: "Status", value: "🌴 On vacation until Dec 20!", isRisky: true, riskReason: "Announcing you're away from home invites burglary. It also signals you may not notice account activity while traveling." },
    { id: "joined", label: "Joined", value: "Member since 2018", isRisky: false, riskReason: "Account age is harmless metadata that doesn't help attackers." },
  ],
};

export interface BrowsingRedFlag {
  id: string;
  label: string;
  description: string;
  isRedFlag: boolean;
  explanation: string;
}

export const browsingScenario = {
  url: "http://arnazon-deals.com/signin",
  pageTitle: "Arnazon - Sign In",
  redFlags: [
    { id: "url", label: "URL Bar", description: "http://arnazon-deals.com/signin", isRedFlag: true, explanation: "The domain 'arnazon' uses 'rn' to mimic 'm' in Amazon. Also uses HTTP instead of HTTPS." },
    { id: "https", label: "No HTTPS", description: "Connection is not secure (no padlock icon)", isRedFlag: true, explanation: "Legitimate login pages always use HTTPS. The lack of a padlock means data is sent unencrypted." },
    { id: "logo", label: "Logo", description: "Amazon logo with slightly different colors", isRedFlag: true, explanation: "Phishing sites often use slightly altered logos to avoid copyright detection while appearing legitimate." },
    { id: "grammar", label: "Welcome Text", description: "Wellcome to you're Arnazon acount", isRedFlag: true, explanation: "Multiple spelling and grammar errors are a classic sign of phishing. Legitimate companies proofread their pages." },
    { id: "form", label: "Login Form", description: "Standard email and password fields", isRedFlag: false, explanation: "Login forms themselves aren't red flags — they're expected on sign-in pages." },
    { id: "popup", label: "Popup", description: "🎉 Congratulations! You've won a $500 gift card! Click HERE!", isRedFlag: true, explanation: "Unsolicited prize popups are a classic scam tactic. Amazon doesn't offer random prizes during login." },
    { id: "footer", label: "Footer", description: "© 2024 Arnazon Inc. All rights reserved.", isRedFlag: true, explanation: "The footer uses the misspelled 'Arnazon' name, confirming this is not a legitimate Amazon page." },
    { id: "ssn", label: "Extra Field", description: "Please enter your Social Security Number for verification", isRedFlag: true, explanation: "No legitimate shopping site asks for your SSN during login. This is a data harvesting attempt." },
  ] as BrowsingRedFlag[],
};

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const achievements: Achievement[] = [
  { id: "phishing_pro", name: "Phishing Pro", icon: "🎣", description: "Detected all phishing emails correctly" },
  { id: "privacy_protector", name: "Privacy Protector", icon: "🛡️", description: "Identified all risky personal information" },
  { id: "safe_surfer", name: "Safe Surfer", icon: "🏄", description: "Found all red flags in the fake website" },
];
