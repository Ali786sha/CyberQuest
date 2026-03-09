import React from "react";
import { logoutUser } from "../../utils/logout";

const AdminNavbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
    </nav>
  );
};

export default AdminNavbar;
