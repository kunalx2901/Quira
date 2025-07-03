import React from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { Link2Icon } from "lucide-react";
import { useLogout } from "../hooks/useLogout";
import useAuthUser from "../hooks/useAuthUser";
import PageLoader from "./PageLoader";
import ThemeSelector from "./ThemeSelector";
import { useThemeStore } from "../store/useThemeStore";

const Navbar = () => {
  const { theme } = useThemeStore();
  const { logoutMutation } = useLogout();
  const { isLoading, authUser } = useAuthUser();

  if (isLoading) return <PageLoader />;

  const handleLogout = () => {
    logoutMutation();
    console.log("User logged out");
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-4 sm:px-6 md:px-10" data-theme={theme}>
      {/* Logo - center on mobile, left on desktop */}
      <div className="flex-1 justify-center sm:justify-start">
        <Link
          to="/"
          className="flex items-center gap-2 font-sans text-xl sm:text-2xl font-bold text-primary"
        >
          <Link2Icon size={24} />
          Quira
        </Link>
      </div>

      {/* Right Side Items */}
      <div className="flex-none flex flex-wrap items-center justify-end">
        {/* Theme Selector */}
        <ThemeSelector />

        {/* Notifications */}
        <Link
          className="btn btn-ghost btn-circle text-lg"
          to="/notification"
          aria-label="Notifications"
        >
          <FaBell />
        </Link>

        {/* Avatar */}
        <div className="avatar">
          <div className="lg:w-10 w-7 rounded-full ring ring-gray-300">
            <img
              src={authUser.profileAvatar || "/profile.png"}
              alt="User Avatar"
              className="object-cover"
            />
          </div>
        </div>

        {/* Logout Button */}
        <button
          className="btn lg:btn-sm btn-xs btn-primary ml-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
