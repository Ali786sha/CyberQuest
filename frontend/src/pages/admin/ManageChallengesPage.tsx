import { useState } from "react";
import { Plus, Search, Filter, Edit, Trash2, Eye, Copy, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ManageChallengesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const challenges = [
    {
      id: 1,
      title: "Cybersecurity Fundamentals",
      category: "Security",
      difficulty: "Beginner",
      status: "published",
      completionRate: 87,
      totalAttempts: 1247,
      avgScore: 82,
      lastUpdated: "2024-03-15",
      description: "Introduction to basic cybersecurity concepts and practices"
    },
    {
      id: 2,
      title: "Advanced Network Defense",
      category: "Network",
      difficulty: "Advanced",
      status: "published",
      completionRate: 64,
      totalAttempts: 423,
      avgScore: 75,
      lastUpdated: "2024-03-10",
      description: "Complex network security scenarios and defense strategies"
    },
    {
      id: 3,
      title: "Cryptography Challenge",
      category: "Cryptography",
      difficulty: "Intermediate",
      status: "review",
      completionRate: 0,
      totalAttempts: 0,
      avgScore: 0,
      lastUpdated: "2024-03-18",
      description: "Hands-on cryptographic protocols and implementation"
    },
    {
      id: 4,
      title: "Social Engineering Awareness",
      category: "Awareness",
      difficulty: "Beginner",
      status: "draft",
      completionRate: 0,
      totalAttempts: 0,
      avgScore: 0,
      lastUpdated: "2024-03-20",
      description: "Identifying and preventing social engineering attacks"
    },
    {
      id: 5,
      title: "Incident Response Simulation",
      category: "Response",
      difficulty: "Advanced",
      status: "published",
      completionRate: 71,
      totalAttempts: 289,
      avgScore: 79,
      lastUpdated: "2024-03-08",
      description: "Real-world incident response scenarios and procedures"
    }
  ];

  const categories = ["all", "Security", "Network", "Cryptography", "Awareness", "Response"];
  const statuses = ["all", "published", "review", "draft"];
  const difficulties = ["all", "Beginner", "Intermediate", "Advanced"];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { variant: "default" as const, color: "bg-secondary text-secondary-foreground" },
      review: { variant: "secondary" as const, color: "bg-accent text-accent-foreground" },
      draft: { variant: "outline" as const, color: "bg-muted text-muted-foreground" }
    };
    
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-secondary";
      case "Intermediate": return "text-accent";
      case "Advanced": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || challenge.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || challenge.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-glow mb-2">Manage Challenges</h1>
          <p className="text-muted-foreground">Create and manage cybersecurity challenges</p>
        </div>
        <div className="flex gap-2">
          <Button className="btn-cyber">
            <Plus className="h-4 w-4 mr-2" />
            Create Challenge
          </Button>
          <Button variant="outline" className="btn-neon">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="card-cyber">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search challenges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status === "all" ? "All Statuses" : status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Challenges Table */}
      <div className="card-cyber overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-semibold text-glow">Challenge</th>
                <th className="text-left p-4 font-semibold text-glow">Category</th>
                <th className="text-left p-4 font-semibold text-glow">Status</th>
                <th className="text-left p-4 font-semibold text-glow">Performance</th>
                <th className="text-left p-4 font-semibold text-glow">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredChallenges.map((challenge) => (
                <tr key={challenge.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                  <td className="p-4">
                    <div>
                      <h3 className="font-semibold text-glow mb-1">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {challenge.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className={`font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">
                          Updated {challenge.lastUpdated}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className="text-primary border-primary/30">
                      {challenge.category}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge className={getStatusBadge(challenge.status).color}>
                      {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="p-4">
                    {challenge.status === "published" ? (
                      <div className="text-sm">
                        <div className="text-glow font-medium">
                          {challenge.completionRate}% completion
                        </div>
                        <div className="text-muted-foreground">
                          {challenge.totalAttempts} attempts, {challenge.avgScore}% avg score
                        </div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">Not published</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredChallenges.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No challenges found matching your criteria.
          </p>
          <Button 
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedStatus("all");
            }}
            className="btn-neon mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-cyber text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            {challenges.filter(c => c.status === "published").length}
          </div>
          <div className="text-sm text-muted-foreground">Published</div>
        </div>
        <div className="card-cyber text-center">
          <div className="text-3xl font-bold text-accent mb-2">
            {challenges.filter(c => c.status === "review").length}
          </div>
          <div className="text-sm text-muted-foreground">In Review</div>
        </div>
        <div className="card-cyber text-center">
          <div className="text-3xl font-bold text-muted-foreground mb-2">
            {challenges.filter(c => c.status === "draft").length}
          </div>
          <div className="text-sm text-muted-foreground">Drafts</div>
        </div>
        <div className="card-cyber text-center">
          <div className="text-3xl font-bold text-secondary mb-2">
            {Math.round(challenges.filter(c => c.status === "published").reduce((acc, c) => acc + c.completionRate, 0) / challenges.filter(c => c.status === "published").length)}%
          </div>
          <div className="text-sm text-muted-foreground">Avg Completion</div>
        </div>
      </div>
    </div>
  );
};

export default ManageChallengesPage;