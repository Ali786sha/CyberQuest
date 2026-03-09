import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const AdminRegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/admin/register",
        formData
      );

      alert("Admin Registered Successfully");
      navigate("/admin/login");
    } catch (error: any) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-grid-small-white/[0.2]">
      <Card className="w-[450px] bg-zinc-900 text-white border-zinc-800 shadow-xl rounded-2xl">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Admin Register
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label>First Name</Label>
              <Input name="firstName" onChange={handleChange} required />
            </div>

            <div>
              <Label>Last Name</Label>
              <Input name="lastName" onChange={handleChange} required />
            </div>

            <div>
              <Label>Email</Label>
              <Input type="email" name="email" onChange={handleChange} required />
            </div>

            <div>
              <Label>Password</Label>
              <Input type="password" name="password" onChange={handleChange} required />
            </div>

            <Button className="w-full bg-green-500 hover:bg-green-600">
              Create Admin Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRegisterPage;