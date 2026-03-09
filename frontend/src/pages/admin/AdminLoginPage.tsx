
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const AdminLoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password }
      );

      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-grid-small-white/[0.2]">
      <Card className="w-[450px] bg-zinc-900 text-white border-zinc-800 shadow-xl rounded-2xl">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Admin Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button className="w-full bg-green-500 hover:bg-green-600">
              Login
            </Button>
          </form>

          {/* Create Account Link */}
          <p className="text-center text-sm text-gray-400 mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/admin/register")}
              className="text-green-400 cursor-pointer hover:underline"
            >
              Create Account
            </span>
          </p>

        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
