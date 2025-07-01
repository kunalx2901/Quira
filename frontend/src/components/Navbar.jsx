import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaBell } from "react-icons/fa";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import toast from "react-hot-toast";
import ThemeSelector from "./ThemeSelector";
import { useLogout } from "../hooks/useLogout";
import useAuthUser from "../hooks/useAuthUser";
import PageLoader from "./PageLoader";
import { useThemeStore } from "../store/useThemeStore";


const Navbar = () => {
  
  const {theme , setTheme} = useThemeStore();
  const {logoutMutation, isPending, error} = useLogout();
  const {isLoading, authUser} = useAuthUser();

  if(isLoading){
    return <PageLoader/>
  }

  const handleLogout = () => {
    logoutMutation();
    console.log("User logged out");
  };


  return (
    <div className="navbar bg-base-100 shadow-md px-4 min-w-screen" data-theme={theme}>
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
        <ThemeSelector/>

        <Link className="btn btn-ghost text-xl rounded-full" 
        to={"/notification"}>
          <FaBell></FaBell>
        </Link>

        {/* User Avatar */}
        <div className="avatar">
          {!authUser.profileAvatar
          ? <div className="w-10 rounded-full ring-1 ring-gray-500">
            <img src="/profile.png" alt="User Avatar" />
          </div>
          : <div className="w-10 rounded-full ring-1 ring-gray-500">
            <img src={authUser.profileAvatar} alt="User Avatar" />
          </div>}
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
