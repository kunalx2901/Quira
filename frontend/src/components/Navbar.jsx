import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = React.useState("light");

  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
    navigate("/login");
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-4 min-w-screen">
      {/* Logo */}
      <div className="flex-1 ">
        <img
          src="/image.png" // Replace with your logo path
          alt="Chat Logo"
          className="mr-2 h-8 w-32 "
        />
        <span className="text-xl font-bold text-primary"></span>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button
          className="btn btn-ghost text-xl"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

        {/* User Avatar */}
        <div className="avatar">
          <div className="w-10 rounded-full ring ring-1 ring-gray-400">
            <img src="/profile.png" alt="User Avatar" />
          </div>
        </div>

        {/* Logout */}
        <button
          className="btn btn-sm btn-error text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
