
// import { ReactNode, useState } from "react";
// import { Outlet, useLocation, NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Users,
//   GamepadIcon,
//   BarChart3,
//   Settings,
//   Shield,
//   LogOut,
//   Menu,
//   X
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import AdminNavbar from "../pages/admin/AdminNavbar";
//  // ✅ FIXED PATH

// interface AdminLayoutProps {
//   children?: ReactNode;
// }

// const AdminLayout = ({ children }: AdminLayoutProps) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const location = useLocation();

//   const navigation = [
//     { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
//     { name: "Students", href: "/admin/students", icon: Users },
//     { name: "Challenges", href: "/admin/challenges", icon: GamepadIcon },
//     { name: "Reports", href: "/admin/reports", icon: BarChart3 },
//     { name: "Settings", href: "/admin/settings", icon: Settings },
//     { name: "Logout", href: "/admin/login", icon: Logout },
//   ];

//   const isActive = (path: string) => location.pathname === path;

//   return (
//     <div className="min-h-screen bg-background">
      
//       {/* Sidebar */}
//       <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-sidebar border-r 
//         transform transition-transform duration-300 
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
//         lg:translate-x-0`}
//       >
//         <div className="flex items-center justify-between p-4 border-b">
//           <div className="flex items-center space-x-2">
//             <Shield className="h-6 w-6 text-primary" />
//             <h2 className="text-xl font-bold">ADMIN PANEL</h2>
//           </div>
//           <Button
//             variant="ghost"
//             size="sm"
//             className="lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           >
//             <X className="h-5 w-5" />
//           </Button>
//         </div>

//         <nav className="p-4 space-y-2">
//           {navigation.map((item) => (
//             <NavLink
//               key={item.name}
//               to={item.href}
//               className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
//                 ${isActive(item.href)
//                   ? "bg-primary/20 text-primary"
//                   : "hover:bg-sidebar-accent"
//                 }`}
//             >
//               <item.icon className="h-5 w-5" />
//               <span>{item.name}</span>
//             </NavLink>
//           ))}
//         </nav>

//         <div className="absolute bottom-4 left-4 right-4">
//           <Button
//             variant="ghost"
//             className="w-full justify-start text-destructive"
//             onClick={() => {
//               localStorage.removeItem("token");
//               window.location.href = "/admin/login";
//             }}
//           >
//           </Button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="lg:ml-64">
        
//         <AdminNavbar /> {/* ✅ Navbar properly used */}

//         <header className="border-b p-4">
//           <Button
//             variant="ghost"
//             size="sm"
//             className="lg:hidden"
//             onClick={() => setSidebarOpen(true)}
//           >
//             <Menu className="h-5 w-5" />
//           </Button>
//         </header>

//         <main className="p-6">
//           {children || <Outlet />}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;


import { ReactNode, useState } from "react";
import { Outlet, useLocation, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GamepadIcon,
  BarChart3,
  Settings,
  Shield,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminNavbar from "../pages/admin/AdminNavbar";

interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Students", href: "/admin/students", icon: Users },
    { name: "Challenges", href: "/admin/challenges", icon: GamepadIcon },
    { name: "Reports", href: "/admin/reports", icon: BarChart3 },
    // { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-sidebar border-r 
        transform transition-transform duration-300 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold">ADMIN PANEL</h2>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
                ${
                  isActive(item.href)
                    ? "bg-primary/20 text-primary"
                    : "hover:bg-sidebar-accent"
                }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive flex items-center gap-2"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/admin/login";
            }}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">

        <AdminNavbar />

        <header className="border-b p-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </header>

        <main className="p-6">{children || <Outlet />}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
