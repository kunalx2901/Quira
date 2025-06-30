import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaHome, FaUserFriends, FaBell } from "react-icons/fa";
import useAuthUser from "../hooks/useAuthUser";

const Sidebar = () => {
  const location = useLocation();
  const {isLoading, authUser} = useAuthUser();
  

  // Replace with real user data later
  const user = {
    name: authUser.fullName,
    avatar: authUser.profileAvatar,
    status: "online",
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen w-full max-w-[240px] bg-white text-gray-800 font-sans shadow-lg flex flex-col justify-between p-4 transition-all duration-300 ease-in-out md:w-64">
      {/* Navigation */}
      <div>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2 rounded-md transition duration-200 ${
                isActive ? "bg-blue-100 text-blue-600 font-medium" : "hover:bg-gray-100"
              }`
            }
          >
            <FaHome />
            <span className="text-sm">Home</span>
          </NavLink>

          <NavLink
            to="/friends"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2 rounded-md transition duration-200 ${
                isActive ? "bg-blue-100 text-blue-600 font-medium" : "hover:bg-gray-100"
              }`
            }
          >
            <FaUserFriends />
            <span className="text-sm">Friends</span>
          </NavLink>

          <NavLink
            to="/notification"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2 rounded-md transition duration-200 ${
                isActive ? "bg-blue-100 text-blue-600 font-medium" : "hover:bg-gray-100"
              }`
            }
          >
            <FaBell />
            <span className="text-sm">Notifications</span>
          </NavLink>
        </nav>
      </div>

      {/* User Status */}
      <div className="mt-8 flex items-center space-x-3 p-3 rounded-md bg-gray-50 shadow-inner">
        <div className="avatar online">
          <div className="w-10 rounded-full ring ring-blue-300 ring-offset-base-100 ring-offset-2">
            <img src={user.avatar} alt="User Avatar" />
          </div>
        </div>
        <div className="truncate">
          <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
          <p className="text-xs text-green-500 font-medium capitalize">{user.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
