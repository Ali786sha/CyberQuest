// import { useState, useEffect } from "react";
// import { Trophy, Medal, Crown, TrendingUp, Calendar, Users } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import axios from "axios";

// const LeaderboardPage = () => {
//   const [timeFrame, setTimeFrame] = useState("all-time");
// const [globalLeaderboard, setGlobalLeaderboard] = useState([]);
// const [weeklyLeaderboard, setWeeklyLeaderboard] = useState([]);
// const [currentUser, setCurrentUser] = useState(null);
//   // const globalLeaderboard = [
//   //   { rank: 1, name: "CyberNinja", points: 15420, level: "Expert", avatar: "🥷", change: 0 },
//   //   { rank: 2, name: "SecurityMaster", points: 14850, level: "Expert", avatar: "🛡️", change: 1 },
//   //   { rank: 3, name: "HackDefender", points: 14320, level: "Advanced", avatar: "⚔️", change: -1 },
//   //   { rank: 4, name: "CryptoPro", points: 13950, level: "Advanced", avatar: "🔐", change: 2 },
//   //   { rank: 5, name: "NetGuardian", points: 13680, level: "Advanced", avatar: "🌐", change: 0 },
//   //   { rank: 6, name: "CodeBreaker", points: 13420, level: "Advanced", avatar: "💻", change: -1 },
//   //   { rank: 7, name: "FirewallKing", points: 13150, level: "Advanced", avatar: "🔥", change: 3 },
//   //   { rank: 8, name: "PhishHunter", points: 12890, level: "Intermediate", avatar: "🎣", change: -2 }
//   // ];

//   // const weeklyLeaderboard = [
//   //   { rank: 1, name: "RisingStarX", points: 2340, level: "Intermediate", avatar: "⭐", change: 5 },
//   //   { rank: 2, name: "QuickLearner", points: 2180, level: "Beginner", avatar: "🚀", change: 12 },
//   //   { rank: 3, name: "SecurityMaster", points: 2050, level: "Expert", avatar: "🛡️", change: -1 },
//   //   { rank: 4, name: "CyberNinja", points: 1920, level: "Expert", avatar: "🥷", change: -2 },
//   //   { rank: 5, name: "NewDefender", points: 1850, level: "Beginner", avatar: "🛡️", change: 8 }
//   // ];

//   // const currentUser = {
//   //   rank: 127,
//   //   name: "You",
//   //   points: 2847,
//   //   level: "Intermediate",
//   //   avatar: "👤",
//   //   change: 5
//   // };

//   const getRankIcon = (rank: number) => {
//     if (rank === 1) return <Crown className="h-6 w-6 text-accent" />;
//     if (rank === 2) return <Trophy className="h-6 w-6 text-muted-foreground" />;
//     if (rank === 3) return <Medal className="h-6 w-6 text-amber-600" />;
//     return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
//   };

//   const getChangeIcon = (change: number) => {
//     if (change > 0) return <TrendingUp className="h-4 w-4 text-secondary" />;
//     if (change < 0) return <TrendingUp className="h-4 w-4 text-destructive rotate-180" />;
//     return <span className="text-muted-foreground">-</span>;
//   };

//   const LeaderboardTable = ({ data }: { data: typeof globalLeaderboard }) => (
//     <div className="space-y-3">
//       {data.map((player, index) => (
//         <div
//           key={index}
//           className={`card-cyber flex items-center justify-between p-4 ${
//             player.name === "You" ? "border-primary/50 bg-primary/5" : ""
//           }`}
//         >
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center justify-center w-12 h-12">
//               {getRankIcon(player.rank)}
//             </div>
//             <div className="text-2xl">{player.avatar}</div>
//             <div>
//               <div className="flex items-center gap-2">
//                 <span className="font-bold text-glow">{player.name}</span>
//                 {player.name === "You" && (
//                   <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">YOU</span>
//                 )}
//               </div>
//               <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                 <span>{player.level}</span>
//                 <span>•</span>
//                 <span>{player.points.toLocaleString()} pts</span>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-2">
//             {getChangeIcon(player.change)}
//             {player.change !== 0 && (
//               <span className={`text-sm ${
//                 player.change > 0 ? "text-secondary" : "text-destructive"
//               }`}>
//                 {Math.abs(player.change)}
//               </span>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
//   // connectivety 
//   useEffect(() => {
//   fetchLeaderboard();
// }, [timeFrame]);

// const fetchLeaderboard = async () => {
//   try {
//     const res = await axios.get(
//       "http://localhost:5000/api/leaderboard?timeframe=" + timeFrame
//     );

//     setGlobalLeaderboard(res.data.global);
//     setWeeklyLeaderboard(res.data.weekly);
//     setCurrentUser(res.data.currentUser);

