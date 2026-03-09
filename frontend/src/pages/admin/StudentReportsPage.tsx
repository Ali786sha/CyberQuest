import { useState } from "react";
import { Search, Download, Filter, TrendingUp, Users, Clock, Trophy, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import StatsCard from "@/components/common/StatsCard";

const StudentReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");
  const [selectedCohort, setSelectedCohort] = useState("all");

  const studentData = [
    {
      id: 1,
      name: "Sarah Kim",
      email: "sarah.kim@student.edu",
      joinDate: "Feb 2024",
      totalPoints: 3240,
      challengesCompleted: 45,
      averageScore: 94,
      studyTime: 67,
      lastActive: "2 hours ago",
      strongestArea: "Cryptography",
      weakestArea: "Network Defense",
      progress: 78
    },
    {
      id: 2,
      name: "Mike Johnson", 
      email: "mike.johnson@student.edu",
      joinDate: "Jan 2024",
      totalPoints: 2980,
      challengesCompleted: 38,
      averageScore: 89,
      studyTime: 52,
      lastActive: "1 day ago",
      strongestArea: "Network Security",
      weakestArea: "Social Engineering",
      progress: 71
    },
    {
      id: 3,
      name: "Alex Chen",
      email: "alex.chen@student.edu", 
      joinDate: "Mar 2024",
      totalPoints: 2847,
      challengesCompleted: 23,
      averageScore: 85,
      studyTime: 34,
      lastActive: "3 hours ago",
      strongestArea: "Incident Response",
      weakestArea: "Advanced Cryptography",
      progress: 45
    },
    {
      id: 4,
      name: "Lisa Zhang",
      email: "lisa.zhang@student.edu",
      joinDate: "Feb 2024", 
      totalPoints: 2650,
      challengesCompleted: 31,
      averageScore: 87,
      studyTime: 43,
      lastActive: "5 hours ago",
      strongestArea: "Web Security",
      weakestArea: "Malware Analysis",
      progress: 62
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@student.edu",
      joinDate: "Jan 2024",
      totalPoints: 2420,
      challengesCompleted: 28,
      averageScore: 82,
      studyTime: 39,
      lastActive: "1 day ago",
      strongestArea: "Forensics",
      weakestArea: "Penetration Testing",
      progress: 58
    }
  ];

  const cohortStats = {
    totalStudents: 1247,
    activeThisWeek: 892,
    averageScore: 84,
    totalStudyHours: 15420
  };

  const topChallenges = [
    { name: "Cybersecurity Fundamentals", completionRate: 87, avgScore: 82 },
    { name: "Network Defense", completionRate: 74, avgScore: 79 },
    { name: "Cryptography Basics", completionRate: 69, avgScore: 85 },
    { name: "Social Engineering", completionRate: 91, avgScore: 88 },
    { name: "Incident Response", completionRate: 64, avgScore: 76 }
  ];

  const filteredStudents = studentData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-secondary";
    if (score >= 80) return "text-accent";
    if (score >= 70) return "text-primary";
    return "text-destructive";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-glow mb-2">Student Reports</h1>
          <p className="text-muted-foreground">Comprehensive student performance analytics</p>
        </div>
        <div className="flex gap-2">
          <Button className="btn-cyber">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" className="btn-neon">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value={cohortStats.totalStudents.toLocaleString()}
          change="+23"
          changeType="positive"
          icon={Users}
          description="Enrolled"
        />
        <StatsCard
          title="Active Students"
          value={cohortStats.activeThisWeek.toLocaleString()}
          change="+15%"
          changeType="positive"
          icon={TrendingUp}
          description="This week"
        />
        <StatsCard
          title="Average Score"
          value={`${cohortStats.averageScore}%`}
          change="+3%"
          changeType="positive"
          icon={Trophy}
          description="All challenges"
        />
        <StatsCard
          title="Study Hours"
          value={`${(cohortStats.totalStudyHours / 1000).toFixed(1)}k`}
          change="+8%"
          changeType="positive"
          icon={Clock}
          description="This month"
        />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="students" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="students">Individual Students</TabsTrigger>
          <TabsTrigger value="challenges">Challenge Performance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-6">
          {/* Filters */}
          <div className="card-cyber">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative flex-1 sm:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedCohort} onValueChange={setSelectedCohort}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cohorts</SelectItem>
                    <SelectItem value="2024-spring">Spring 2024</SelectItem>
                    <SelectItem value="2024-winter">Winter 2024</SelectItem>
                    <SelectItem value="2023-fall">Fall 2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Student Table */}
          <div className="card-cyber overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold text-glow">Student</th>
                    <th className="text-left p-4 font-semibold text-glow">Performance</th>
                    <th className="text-left p-4 font-semibold text-glow">Progress</th>
                    <th className="text-left p-4 font-semibold text-glow">Strengths/Weaknesses</th>
                    <th className="text-left p-4 font-semibold text-glow">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                      <td className="p-4">
                        <div>
                          <h3 className="font-semibold text-glow mb-1">{student.name}</h3>
                          <p className="text-sm text-muted-foreground mb-1">{student.email}</p>
                          <div className="text-xs text-muted-foreground">
                            Joined {student.joinDate} • Last active {student.lastActive}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-primary font-bold">{student.totalPoints}</span>
                            <span className="text-xs text-muted-foreground">points</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${getScoreColor(student.averageScore)}`}>
                              {student.averageScore}%
                            </span>
                            <span className="text-xs text-muted-foreground">avg score</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {student.challengesCompleted} challenges • {student.studyTime}h study time
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Overall</span>
                            <span className="font-medium">{student.progress}%</span>
                          </div>
                          <Progress value={student.progress} className="h-2" />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="text-secondary font-medium">+</span>
                            <span className="text-sm text-muted-foreground ml-1">{student.strongestArea}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-destructive font-medium">-</span>
                            <span className="text-sm text-muted-foreground ml-1">{student.weakestArea}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <div className="card-cyber">
            <h2 className="text-2xl font-bold text-glow mb-6">Challenge Performance Overview</h2>
            
            <div className="space-y-4">
              {topChallenges.map((challenge, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-glow mb-2">{challenge.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Completion: {challenge.completionRate}%</span>
                      <span>•</span>
                      <span className={getScoreColor(challenge.avgScore)}>
                        Average Score: {challenge.avgScore}%
                      </span>
                    </div>
                  </div>
                  <div className="w-32">
                    <Progress value={challenge.completionRate} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-cyber">
              <h3 className="text-xl font-bold text-glow mb-4">Engagement Trends</h3>
              <div className="text-center py-8">
                <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Engagement analytics visualization would go here</p>
              </div>
            </div>
            
            <div className="card-cyber">
              <h3 className="text-xl font-bold text-glow mb-4">Performance Distribution</h3>
              <div className="text-center py-8">
                <Trophy className="h-16 w-16 text-accent mx-auto mb-4" />
                <p className="text-muted-foreground">Performance distribution chart would go here</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentReportsPage;