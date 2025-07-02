import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useThemeStore } from '../store/useThemeStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFriends, getOutgoingRequest, getUsers, sendFriendRequest } from '../lib/api';
import { Link } from 'react-router-dom'; // ✅ use `react-router-dom` not `react-router`
import { UserIcon } from 'lucide-react';
import FriendCard from '../components/FriendCard';
import NoFriendCard from '../components/NoFriendCard';

const HomePage = () => {
  const queryClient = useQueryClient();
  const { theme } = useThemeStore();
  const [outgoingRequestIds, setOutgoingRequestIds] = useState(new Set());

  const { data: getFriendsData = [], isLoading: loadingFriends } = useQuery({
    queryKey: ['friends'],
    queryFn: getFriends,
  });

  const { data: getUsersData = [], isLoading: loadingUsers } = useQuery({
    queryKey: ['RecommendedUsers'],
    queryFn: getUsers,
  });

  const { data: outgoingRequests } = useQuery({
    queryKey: ['outgoingRequests'],
    queryFn: getOutgoingRequest,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries(['outgoingRequests']),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingRequests && outgoingRequests.length > 0) {
      outgoingRequests.forEach((request) => {
        outgoingIds.add(request.id);
      });
      setOutgoingRequestIds(outgoingIds);
    }
  }, [outgoingRequests]);

  return (
    <Layout>
      <div className="px-4 py-6 min-h-screen bg-base-100" data-theme={theme}>
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-primary text-center md:text-left">
            Your Friends
          </h2>

          <Link to="/notification">
            <button className="btn btn-primary flex items-center gap-2 btn-sm">
              <UserIcon size={18} />
              Friend Requests
            </button>
          </Link>
        </div>

        {/* Friend List Section */}
        {loadingFriends ? (
          <div className="flex justify-center items-center mt-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : getFriendsData.length === 0 ? (
          <NoFriendCard />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {getFriendsData.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
