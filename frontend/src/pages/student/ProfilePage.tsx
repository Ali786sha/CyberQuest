
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   Mail,
//   Calendar,
//   Trophy,
//   Target,
//   Clock,
//   Award,
//   Edit3,
//   Settings,
//   Shield
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import StatsCard from "@/components/common/StatsCard";

// const ProfilePage = () => {
//   const navigate = useNavigate();

//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     username: "",
//     bio: "",
//     createdAt: ""
//   });

//   // ================= FETCH PROFILE =================
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("userToken");

//         const res = await axios.get(
//           "http://localhost:5000/api/users/profile",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const user = res.data;

//         setProfileData({
//           firstName: user.name?.split(" ")[0] || "",
//           lastName: user.name?.split(" ")[1] || "",
//           email: user.email || "",
//           username: user.username || "",
//           bio: user.bio || "",
//           createdAt: user.createdAt || ""
//         });

//         setLoading(false);
//       } catch (error) {
//         console.error("Profile fetch error:", error);
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // ================= VALIDATION =================
//   const validateFields = () => {
//     if (
//       !profileData.firstName ||
//       !profileData.lastName ||
//       !profileData.email ||
//       !profileData.bio
//     ) {
//       alert("All fields are required ❗");
//       return false;
//     }
//     return true;
//   };

//   // ================= UPDATE PROFILE =================
//   const handleSave = async () => {
//     if (!validateFields()) return;

//     try {
//       const token = localStorage.getItem("token");

//       const updatedData = {
//         name: `${profileData.firstName} ${profileData.lastName}`,
//         email: profileData.email,
//         bio: profileData.bio,
//       };

//       const res = await axios.put(
//         "http://localhost:5000/api/users/profile",
//         updatedData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const user = res.data.user;

//       setProfileData({
//         firstName: user.name?.split(" ")[0] || "",
//         lastName: user.name?.split(" ")[1] || "",
//         email: user.email,
//         username: user.username || "",
//         bio: user.bio,
//         createdAt: user.createdAt
//       });

//       setIsEditing(false);
//       alert("Profile updated successfully 🎉");
//     } catch (error) {
//       console.error("Update error:", error);
//       alert("Update failed ❌");
//     }
//   };

//   if (loading) {
//     return <div className="text-center mt-10">Loading profile...</div>;
//   }

//   return (
//     <div className="space-y-8">
//       <div className="card-cyber">
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary 
//           rounded-full flex items-center justify-center text-xl font-bold text-primary-foreground">
//             {profileData.firstName} {profileData.lastName}
//           </div>

//           <div className="flex-1">
//             <div className="flex items-start justify-between mb-4">
//               <div>
//                 <h1 className="text-3xl font-bold text-glow mb-2">
//                   {profileData.firstName} {profileData.lastName}
//                 </h1>

//                 <p className="text-muted-foreground">
//                   {profileData.bio}
//                 </p>
//               </div>

//               <Button
//                 onClick={() => setIsEditing(!isEditing)}
//                 variant="outline"
//                 className="btn-neon"
//               >
//                 <Edit3 className="h-4 w-4 mr-2" />
//                 {isEditing ? "Cancel" : "Edit Profile"}
//               </Button>
//             </div>

//             <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
//               <div className="flex items-center gap-1">
//                 <Mail className="h-4 w-4" />
//                 {profileData.email}
//               </div>

//               <div className="flex items-center gap-1">
//                 <Calendar className="h-4 w-4" />
//                 Joined {profileData.createdAt
//                   ? new Date(profileData.createdAt).toLocaleDateString()
//                   : "N/A"}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Tabs defaultValue="settings">
//         <TabsList className="grid w-full grid-cols-1">
//           <TabsTrigger value="settings">Settings</TabsTrigger>
//         </TabsList>

//         <TabsContent value="settings">
//           <div className="card-cyber space-y-6">

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label>First Name *</Label>
//                 <Input
//                   value={profileData.firstName}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, firstName: e.target.value })
//                   }
//                   disabled={!isEditing}
//                 />
//               </div>

//               <div>
//                 <Label>Last Name *</Label>
//                 <Input
//                   value={profileData.lastName}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, lastName: e.target.value })
//                   }
//                   disabled={!isEditing}
//                 />
//               </div>
//             </div>

