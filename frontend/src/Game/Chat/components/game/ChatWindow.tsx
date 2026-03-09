// import { motion, AnimatePresence } from "framer-motion";
// import { GameLevel, GameOption } from "@/Game/Chat/data/levels";
// import { TypingIndicator } from "./TypingIndicator";
// import { DoubleTick } from "./DoubleTick";
// import { cn } from "@/Game/Chat/lib/utils";

// interface ChatWindowProps {
//   level: GameLevel;
//   visibleMessages: string[];
//   showOptions: boolean;
//   selectedOption: string | null;
//   onSelectOption: (optionId: string) => void;
//   allMessagesVisible: boolean;
// }

// export function ChatWindow({
//   level, visibleMessages, showOptions, selectedOption, onSelectOption, allMessagesVisible,
// }: ChatWindowProps) {
//   const allVisible = level.messages.every(m => visibleMessages.includes(m.id));
//   const showTyping = !allVisible && visibleMessages.length > 0;

//   return (
//     <div className="flex flex-col h-full">
//       {/* Chat header */}
//       <div className="bg-chat-header text-primary-foreground px-4 py-3 flex items-center gap-3 shrink-0">
//         <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center text-lg">
//           {level.contactIcon}
//         </div>
//         <div>
//           <div className="font-semibold text-sm">{level.contactName}</div>
//           <div className="text-[11px] opacity-80">{level.status}</div>
//         </div>
//       </div>

//       {/* Messages area */}
//       <div
//         className="flex-1 overflow-y-auto px-4 py-3 space-y-2"
//         style={{ background: "hsl(var(--chat-bg))" }}
//       >
//         <AnimatePresence>
//           {level.messages.map((msg) =>
//             visibleMessages.includes(msg.id) ? (
//               <motion.div
//                 key={msg.id}
//                 initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 transition={{ duration: 0.3 }}
//                 className={cn(
//                   "flex",
//                   msg.type === "outgoing" ? "justify-end" : "justify-start"
//                 )}
//               >
//                 <div
//                   className={cn(
//                     "chat-bubble",
//                     msg.type === "outgoing" ? "chat-bubble-outgoing" : "chat-bubble-incoming"
//                   )}
//                 >
//                   <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
//                   <div className="flex items-center justify-end gap-0.5 mt-1">
//                     <span className="text-[10px] text-chat-timestamp">
//                       {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                     </span>
//                     {msg.type === "outgoing" && <DoubleTick />}
//                   </div>
//                 </div>
//               </motion.div>
//             ) : null
//           )}
//         </AnimatePresence>

//         {showTyping && <TypingIndicator />}

//         {/* Options */}
//         {showOptions && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay: 0.2 }}
//             className="pt-4 space-y-2"
//           >
//             <p className="text-xs text-muted-foreground text-center font-medium">
//               🤔 What would you do?
//             </p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//               {level.options.map((opt) => (
//                 <OptionButton
//                   key={opt.id}
//                   option={opt}
//                   selected={selectedOption === opt.id}
//                   disabled={selectedOption !== null}
//                   anySelected={selectedOption !== null}
//                   onClick={() => onSelectOption(opt.id)}
//                 />
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </div>

//       {/* Input bar (decorative) */}
//       <div className="bg-secondary/80 px-4 py-3 flex items-center gap-3 border-t border-border shrink-0">
//         <div className="flex-1 bg-background rounded-full px-4 py-2 text-sm text-muted-foreground">
//           Choose a response above...
//         </div>
//         <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
//           ▶
//         </div>
//       </div>
//     </div>
//   );
// }

// function OptionButton({
//   option, selected, disabled, anySelected, onClick,
// }: {
//   option: GameOption;
//   selected: boolean;
//   disabled: boolean;
//   anySelected: boolean;
//   onClick: () => void;
// }) {
//   const getStyle = () => {
//     if (!anySelected) return "bg-background border-border hover:border-primary hover:bg-chat-hover";
//     if (selected && option.isCorrect) return "bg-chat-success/10 border-chat-success text-chat-success";
//     if (selected && !option.isCorrect) return "bg-chat-danger/10 border-chat-danger text-chat-danger animate-shake";
//     if (option.isCorrect) return "bg-chat-success/5 border-chat-success/50";
//     return "opacity-50 bg-secondary border-border";
//   };

