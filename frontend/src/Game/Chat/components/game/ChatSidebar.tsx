// import { levels } from "@/Game/Chat/data/levels";
// import { cn } from "@/Game/Chat/lib/utils";

// interface ChatSidebarProps {
//   currentLevel: number;
//   completedLevels: number;
//   onSelectLevel?: (level: number) => void;
// }

// export function ChatSidebar({ currentLevel, completedLevels }: ChatSidebarProps) {
//   return (
//     <div className="w-full h-full bg-chat-sidebar border-r border-border flex flex-col">
//       {/* Sidebar header */}
//       <div className="bg-chat-header text-primary-foreground px-4 py-3 flex items-center justify-between">
//         <h2 className="font-semibold text-base">🔒 SafeChat</h2>
//         <span className="text-xs opacity-80">Cyber Awareness</span>
//       </div>

//       {/* Search bar */}
//       <div className="px-3 py-2 border-b border-border">
//         <div className="bg-secondary rounded-lg px-3 py-2 text-sm text-muted-foreground">
//           🔍 Search chats...
//         </div>
//       </div>

//       {/* Chat list */}
//       <div className="flex-1 overflow-y-auto">
//         {levels.map((level, idx) => (
//           <div
//             key={level.id}
//             className={cn(
//               "flex items-center gap-3 px-4 py-3 border-b border-border/50 cursor-default transition-colors",
//               idx === currentLevel && "bg-chat-hover",
//               idx < completedLevels && "opacity-60"
//             )}
//           >
//             <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl shrink-0">
//               {level.contactIcon}
//             </div>
//             <div className="flex-1 min-w-0">
//               <div className="flex justify-between items-baseline">
//                 <span className={cn("font-medium text-sm truncate", idx === currentLevel && "text-primary")}>
//                   {level.contactName}
//                 </span>
//                 <span className="text-[10px] text-chat-timestamp ml-2 shrink-0">
//                   {idx <= completedLevels ? "now" : ""}
//                 </span>
//               </div>
//               <p className="text-xs text-muted-foreground truncate mt-0.5">
//                 {idx < completedLevels
//                   ? "✅ Completed"
//                   : idx === currentLevel
//                   ? level.messages[0]?.text.slice(0, 40) + "..."
//                   : "🔒 Locked"}
//               </p>
//             </div>
//             {idx === currentLevel && (
//               <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold shrink-0">
//                 !
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { levels } from "@/Game/Chat/data/levels";
import { cn } from "@/Game/Chat/lib/utils";

interface ChatSidebarProps {
  currentLevel: number;
  completedLevels: number;
  onSelectLevel?: (level: number) => void;
}

export function ChatSidebar({ currentLevel, completedLevels }: ChatSidebarProps) {
  return (
    <div className="w-full h-full bg-chat-sidebar border-r border-border flex flex-col">
      {/* Sidebar header */}
      {/* Sidebar header */}
<div className="bg-chat-header text-primary-foreground px-4 py-3 flex items-center justify-between">
  <h2 className="font-semibold text-base text-white">🔒 SafeChat</h2>
  <span className="text-xs opacity-80">Cyber Awareness</span>
</div>

      {/* Search bar */}
      <div className="px-3 py-2 border-b border-border">
  <div className="bg-[#202c39] rounded-lg px-3 py-2 text-sm text-muted-foreground">
    🔍 Search chats...
  </div>
</div>
    

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto">
        {levels.map((level, idx) => (
          <div
            key={level.id}
            className={cn(
              "flex items-center gap-3 px-4 py-3 border-b border-border/50 cursor-default transition-colors",
              idx === currentLevel && "bg-chat-hover",
              idx < completedLevels && "opacity-60"
            )}
          >
            <div className="w-10 h-10 rounded-full bg-[#2a3939] flex items-center justify-center text-xl shrink-0">
              {level.contactIcon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <span className={cn("font-medium text-sm truncate", idx === currentLevel && "text-primary")}>
                  {level.contactName}
                </span>
                <span className="text-[10px] text-chat-timestamp ml-2 shrink-0">
                  {idx <= completedLevels ? "now" : ""}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {idx < completedLevels
                  ? "✅ Completed"
                  : idx === currentLevel
                  ? level.messages[0]?.text.slice(0, 40) + "..."
                  : "🔒 Locked"}
              </p>
            </div>
            {idx === currentLevel && (
              <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold shrink-0">
                !
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