//             <div>
//               <Label>Email *</Label>
//               <Input
//                 value={profileData.email}
//                 onChange={(e) =>
//                   setProfileData({ ...profileData, email: e.target.value })
//                 }
//                 disabled={!isEditing}
//               />
//             </div>

//             <div>
//               <Label>Bio *</Label>
//               <Input
//                 value={profileData.bio}
//                 onChange={(e) =>
//                   setProfileData({ ...profileData, bio: e.target.value })
//                 }
//                 disabled={!isEditing}
//               />
//             </div>

//             {isEditing && (
//               <Button className="btn-cyber" onClick={handleSave}>
//                 Save Changes
//               </Button>
//             )}
//           </div>

//           <div className="card-cyber mt-6">
//             <h2 className="text-xl font-bold mb-4">Privacy & Security</h2>

//             <Button
//               variant="outline"
//               className="w-full justify-start btn-neon"
//               onClick={() => navigate("/student/change-password")}
//             >
//               <Shield className="h-4 w-4 mr-3" />
//               Change Password
//             </Button>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default ProfilePage;

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Calendar, Edit3, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    bio: "",
    createdAt: ""
  });

  // ================= FETCH PROFILE =================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("userToken");

        const res = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = res.data;

        setProfileData({
          firstName: user.name?.split(" ")[0] || "",
          lastName: user.name?.split(" ")[1] || "",
          email: user.email || "",
          username: user.username || "",
          bio: user.bio || "",
          createdAt: user.createdAt || ""
        });

        setLoading(false);
      } catch (error) {
        console.error("Profile fetch error:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ================= VALIDATION =================
  const validateFields = () => {
    if (
      !profileData.firstName ||
      !profileData.lastName ||
      !profileData.email ||
      !profileData.bio
    ) {
      alert("All fields are required ❗");
      return false;
    }
    return true;
  };

  // ================= UPDATE PROFILE =================
  const handleSave = async () => {
    if (!validateFields()) return;

    try {
      const token = localStorage.getItem("token");

      const updatedData = {
        name: `${profileData.firstName} ${profileData.lastName}`,
        email: profileData.email,
        bio: profileData.bio,
      };

      const res = await axios.put(
        "http://localhost:5000/api/users/profile",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = res.data.user;

      setProfileData({
        firstName: user.name?.split(" ")[0] || "",
        lastName: user.name?.split(" ")[1] || "",
        email: user.email,
        username: user.username || "",
        bio: user.bio,
        createdAt: user.createdAt
      });

      setIsEditing(false);
      alert("Profile updated successfully 🎉");
    } catch (error) {
      console.error("Update error:", error);
      alert("Update failed ❌");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="card-cyber">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary 
          rounded-full flex items-center justify-center text-xl font-bold text-primary-foreground">
            {profileData.firstName} {profileData.lastName}
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-glow mb-2">
                  {profileData.firstName} {profileData.lastName}
                </h1>

                <p className="text-muted-foreground">
                  {profileData.bio}
                </p>
              </div>

              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="btn-neon"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {profileData.email}
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Joined {profileData.createdAt
                  ? new Date(profileData.createdAt).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Edit Fields */}
      <div className="card-cyber space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>First Name *</Label>
            <Input
              value={profileData.firstName}
              onChange={(e) =>
                setProfileData({ ...profileData, firstName: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>

          <div>
            <Label>Last Name *</Label>
            <Input
              value={profileData.lastName}
              onChange={(e) =>
                setProfileData({ ...profileData, lastName: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>
        </div>

        <div>
          <Label>Email *</Label>
          <Input
            value={profileData.email}
            onChange={(e) =>
              setProfileData({ ...profileData, email: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>

        <div>
          <Label>Bio *</Label>
          <Input
            value={profileData.bio}
            onChange={(e) =>
              setProfileData({ ...profileData, bio: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>

        {isEditing && (
          <Button className="btn-cyber" onClick={handleSave}>
            Save Changes
          </Button>
        )}
      </div>

      {/* Privacy & Security */}
      <div className="card-cyber mt-6">
        <h2 className="text-xl font-bold mb-4">Privacy & Security</h2>

        <Button
          variant="outline"
          className="w-full justify-start btn-neon"
          onClick={() => navigate("/student/change-password")}
        >
          <Shield className="h-4 w-4 mr-3" />
          Change Password
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;