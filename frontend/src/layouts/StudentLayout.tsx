
import { ReactNode, useState, useEffect } from "react";
import { Outlet, useLocation, NavLink, useNavigate } from "react-router-dom";
import { 
  Home, 
  Gamepad2, 
  Trophy, 
  User, 
  MessageCircle,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AIMentor from "@/components/common/AIMentor";

interface StudentLayoutProps {
  children?: ReactNode;
}

const StudentLayout = ({ children }: StudentLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [studentName, setStudentName] = useState("Student"); // default
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: "Dashboard", href: "/student/dashboard", icon: Home },
    { name: "Games", href: "/student/games", icon: Gamepad2 },
    { name: "Leaderboard", href: "/student/leaderboard", icon: Trophy },
    { name: "Profile", href: "/student/profile", icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Fetch logged-in user name from localStorage (or wherever you store it)
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.name) setStudentName(user.name);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-sidebar border-r border-sidebar-border
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <h2 className="text-xl font-bold text-neon">CYBER LEARN</h2>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={`
                flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
                ${isActive(item.href) 
                  ? 'bg-primary/20 text-primary border border-primary/30' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-primary'
                }
              `}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-destructive"
            onClick={() => navigate("/auth/login")} // Logout click → login page
          >
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Welcome back,</p>
              <p className="font-semibold text-glow">{studentName}</p>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children || <Outlet />}
        </main>
      </div>

      {/* AI Mentor Widget */}
      <AIMentor/>
    </div>
  );
};

export default StudentLayout;