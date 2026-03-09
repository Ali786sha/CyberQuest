
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../Chat"; // relative path check
import {
  Trophy,
  Target,
  Clock,
  TrendingUp,
  Play,
  Users,
  BookOpen,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/common/StatsCard";
import GameCard from "@/components/common/GameCard";
import { useAuth } from "@/context/AuthContext";

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();   // ✅ navigation added
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    if (user?.name) {
      setStudentName(user.name);
    }
  }, [user]);

  const [showChat, setShowChat] = useState(false);

  const recentGames = [
    {
      title: "Cybersecurity Basics",
      description:
        "Learn fundamental security concepts through interactive challenges",
      difficulty: "Beginner",
      duration: "15 min",
      players: 1247,
      points: 100,
      completed: true,
    },
    {
      title: "Network Defense",
      description:
        "Defend against cyber attacks in this real-time simulation",
      difficulty: "Intermediate",
      duration: "30 min",
      players: 892,
      points: 250,
    },
    {
      title: "Cryptography Challenge",
      description: "Master encryption and decryption techniques",
      difficulty: "Advanced",
      duration: "45 min",
      players: 634,
      points: 400,
    },
  ];

  const achievements = [
    {
      name: "First Steps",
      description: "Complete your first challenge",
      unlocked: true,
    },
    {
      name: "Speed Runner",
      description: "Complete 5 challenges in under 10 minutes",
      unlocked: true,
    },
    {
      name: "Perfect Score",
      description: "Get 100% on any challenge",
      unlocked: false,
    },
    {
      name: "Team Player",
      description: "Complete 3 multiplayer challenges",
      unlocked: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-glow mb-4">
          Welcome, {studentName || "Student"}
        </h1>
        <p className="text-muted-foreground text-lg">
          Ready to level up your cybersecurity skills?
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Challenges Completed"
          value="23"
          change="+3"
          changeType="positive"
          icon={Target}
          description="This week"
        />
        <StatsCard
          title="Study Time"
          value="47h"
          change="+8h"
          changeType="positive"
          icon={Clock}
          description="This month"
        />
        <StatsCard
          title="Rank"
          value="#127"
          change="+15"
          changeType="positive"
          icon={TrendingUp}
          description="Global leaderboard"
        />
        <StatsCard
          title="Achievements"
          value="8"
          change="+1"
          changeType="positive"
          icon={Trophy}
          description="Unlocked"
        />
      </div>

      {/* Continue Learning */}
      <div className="card-cyber">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-glow">
            Continue Learning
          </h2>
        
        </div>
      <Button onClick={() => navigate("/student/chat")}>
       Open Chat
     </Button>
     <Button onClick={() => setShowChat(true)}>
    Chat with AI
    </Button>

      </div>

      {/* Achievements */}
      <div className="card-cyber">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-glow">Achievements</h2>
        
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                achievement.unlocked
                  ? "border-primary/30 bg-primary/5"
                  : "border-muted bg-muted/20"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    achievement.unlocked
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">
                    {achievement.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
{/* Chat Modal */}
{showChat && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-4 w-full max-w-md relative">
      <Button
        className="absolute top-2 right-2"
        onClick={() => setShowChat(false)}
      >
        Close
      </Button>
      <Chat />
    </div>
  </div>
)}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Button
          variant="outline"
          className="btn-neon h-20 text-lg"
          onClick={() => navigate("/student/leaderboard")}
        >
          <Trophy className="h-6 w-6 mr-3" />
          View Leaderboard
        </Button>
      </div>
    </div>
    
  );
};

export default StudentDashboard;
