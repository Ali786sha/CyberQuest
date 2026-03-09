
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (userData: User, jwtToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load from localStorage when app starts
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedAdminToken = localStorage.getItem("adminToken");
      const storedUserToken = localStorage.getItem("userToken");

      if (storedUser && (storedAdminToken || storedUserToken)) {
        setUser(JSON.parse(storedUser));
        setToken(storedAdminToken || storedUserToken);
      }
    } catch (error) {
      console.error("Failed to load auth data:", error);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData: User, jwtToken: string) => {
    setUser(userData);
    setToken(jwtToken);

    localStorage.setItem("user", JSON.stringify(userData));

    // Role based token save
    if (userData.role === "admin") {
      localStorage.setItem("adminToken", jwtToken);
    } else {
      localStorage.setItem("userToken", jwtToken);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userToken");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
