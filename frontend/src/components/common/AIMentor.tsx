// import { useState } from "react";
// import { MessageCircle, X, Send, Bot } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// interface Message {
//   type: "ai" | "user";
//   content: string;
//   timestamp: Date;
// }

// const AIMentor = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       type: "ai",
//       content: "Hello! I'm your AI Mentor. How can I help you with your learning today?",
//       timestamp: new Date()
//     }
//   ]);

//   const handleSendMessage = () => {
//     if (!message.trim()) return;

//     setMessages(prev => [...prev, {
//       type: "user",
//       content: message,
//       timestamp: new Date()
//     }]);

//     // Simulate AI response
//     setTimeout(() => {
//       setMessages(prev => [...prev, {
//         type: "ai",
//         content: "That's a great question! Let me help you understand that concept better...",
//         timestamp: new Date()
//       }]);
//     }, 1000);

//     setMessage("");
//   };

//   return (
//     <>
//       {/* Floating Chat Button */}
//       {!isOpen && (
//         <Button
//           onClick={() => setIsOpen(true)}
//           className="fixed bottom-6 right-6 z-50 btn-cyber w-14 h-14 rounded-full p-0 shadow-lg hover:shadow-neon-hover"
//         >
//           <Bot className="h-6 w-6" />
//         </Button>
//       )}

//       {/* Chat Window */}
//       {isOpen && (
//         <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-card border border-border rounded-xl shadow-card">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 border-b border-border">
//             <div className="flex items-center space-x-2">
//               <Bot className="h-5 w-5 text-primary" />
//               <h3 className="font-semibold text-neon">AI Mentor</h3>
//             </div>
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setIsOpen(false)}
//             >
//               <X className="h-4 w-4" />
//             </Button>
//           </div>

//           {/* Messages */}
//           <div className="h-64 overflow-y-auto p-4 space-y-3">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div
//                   className={`max-w-[80%] rounded-lg p-3 ${
//                     msg.type === 'user'
//                       ? 'bg-primary text-primary-foreground'
//                       : 'bg-muted text-muted-foreground'
//                   }`}
//                 >
//                   <p className="text-sm">{msg.content}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Input */}
//           <div className="p-4 border-t border-border">
//             <div className="flex space-x-2">
//               <Input
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Ask me anything..."
//                 onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                 className="flex-1"
//               />
//               <Button onClick={handleSendMessage} size="sm" className="btn-neon px-3">
//                 <Send className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AIMentor;

import { useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom"; // <-- add this

interface Message {
  type: "ai" | "user";
  content: string;
  timestamp: Date;
}

const AIMentor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "ai",
      content: "Hello! I'm your AI Mentor. How can I help you with your learning today?",
      timestamp: new Date()
    }
  ]);

  const navigate = useNavigate(); // <-- hook

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setMessages(prev => [...prev, {
      type: "user",
      content: message,
      timestamp: new Date()
    }]);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: "ai",
        content: "That's a great question! Let me help you understand that concept better...",
        timestamp: new Date()
      }]);
    }, 1000);

    setMessage("");
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => navigate("/student/chat")} // <-- change here
          className="fixed bottom-6 right-6 z-50 btn-cyber w-14 h-14 rounded-full p-0 shadow-lg hover:shadow-neon-hover"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-card border border-border rounded-xl shadow-card">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-neon">AI Mentor</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="sm" className="btn-neon px-3">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIMentor;