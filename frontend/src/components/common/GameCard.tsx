import { Play, Clock, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameCardProps {
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  players: number;
  points: number;
  completed?: boolean;
  onPlay: () => void;
}

const GameCard = ({ 
  title, 
  description, 
  difficulty, 
  duration, 
  players, 
  points, 
  completed = false,
  onPlay 
}: GameCardProps) => {
  const difficultyColors = {
    Beginner: "text-secondary",
    Intermediate: "text-accent",
    Advanced: "text-destructive"
  };

  return (
    <div className="card-cyber group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-glow mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        {completed && (
          <div className="bg-secondary/20 text-secondary px-2 py-1 rounded text-xs font-medium">
            COMPLETED
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4 mb-4 text-sm">
        <div className="flex items-center space-x-1">
          <span className="text-muted-foreground">Difficulty:</span>
          <span className={`font-medium ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
        </div>
        <div className="flex items-center space-x-1 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{duration}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{players} players</span>
          </div>
          <div className="flex items-center space-x-1">
            <Trophy className="h-4 w-4" />
            <span>{points} pts</span>
          </div>
        </div>
      </div>

      <Button 
        onClick={onPlay}
        className="w-full btn-cyber group-hover:shadow-neon-hover"
      >
        <Play className="h-4 w-4 mr-2" />
        {completed ? "Play Again" : "Start Game"}
      </Button>
    </div>
  );
};

export default GameCard;