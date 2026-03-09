
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./routes/ProtectedRoute";

// import AdminRegisterPage from "./pages/admin/AdminRegisterPage";
// import AdminLoginPage from "./pages/admin/AdminLoginPage";
// import Chat from "./pages/Chat";
// // frontend\src\pages\Chat.jsx
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";

// // Auth Pages
// import LoginPage from "./pages/auth/LoginPage";
// import RegisterPage from "./pages/auth/RegisterPage";
// import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// // Student Pages
// import StudentLayout from "./layouts/StudentLayout";
// import StudentDashboard from "./pages/student/StudentDashboard";
// import GameSelectionPage from "./pages/student/GameSelectionPage";
// import GamePlayPage from "./pages/student/GamePlayPage";
// import LeaderboardPage from "./pages/student/LeaderboardPage";
// import ProfilePage from "./pages/student/ProfilePage";
// import ChangePassword from "./pages/ChangePassword";

// // Admin Pages
// import AdminLayout from "./layouts/AdminLayout";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import ManageChallengesPage from "./pages/admin/ManageChallengesPage";
// import StudentReportsPage from "./pages/admin/StudentReportsPage";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <AuthProvider>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <Routes>

//             {/* Landing */}
//             <Route path="/" element={<Index />} />

//             {/* Admin Auth */}
//             <Route path="/admin/register" element={<AdminRegisterPage />} />
//             <Route path="/admin/login" element={<AdminLoginPage />} />

//             {/* User Auth */}
//             <Route path="/auth/login" element={<LoginPage />} />
//             <Route path="/auth/register" element={<RegisterPage />} />
//             <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />


//             {/* Student Protected Routes */}
//             <Route
//               path="/student"
//               element={
//                 <ProtectedRoute role="user">
//                   <StudentLayout />
//                 </ProtectedRoute>
//               }
//             >
//               <Route path="dashboard" element={<StudentDashboard />} />
//               <Route path="games" element={<GameSelectionPage />} />
//               <Route path="games/:gameId" element={<GamePlayPage />} />
//               <Route path="leaderboard" element={<LeaderboardPage />} />
//               <Route path="profile" element={<ProfilePage />} />
//               <Route path="change-password" element={<ChangePassword />} />
//               <Route path="chat" element={<Chat />} />

//             </Route>

//             {/* Admin Protected Routes */}
//             <Route
//               path="/admin"
//               element={
//                 <ProtectedRoute role="admin">
//                   <AdminLayout />
//                 </ProtectedRoute>
//               }
//             >
//               <Route path="dashboard" element={<AdminDashboard />} />
//               <Route path="challenges" element={<ManageChallengesPage />} />
//               <Route path="students" element={<StudentReportsPage />} />
//               <Route path="reports" element={<StudentReportsPage />} />
//             </Route>

//             {/* 404 */}
//             <Route path="*" element={<NotFound />} />

//           </Routes>
//         </BrowserRouter>
//       </TooltipProvider>
//     </AuthProvider>
//   </QueryClientProvider>
// );

// export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// Landing & Common Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import ChangePassword from "./pages/ChangePassword";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// Admin Auth
import AdminRegisterPage from "./pages/admin/AdminRegisterPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";

// Student Pages
import StudentLayout from "./layouts/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import GameSelectionPage from "./pages/student/GameSelectionPage";
import GamePlayPage from "./pages/student/GamePlayPage";
import LeaderboardPage from "./pages/student/LeaderboardPage";
import ProfilePage from "./pages/student/ProfilePage";

// Admin Pages
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageChallengesPage from "./pages/admin/ManageChallengesPage";
import StudentReportsPage from "./pages/admin/StudentReportsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>

            {/* Landing */}
            <Route path="/" element={<Index />} />

            {/* Admin Auth */}
            <Route path="/admin/register" element={<AdminRegisterPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* User Auth */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

            {/* Student Protected Routes */}
            <Route
              path="/student"
              element={
                <ProtectedRoute role="user">
                  <StudentLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="games" element={<GameSelectionPage />} />
              <Route path="games/:gameId" element={<GamePlayPage />} />
              <Route path="leaderboard" element={<LeaderboardPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="chat" element={<Chat />} />
            </Route>

            {/* Admin Protected Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="challenges" element={<ManageChallengesPage />} />
              <Route path="students" element={<StudentReportsPage />} />
              <Route path="reports" element={<StudentReportsPage />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;