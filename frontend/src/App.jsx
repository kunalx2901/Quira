
import React from 'react'
import { Routes, Route} from 'react-router';
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

  const {data, isLoading, error}= useQuery({
        queryKey:['todos'],
        queryFn: async()=>{
          const res = await axiosInstance.get("/auth/me")
         return res.data;
        },
        retry:false
      })

      console.log({ data })
      console.log({ isLoading })
      console.log({ error })

  return (
    <div className="text-2xl h-screen " data-theme="bumblebee">
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/chat" element={<ChatPage/>}></Route>
        <Route path="/call" element={<CallPage/>}></Route>
        <Route path="/notification" element={<NotificationPage/>}></Route>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App;
