
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  role: "admin" | "user";
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("userToken");

  // Admin route protection
  if (role === "admin") {
    if (!adminToken) {
      return <Navigate to="/admin/login" replace />;
    }
  }

  // User route protection
  if (role === "user") {
    if (!userToken) {
      return <Navigate to="/auth/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