//   return (
//     <motion.button
//       whileHover={!disabled ? { scale: 1.02 } : {}}
//       whileTap={!disabled ? { scale: 0.98 } : {}}
//       onClick={onClick}
//       disabled={disabled}
//       className={cn(
//         "rounded-xl border-2 px-4 py-3 text-left text-sm transition-all duration-200",
//         getStyle()
//       )}
//     >
//       <span className="font-bold mr-2">{option.label})</span>
//       {option.text}
//       {anySelected && option.isCorrect && " ✅"}
//       {selected && !option.isCorrect && " ❌"}
//     </motion.button>
//   );
// }

import { motion, AnimatePresence } from "framer-motion";
import { GameLevel, GameOption } from "@/Game/Chat/data/levels";
import { TypingIndicator } from "./TypingIndicator";
import { DoubleTick } from "./DoubleTick";
import { cn } from "@/Game/Chat/lib/utils";

interface ChatWindowProps {
  level: GameLevel;
  visibleMessages: string[];
  showOptions: boolean;
  selectedOption: string | null;
  onSelectOption: (optionId: string) => void;
  allMessagesVisible: boolean;
}

export function ChatWindow({
  level, visibleMessages, showOptions, selectedOption, onSelectOption, allMessagesVisible,
}: ChatWindowProps) {
  const allVisible = level.messages.every(m => visibleMessages.includes(m.id));
  const showTyping = !allVisible && visibleMessages.length > 0;

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="bg-chat-header text-primary-foreground px-4 py-3 flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center text-lg">
          {level.contactIcon}
        </div>
        <div>
          <div className="font-semibold text-sm">{level.contactName}</div>
          <div className="text-[11px] opacity-80">{level.status}</div>
        </div>
      </div>

      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto px-4 py-3 space-y-2"
        style={{ background: "hsl(var(--chat-bg))" }}
      >
        <AnimatePresence>
          {level.messages.map((msg) =>
            visibleMessages.includes(msg.id) ? (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex",
                  msg.type === "outgoing" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "chat-bubble",
                    msg.type === "outgoing" ? "chat-bubble-outgoing" : "chat-bubble-incoming"
                  )}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  <div className="flex items-center justify-end gap-0.5 mt-1">
                    <span className="text-[10px] text-chat-timestamp">
                      {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {msg.type === "outgoing" && <DoubleTick />}
                  </div>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>

        {showTyping && <TypingIndicator />}

        {/* Options */}
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="pt-4 space-y-2"
          >
            <p className="text-xs text-muted-foreground text-center font-medium">
              🤔 What would you do?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {level.options.map((opt) => (
                <OptionButton
                  key={opt.id}
                  option={opt}
                  selected={selectedOption === opt.id}
                  disabled={selectedOption !== null}
                  anySelected={selectedOption !== null}
                  onClick={() => onSelectOption(opt.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Input bar (decorative) */}
      <div className="bg-secondary/80 px-4 py-3 flex items-center gap-3 border-t border-border shrink-0">
        <div className="flex-1 bg-background rounded-full px-4 py-2 text-sm text-muted-foreground">
          Choose a response above...
        </div>
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          ▶
        </div>
      </div>
    </div>
  );
}

function OptionButton({
  option, selected, disabled, anySelected, onClick,
}: {
  option: GameOption;
  selected: boolean;
  disabled: boolean;
  anySelected: boolean;
  onClick: () => void;
}) {
  const getStyle = () => {
    if (!anySelected) return "bg-background border-border hover:border-primary hover:bg-chat-hover";
    if (selected && option.isCorrect) return "bg-chat-success/10 border-chat-success text-chat-success";
    if (selected && !option.isCorrect) return "bg-chat-danger/10 border-chat-danger text-chat-danger animate-shake";
    if (option.isCorrect) return "bg-chat-success/5 border-chat-success/50";
    return "opacity-50 bg-secondary border-border";
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-xl border-2 px-4 py-3 text-left text-sm transition-all duration-200",
        getStyle()
      )}
    >
      <span className="font-bold mr-2">{option.label})</span>
      {option.text}
      {anySelected && option.isCorrect && " ✅"}
      {selected && !option.isCorrect && " ❌"}
    </motion.button>
  );
}
