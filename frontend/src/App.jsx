
import React from 'react'
import { Routes, Route, Navigate} from 'react-router';
import HomePage from './pages/HomePage.jsx';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ChatPage from './pages/ChatPage';
import CallPage from './pages/CallPage';
import NotificationPage from './pages/NotificationPage';
import { toast , Toaster } from 'react-hot-toast';
import {useQuery }from "@tanstack/react-query"
import axios from "axios";
import { axiosInstance } from './lib/axios.js';

const App = () => {

  const {data:authData, isLoading, error}= useQuery({
        queryKey:['authUser'],
        queryFn: async()=>{
          const res = await axiosInstance.get("/auth/me")
         return res.data;
        },
        retry:false
      })

    const authUser = authData?.user;

  return (
    <div className="text-2xl h-screen " data-theme="bumblebee">
      <Routes>
        <Route path="/" element={ authUser ? <HomePage/> : <Navigate to={"/login"}/> }></Route>
        <Route path="/login" element={!authUser ? <Login/> : <Navigate to={"/"}/>}></Route>
        <Route path="/signup" element={!authUser ?<SignUp/>: <Navigate to={"/"}/>}></Route>
        <Route path="/chat" element={authUser ? <ChatPage/> : <Navigate to={"/login"}/>}></Route>
        <Route path="/call" element={authUser ? <CallPage/> : <Navigate to={"/login"}/>}></Route>
        <Route path="/notification" element={authUser ? <NotificationPage/> : <Navigate to={"/login"}/>}></Route>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App;
