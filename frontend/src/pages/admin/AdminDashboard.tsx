
import { useEffect, useState } from "react";
import axios from "axios";
import { logoutUser } from "../../utils/logout";
import {
  Users,
  GamepadIcon,
  TrendingUp,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/common/StatsCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const AdminDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        "http://localhost:5000/api/admin/students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTotalStudents(res.data.totalStudents);
      setStudents(res.data.students);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (e: any) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("adminToken"); // JWT token

    await axios.post(
      "http://localhost:5000/api/admin/create",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // token header
        },
      }
    );

    alert("Student added successfully");

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });

    setShowForm(false);
    fetchStudents();
  } catch (error: any) {
    console.log(error.response);
    alert(error.response?.data?.message || "Error adding student");
  }
};

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("adminToken");

      await axios.delete(
        `http://localhost:5000/api/admin/students/${id}`,
        {
          headers: {
             Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      fetchStudents();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          System overview and management center
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value={totalStudents}
          icon={Users}
          description="From database"
        />
        <StatsCard
          title="Active Challenges"
          value="34"
          icon={GamepadIcon}
        />
        <StatsCard
          title="Completion Rate"
          value="87%"
          icon={TrendingUp}
        />
        <StatsCard
          title="System Health"
          value="Excellent"
          icon={Activity}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">

        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview">
          <div className="card-cyber p-6">
            <h2 className="text-2xl font-bold mb-4">
              Welcome Admin 👋
            </h2>
            <p>
              Total Registered Students:{" "}
              <strong>{totalStudents}</strong>
            </p>
          </div>
        </TabsContent>

        {/* Students */}
        <TabsContent value="students">
          <div className="card-cyber p-6">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Student Management
              </h2>

              <Button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Close" : "Add Student"}
              </Button>
            </div>

            {showForm && (
              <form
                onSubmit={handleAddStudent}
                className="space-y-4 mb-6"
              >
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded bg-black text-white placeholder-gray-400"
                />

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded bg-black text-white placeholder-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded bg-black text-white placeholder-gray-400"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded bg-black text-white placeholder-gray-400"
                />

                <Button type="submit">
                  Create Student
                </Button>
              </form>
            )}

            {loading ? (
              <p>Loading students...</p>
            ) : students.length === 0 ? (
              <p className="text-muted-foreground">
                No students found.
              </p>
            ) : (
              <div className="space-y-4">
                {students.map((student) => (
                  <div
                    key={student._id}
                    className="p-4 border border-border rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">
                        {student.firstName} {student.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {student.email}
                      </p>
                    </div>

                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(student._id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}

          </div>
        </TabsContent>

        {/* Challenges */}
        <TabsContent value="challenges">
          <div className="card-cyber p-6">
            <h2 className="text-2xl font-bold">
              Challenge Management
            </h2>
          </div>
        </TabsContent>

        {/* System */}
        <TabsContent value="system">
          <div className="card-cyber p-6">
            <h2 className="text-2xl font-bold">
              System Overview
            </h2>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default AdminDashboard;