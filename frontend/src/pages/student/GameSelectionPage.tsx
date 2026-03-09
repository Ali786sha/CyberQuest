import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GameCard from "@/components/common/GameCard";

const GameSelectionPage = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
       const games = [
  {
    id: "password-guessing",
    title: "Password Guessing Challenge",
    description: "Test your password skills.",
    difficulty: "Advanced" as const,
    duration: "20 min",
    players: 1248,
    points: 160,
    category: "Security",
  },

   {
    id: "password-fortress",
    title: "Password Fortress",
    description: "Test your password skills.",
    difficulty: "Beginner" as const,
    duration: "20 min",
    players: 1247,
    points: 150,
    category: "Security",
  },

   {
    id: "email",
      title: "Ethical Hacking Challenge",
      description:
        "Detect phishing emails and protect the system",
      difficulty: "Advanced" as const,
      duration: "60 min",
      players: 423,
      points: 600,
      category: "Hacking",
    },
       {
         id: "chat",
      title: "Social Engineering Awareness",
      description:
        "Learn to identify and prevent social engineering attacks.",
      difficulty: "Advanced" as const,
      duration: "15 min",
      players: 2156,
      points: 100,
      category: "Awareness",
    },
      {
         id: "cyberdetective",
      title: "cyberdetective",
      description:
        "Deep dive into encryption algorithms and cryptographic protocols.",
      difficulty: "Intermediate" as const,
      duration: "50 min",
      players: 634,
      points: 500,
      category: "Network",
    },
];

  const categories = [
    "all",
    "Security",
    "Network",
    "Awareness",
    "Hacking",
  ];

  const difficulties = ["all", "Beginner", "Intermediate", "Advanced"];

  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || game.category === selectedCategory;

    const matchesDifficulty =
      selectedDifficulty === "all" ||
      game.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-glow mb-4">
          Game Selection
        </h1>
        <p className="text-muted-foreground text-lg">
          Choose your next cybersecurity challenge
        </p>
      </div>

      {/* Filters */}
      <div className="card-cyber">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all"
                      ? "All Categories"
                      : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedDifficulty}
              onValueChange={setSelectedDifficulty}
            >
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty === "all"
                      ? "All Levels"
                      : difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>

            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {filteredGames.map((game, index) => (
          <GameCard
            key={index}
            title={game.title}
            description={game.description}
            difficulty={game.difficulty}
            duration={game.duration}
            players={game.players}
            points={game.points}
            // onPlay={() => navigate("/game")}
            // onPlay={() => navigate("/game/password-fortress")}
            onPlay={() => navigate(`/student/games/${game.id}`)}
          />
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No games found matching your criteria.
          </p>
          <Button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedDifficulty("all");
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameSelectionPage;
