import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaHome, FaUserFriends, FaBell, FaBars } from "react-icons/fa";
import useAuthUser from "../hooks/useAuthUser";
import { useThemeStore } from "../store/useThemeStore";

const Sidebar = () => {
  const { theme } = useThemeStore();
  const location = useLocation();
  const { isLoading, authUser } = useAuthUser();
  const [isOpen, setIsOpen] = useState(false);

  const user = {
    name: authUser.fullName,
    avatar: authUser.profileAvatar,
    status: "online",
  };

  const toggleSidebar = () => setIsOpen(!isOpen);
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Toggle Button - Mobile Only */}
      <div className="md:hidden fixed top-4 left-3 z-50">
        <button
          onClick={toggleSidebar}
          className="p-1 text-gray-700 bg-base-100 border rounded shadow-lg"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Overlay for sidebar when open in mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-50 md:static top-0 left-0 h-full md:h-auto w-64 bg-base-100 shadow-lg transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 flex flex-col justify-between p-4 font-sans`}
        data-theme={theme}
      >
        {/* Navigation */}
        <div className="pt-12 md:pt-0">
          <nav className="flex flex-col space-y-2">
            <NavItem to="/" icon={<FaHome />} label="Home" />
            <NavItem to="/friends" icon={<FaUserFriends />} label="Friends" />
            <NavItem to="/notification" icon={<FaBell />} label="Notifications" />
          </nav>
        </div>

        {/* User Status */}
        <div className="mt-8 flex items-center space-x-3 p-3 rounded-md bg-gray-50 shadow-inner">
          <div className="avatar online">
            <div className="w-10 rounded-full ring ring-blue-300 ring-offset-base-100 ring-offset-2">
              <img src={user.avatar || "/profile.png"} alt="User Avatar" />
            </div>
          </div>
          <div className="truncate">
            <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
            <p className="text-xs text-green-500 font-medium capitalize">{user.status}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-3 px-4 py-2 rounded-md transition duration-200 ${
          isActive ? "bg-blue-100 text-blue-600 font-medium" : "hover:bg-gray-100"
        }`
      }
    >
      {icon}
      <span className="text-sm">{label}</span>
    </NavLink>
  );
};

export default Sidebar;
