import { Link } from "react-router-dom";
import { Play, Users, Trophy, Shield, ArrowRight, Zap, Target, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Adaptive challenges that evolve with your skill level"
    },
    {
      icon: Shield,
      title: "Real-World Scenarios",
      description: "Practice with authentic cybersecurity challenges"
    },
    {
      icon: Users,
      title: "Competitive Learning",
      description: "Compete with peers and climb the leaderboards"
    },
    {
      icon: Target,
      title: "Skill Tracking",
      description: "Monitor your progress across all security domains"
    }
  ];

  return (
    <div className="min-h-screen bg-background grid-lines">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold mb-6">
              <span className="text-neon pulse-neon">CYBER</span>{" "}
              <span className="text-glow">LEARN</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Master cybersecurity through immersive gaming experiences. 
              Level up your skills, compete with peers, and become a cyber defense expert.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/auth/register">
                <Button className="btn-cyber text-lg px-8 py-4 w-full sm:w-auto">
                  <Play className="h-5 w-5 mr-2" />
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/auth/login">
                <Button variant="outline" className="btn-neon text-lg px-8 py-4 w-full sm:w-auto">
                  <Zap className="h-5 w-5 mr-2" />
                  Access Terminal
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="card-cyber text-center p-6">
                <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                <div className="text-muted-foreground">Active Learners</div>
              </div>
              <div className="card-cyber text-center p-6">
                <div className="text-3xl font-bold text-secondary mb-2">50+</div>
                <div className="text-muted-foreground">Cyber Challenges</div>
              </div>
              <div className="card-cyber text-center p-6">
                <div className="text-3xl font-bold text-accent mb-2">95%</div>
                <div className="text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-glow mb-4">
              Why Choose Cyber Learn?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of cybersecurity education through gamified learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-cyber text-center p-6 hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-glow mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-glow mb-6">
              Ready to Become a Cyber Warrior?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of students mastering cybersecurity through interactive challenges and real-world simulations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button className="btn-cyber text-lg px-8 py-4 w-full sm:w-auto">
                  Create Free Account
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/student/games">
                <Button variant="outline" className="btn-neon text-lg px-8 py-4 w-full sm:w-auto">
                  <Trophy className="h-5 w-5 mr-2" />
                  Explore Challenges
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="text-2xl font-bold text-neon mb-4">CYBER LEARN</div>
          <p className="text-muted-foreground mb-6">
            Empowering the next generation of cybersecurity professionals
          </p>
          <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
            <Link to="/auth/login" className="hover:text-primary transition-colors">
              Student Portal
            </Link>
            <Link to="/auth/login" className="hover:text-primary transition-colors">
              Admin Panel
            </Link>
            <a href="#" className="hover:text-primary transition-colors">
              Support
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Documentation
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
