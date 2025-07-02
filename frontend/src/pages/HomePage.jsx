// pages/HomePage.jsx or /app/page.jsx depending on structure
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useThemeStore } from '../store/useThemeStore';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { getFriends, getOutgoingRequest, getUsers } from '../lib/api';

const HomePage = () => {
  const queryClient = new QueryClient();
  const {theme , setTheme} = useThemeStore();
  const [outgoingRequestIds, setOutgoingRequestIds] = useState(new Set());

  const {data:getFriendsData = [], isLoading:loadingFriends} = useQuery({
    queryKey:['friends'],
    queryFn: getFriends
  })

  const {data:getUsersData = [], isLoading:loadingUsers} = useQuery({
    queryKey:['RecommendedUsers'],
    queryFn: getUsers
  })

  const {data: outgoingRequests} = useQuery({
    queryKey: ['outgoingRequests'],
    queryFn: getOutgoingRequest
  })



  return (
    <Layout>
    <div className="text-xl" data-theme={theme}>
        
      </div>
    </Layout>
  );
};

export default HomePage;
