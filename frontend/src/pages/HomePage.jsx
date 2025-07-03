import  { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useThemeStore } from '../store/useThemeStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFriends, getOutgoingRequest, getUsers, sendFriendRequest } from '../lib/api';
import { Link } from 'react-router-dom'; // ✅ use `react-router-dom` not `react-router`
import { CheckCircleIcon,  MapPin, PencilIcon, UserIcon, UserPlusIcon } from 'lucide-react';
import FriendCard from '../components/FriendCard';
import NoFriendCard from '../components/NoFriendCard';
import { toast } from 'react-hot-toast'; // ✅ use `react-hot-toast` for notifications

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

  const { data: outgoingRequests, isLoading:loadingRequest } = useQuery({
    queryKey: ['outgoingRequests'],
    queryFn: getOutgoingRequest,
  });

  const { mutate: sendFriendRequestMutation, isPending } = useMutation({
  mutationFn: sendFriendRequest,
  onSuccess: (_, userId) => {
  queryClient.invalidateQueries(['outgoingRequests']);
  setOutgoingRequestIds(prev => new Set(prev).add(userId));
  toast.success('Friend request sent successfully!');
},

});


  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingRequests && outgoingRequests.length > 0) {
      console.log(outgoingRequests);  
      outgoingRequests.forEach((request) => {
        outgoingIds.add(request.recipient._id);
      });
      setOutgoingRequestIds(outgoingIds);
    }
  }, [outgoingRequests]);

  console.log('Outgoing Request IDs:', outgoingRequestIds);

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

         {/* Recommened Users Section */}
      <section className="p-4">
          <h2 className="text-2xl font-bold text-primary text-center md:text-left mb-5">
            Recommended Users
          </h2>

          {loadingUsers || loadingRequest ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>)
            :
          getUsersData.length === 0 ? (
            <p className="text-sm opacity-70">No users to recommend at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {getUsersData.map((user) => {
                const isOutgoingRequest = outgoingRequestIds.has(user._id);
                return(
                <div
                  key={user._id}
                  className="rounded-xl shadow-md p-4 flex flex-col items-center text-center border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="avatar mb-3">
                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={user.profileAvatar || '/profile.png'} alt={user.fullName} />
                    </div>
                  </div>

                  <div className='gap-1 flex flex-col justify-center items-center'>
                    <h3 className="text-base font-bold">{user.fullName.charAt(0).toUpperCase() + user.fullName.slice(1)}</h3>

                  <div className="text-base font-bold flex justify-center items-center gadiv-2">
                    <p>
                      <PencilIcon size={18} className='text-primary'/>
                    </p>
                    {user.bio}</div>
                  <p className="text-sm opacity-70 mb-3 line-clamp-2 flex justify-center items-center gap-2">
                    <MapPin size={18} className='text-primary'/>
                    {user.location.charAt(0).toUpperCase() + user.location.slice(1) || 'No location provided.'}
                  </p>
                  </div>

                 <button
                        className={`btn w-full mt-2 ${
                          isOutgoingRequest ? "btn-disabled" : "btn-primary"
                        } `}
                        onClick={() => sendFriendRequestMutation(user._id)}
                        disabled={isOutgoingRequest || isPending}
                      >
                        {isOutgoingRequest ? (
                          <>
                            <CheckCircleIcon className="size-4 mr-2" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4 mr-2" />
                            Send Friend Request
                          </>
                        )}
                      </button>
                </div>
              )
              })}
            </div>
          )}
        
        </section>

        
      </div>
    </Layout>
  );
};

export default HomePage;