//   } catch (error) {
//     console.error("Leaderboard fetch error", error);
//   }
// };

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="text-center">
//         <h1 className="text-4xl font-bold text-glow mb-4">Leaderboard</h1>
//         <p className="text-muted-foreground text-lg">
//           Compete with cyber warriors around the world
//         </p>
//       </div>

//       {/* Your Rank Card */}
//       <div className="card-cyber">
//         <div className="text-center py-6">
//           <div className="text-4xl mb-2">{currentUser.avatar}</div>
//           <h2 className="text-2xl font-bold text-glow mb-1">Your Current Rank</h2>
//           <div className="flex items-center justify-center gap-4 text-lg">
//             <span className="text-muted-foreground">#{currentUser.rank}</span>
//             <span className="text-muted-foreground">•</span>
//             <span className="text-primary font-bold">{currentUser.points.toLocaleString()} points</span>
//             <span className="text-muted-foreground">•</span>
//             <span className="text-secondary">{currentUser.level}</span>
//           </div>
//         </div>
//       </div>

//       {/* Leaderboard Tabs */}
//       <Tabs defaultValue="global" className="space-y-6">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <TabsList className="grid w-full sm:w-auto grid-cols-3">
//             <TabsTrigger value="global" className="flex items-center gap-2">
//               <Trophy className="h-4 w-4" />
//               Global
//             </TabsTrigger>
//             <TabsTrigger value="weekly" className="flex items-center gap-2">
//               <Calendar className="h-4 w-4" />
//               Weekly
//             </TabsTrigger>
//             <TabsTrigger value="friends" className="flex items-center gap-2">
//               <Users className="h-4 w-4" />
//               Friends
//             </TabsTrigger>
//           </TabsList>

//           <Select value={timeFrame} onValueChange={setTimeFrame}>
//             <SelectTrigger className="w-full sm:w-40">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all-time">All Time</SelectItem>
//               <SelectItem value="monthly">This Month</SelectItem>
//               <SelectItem value="weekly">This Week</SelectItem>
//               <SelectItem value="daily">Today</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <TabsContent value="global" className="space-y-6">
//           <div className="card-cyber">
//             <h2 className="text-2xl font-bold text-glow mb-6">Global Champions</h2>
//             <LeaderboardTable data={[...globalLeaderboard, currentUser]} />
//           </div>
//         </TabsContent>

//         <TabsContent value="weekly" className="space-y-6">
//           <div className="card-cyber">
//             <h2 className="text-2xl font-bold text-glow mb-6">This Week's Rising Stars</h2>
//             <LeaderboardTable data={weeklyLeaderboard} />
//           </div>
//         </TabsContent>

//         <TabsContent value="friends" className="space-y-6">
//           <div className="card-cyber text-center py-12">
//             <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
//             <h3 className="text-xl font-bold text-glow mb-2">No Friends Added Yet</h3>
//             <p className="text-muted-foreground mb-6">
//               Connect with other cyber warriors to compete with friends!
//             </p>
//             <Button className="btn-cyber">
//               Find Friends
//             </Button>
//           </div>
//         </TabsContent>
//       </Tabs>

//       {/* Achievement Showcase */}
//       <div className="card-cyber">
//         <h2 className="text-2xl font-bold text-glow mb-6">Top Achievements</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="text-center p-6 border border-accent/30 rounded-lg bg-accent/5">
//             <div className="text-4xl mb-2">🏆</div>
//             <h3 className="font-bold text-glow mb-1">Speed Master</h3>
//             <p className="text-sm text-muted-foreground">Complete 10 challenges in under 5 minutes</p>
//             <p className="text-accent font-medium mt-2">Unlocked by 23 players</p>
//           </div>
//           <div className="text-center p-6 border border-primary/30 rounded-lg bg-primary/5">
//             <div className="text-4xl mb-2">🛡️</div>
//             <h3 className="font-bold text-glow mb-1">Defense Expert</h3>
//             <p className="text-sm text-muted-foreground">Perfect score on all defense challenges</p>
//             <p className="text-primary font-medium mt-2">Unlocked by 45 players</p>
//           </div>
//           <div className="text-center p-6 border border-secondary/30 rounded-lg bg-secondary/5">
//             <div className="text-4xl mb-2">💎</div>
//             <h3 className="font-bold text-glow mb-1">Elite Hacker</h3>
//             <p className="text-sm text-muted-foreground">Complete all advanced challenges</p>
//             <p className="text-secondary font-medium mt-2">Unlocked by 12 players</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeaderboardPage;


// import { useState, useEffect } from "react";
// import { Trophy, Medal, Crown, TrendingUp, Calendar, Users } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import axios from "axios";

// const LeaderboardPage = () => {

//   const [timeFrame, setTimeFrame] = useState("all-time");
//   const [globalLeaderboard, setGlobalLeaderboard] = useState([]);
//   const [weeklyLeaderboard, setWeeklyLeaderboard] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

