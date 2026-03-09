import React from "react";
import { logoutUser } from "../utils/logout";

const Navbar: React.FC = () => {
  return (
    <nav>
      <h1>CyberQuest</h1>
      <button onClick={logoutUser} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
