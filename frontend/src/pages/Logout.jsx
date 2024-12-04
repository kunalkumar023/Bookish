import React from "react";
// Replace with your actual Redux slice path
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();

    // Reset Redux state

    // Redirect to the login page
    navigate("/sign-in");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition-all"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