//   // API CALL
//   const fetchLeaderboard = async () => {
//   try {

//     const globalRes = await axios.get(
//       "http://localhost:5000/api/scores/leaderboard"
//     );

//     const weeklyRes = await axios.get(
//       "http://localhost:5000/api/scores/leaderboard/weekly"
//     );

//     setGlobalLeaderboard(globalRes.data || []);
//     setWeeklyLeaderboard(weeklyRes.data || []);

//   } catch (error) {
//     console.error("Leaderboard fetch error", error);
//   }
// };




//   const getRankIcon = (rank) => {
//     if (rank === 1) return <Crown className="h-6 w-6 text-accent" />;
//     if (rank === 2) return <Trophy className="h-6 w-6 text-muted-foreground" />;
//     if (rank === 3) return <Medal className="h-6 w-6 text-amber-600" />;
//     return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
//   };

//   const getChangeIcon = (change) => {
//     if (change > 0) return <TrendingUp className="h-4 w-4 text-secondary" />;
//     if (change < 0) return <TrendingUp className="h-4 w-4 text-destructive rotate-180" />;
//     return <span className="text-muted-foreground">-</span>;
//   };

//   const LeaderboardTable = ({ data }) => (
//     <div className="space-y-3">

//       {data.map((player, index) => (

//         <div
//           key={index}
//           className={`card-cyber flex items-center justify-between p-4 ${
//             player.name === "You" ? "border-primary/50 bg-primary/5" : ""
//           }`}
//         >

//           <div className="flex items-center space-x-4">

//             <div className="flex items-center justify-center w-12 h-12">
//               {getRankIcon(player.rank)}
//             </div>

//             <div className="text-2xl">{player.avatar}</div>

//             <div>
//               <div className="flex items-center gap-2">
//                 <span className="font-bold text-glow">{player.name}</span>

//                 {player.name === "You" && (
//                   <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
//                     YOU
//                   </span>
//                 )}

//               </div>

//               <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                 <span>{player.level}</span>
//                 <span>•</span>
//                 <span>{player.points.toLocaleString()} pts</span>
//               </div>

//             </div>

//           </div>

//           <div className="flex items-center gap-2">

//             {getChangeIcon(player.change)}

//             {player.change !== 0 && (
//               <span
//                 className={`text-sm ${
//                   player.change > 0 ? "text-secondary" : "text-destructive"
//                 }`}
//               >
//                 {Math.abs(player.change)}
//               </span>
//             )}

//           </div>

//         </div>

//       ))}

//     </div>
//   );

//   return (
//     <div className="space-y-8">

//       {/* HEADER */}

//       <div className="text-center">

//         <h1 className="text-4xl font-bold text-glow mb-4">
//           Leaderboard
//         </h1>

//         <p className="text-muted-foreground text-lg">
//           Compete with cyber warriors around the world
//         </p>

//       </div>


//       {/* CURRENT USER CARD */}

//       {currentUser && (

//         <div className="card-cyber">

//           <div className="text-center py-6">

//             <div className="text-4xl mb-2">
//               {currentUser.avatar}
//             </div>

//             <h2 className="text-2xl font-bold text-glow mb-1">
//               Your Current Rank
//             </h2>

//             <div className="flex items-center justify-center gap-4 text-lg">

//               <span className="text-muted-foreground">
//                 #{currentUser.rank}
//               </span>

//               <span className="text-muted-foreground">•</span>

//               <span className="text-primary font-bold">
//                 {currentUser.points.toLocaleString()} points
//               </span>

//               <span className="text-muted-foreground">•</span>

//               <span className="text-secondary">
//                 {currentUser.level}
//               </span>

//             </div>

//           </div>

//         </div>

//       )}


//       {/* LEADERBOARD */}

//       <Tabs defaultValue="global" className="space-y-6">

//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

//           <TabsList className="grid w-full sm:w-auto grid-cols-3">

//             <TabsTrigger value="global">
//               <Trophy className="h-4 w-4" />
//               Global
//             </TabsTrigger>

//             <TabsTrigger value="weekly">
//               <Calendar className="h-4 w-4" />
//               Weekly
//             </TabsTrigger>

//             <TabsTrigger value="friends">
//               <Users className="h-4 w-4" />
//               Friends
//             </TabsTrigger>

//           </TabsList>


//           <Select value={timeFrame} onValueChange={setTimeFrame}>

//             <SelectTrigger className="w-full sm:w-40">
//               <SelectValue />
//             </SelectTrigger>

//             <SelectContent>

//               <SelectItem value="all-time">
//                 All Time
//               </SelectItem>

//               <SelectItem value="monthly">
//                 This Month
//               </SelectItem>

//               <SelectItem value="weekly">
//                 This Week
//               </SelectItem>

//               <SelectItem value="daily">
//                 Today
//               </SelectItem>

