import { useState, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<PasswordFormData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (): Promise<void> => {
    const { oldPassword, newPassword, confirmPassword } = formData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("All fields are required ❗");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match ❌");
      return;
    }

    try {
      const token = localStorage.getItem("userToken");
        console.log("TOKEN:", token);
      await axios.put(
        "http://localhost:5000/api/users/change-password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Password changed successfully 🎉");

      navigate("/student/profile");

    } catch (error: any) {
      alert(
        error?.response?.data?.message || "Something went wrong ❌"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 card-cyber p-8 space-y-6">
      <h2 className="text-2xl font-bold text-center">Change Password</h2>

      <div>
        <Label htmlFor="oldPassword">Old Password</Label>
        <Input
          id="oldPassword"
          type="password"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <Button className="btn-cyber w-full" onClick={handleSubmit}>
        Update Password
      </Button>
    </div>
  );
};

export default ChangePassword;