//             </SelectContent>

//           </Select>

//         </div>


//         {/* GLOBAL */}

//         <TabsContent value="global">

//           <div className="card-cyber">

//             <h2 className="text-2xl font-bold text-glow mb-6">
//               Global Champions
//             </h2>

//             <LeaderboardTable
//               data={
//                 currentUser
//                   ? [...globalLeaderboard, currentUser]
//                   : globalLeaderboard
//               }
//             />

//           </div>

//         </TabsContent>


//         {/* WEEKLY */}

//         <TabsContent value="weekly">

//           <div className="card-cyber">

//             <h2 className="text-2xl font-bold text-glow mb-6">
//               This Week's Rising Stars
//             </h2>

//             <LeaderboardTable data={weeklyLeaderboard} />

//           </div>

//         </TabsContent>


//         {/* FRIENDS */}

//         <TabsContent value="friends">

//           <div className="card-cyber text-center py-12">

//             <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />

//             <h3 className="text-xl font-bold text-glow mb-2">
//               No Friends Added Yet
//             </h3>

//             <p className="text-muted-foreground mb-6">
//               Connect with other cyber warriors to compete with friends!
//             </p>

//             <Button className="btn-cyber">
//               Find Friends
//             </Button>

//           </div>

//         </TabsContent>

//       </Tabs>

//     </div>
//   );
// };

// export default LeaderboardPage;



import { useState, useEffect } from "react";
import { Trophy, Medal, Crown, TrendingUp, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";

const LeaderboardPage = () => {

  const [timeFrame, setTimeFrame] = useState("all-time");
  const [globalLeaderboard, setGlobalLeaderboard] = useState([]);
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState([]);

  // API CALL
  const fetchLeaderboard = async () => {
    try {

      const globalRes = await axios.get(
        "http://localhost:5000/api/scores/leaderboard"
      );

      const weeklyRes = await axios.get(
        "http://localhost:5000/api/scores/leaderboard/weekly"
      );

      console.log("GLOBAL DATA", globalRes.data);
      console.log("WEEKLY DATA", weeklyRes.data);

      setGlobalLeaderboard(globalRes.data);
      setWeeklyLeaderboard(weeklyRes.data);

    } catch (error) {
      console.error("Leaderboard fetch error", error);
    }
  };

  // IMPORTANT
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-yellow-400" />;
    if (rank === 2) return <Trophy className="h-6 w-6 text-gray-300" />;
    if (rank === 3) return <Medal className="h-6 w-6 text-amber-600" />;
    return <span className="text-lg font-bold">#{rank}</span>;
  };

  const LeaderboardTable = ({ data }) => (

    <div className="space-y-3">

      {data.length === 0 && (
        <div className="text-center text-gray-400">No Data Found</div>
      )}

      {data.map((player, index) => (

        <div
          key={index}
          className="card-cyber flex items-center justify-between p-4"
        >

          <div className="flex items-center space-x-4">

            <div className="flex items-center justify-center w-12 h-12">
              {getRankIcon(index + 1)}
            </div>

            <div className="text-2xl">
              {player.avatar || "👤"}
            </div>

            <div>

              <div className="font-bold text-white">
                {/* {player.username}
               {player.name || player.username || "Unknown Player"} */}
                {player?.name ?? player?.username ?? "Unknown Player"}
              </div>

              <div className="text-sm text-gray-400">
                 {player?.name ?? player?.username ?? "Unknown Player"}
                Level {player.level} • {player.points} pts
              </div>

            </div>

          </div>

        </div>

      ))}

    </div>

  );

  return (

    <div className="space-y-8">

      <div className="text-center">

        <h1 className="text-4xl font-bold mb-4">
          Leaderboard
        </h1>

        <p className="text-gray-400">
          Compete with cyber warriors around the world
        </p>

      </div>

      <Tabs defaultValue="global" className="space-y-6">

        <TabsList className="grid w-full grid-cols-2">

          <TabsTrigger value="global">
            <Trophy className="h-4 w-4 mr-2" />
            Global
          </TabsTrigger>

          <TabsTrigger value="weekly">
            <Calendar className="h-4 w-4 mr-2" />
            Weekly
          </TabsTrigger>

        </TabsList>

        <TabsContent value="global">

          <div className="card-cyber p-6">

            <h2 className="text-2xl font-bold mb-6">
              Global Champions
            </h2>

            <LeaderboardTable data={globalLeaderboard} />

          </div>

        </TabsContent>

        <TabsContent value="weekly">

          <div className="card-cyber p-6">

            <h2 className="text-2xl font-bold mb-6">
              This Week's Rising Stars
            </h2>

            <LeaderboardTable data={weeklyLeaderboard} />

          </div>

        </TabsContent>

      </Tabs>

    </div>

  );

};

export default LeaderboardPage;