import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { acceptFriendRequest, getFriendRequest } from '../lib/api';
import { CheckIcon, ClockIcon } from 'lucide-react';
import Layout from '../components/Layout';
import { toast } from 'react-hot-toast';
import NoNotifications from '../components/NoNotifications';

const NotificationPage = () => {
  const queryClient = useQueryClient();

  const {
    data: friendRequests = {},
    isLoading: loadingRequests,
  } = useQuery({
    queryKey: ['friendRequests'],
    queryFn: getFriendRequest,
  });

  const { mutate: acceptRequestMutation } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      toast.success('Friend request accepted!');
      queryClient.invalidateQueries(['friendRequests']);
      queryClient.invalidateQueries(['friends']);
    },
  });

  const incomingRequestList = friendRequests?.incomingRequest || [];
  const acceptedRequestList = friendRequests?.acceptedRequest || [];

  return (
    <Layout>
      <div className="px-4 py-6 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">Notifications</h2>

        
        <section className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Incoming Friend Requests</h3>
          {loadingRequests ? (
            <p>Loading incoming requests...</p>
          ) : incomingRequestList.length === 0 ? (
            <p className="opacity-60">No incoming requests.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {incomingRequestList.map((request) => (
                <div
                  key={request._id}
                  className="p-4 border rounded-xl shadow-sm flex flex-col items-center text-center"
                >
                  <img
                    src={request.sender.profileAvatar || '/profile.png'}
                    alt={request.sender.fullName}
                    className="w-16 h-16 rounded-full mb-2"
                  />
                  <p className="font-semibold text-lg">{request.sender.fullName}</p>
                  <p className="text-sm opacity-70 mb-3">{request.sender.location}</p>
                  <button
                    className="btn btn-primary btn-sm w-full flex justify-center items-center gap-2"
                    onClick={() => acceptRequestMutation(request._id)}
                  >
                    <CheckIcon size={16} /> Accept
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Accepted Requests */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Accepted Friend Requests</h3>
          {loadingRequests ? (
            <p>Loading accepted requests...</p>
          ) : acceptedRequestList.length === 0 ? (
            <p className="opacity-60">No accepted requests.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {acceptedRequestList.map((request) => (
                <div
                  key={request._id}
                  className="p-4 border rounded-xl shadow-sm flex flex-col items-center text-center"
                >
                  <img
                    src={request.recipient.profileAvatar || '/profile.png'}
                    alt={request.recipient.fullName}
                    className="w-16 h-16 rounded-full mb-2"
                  />
                  <p className="font-semibold text-lg">{request.recipient.fullName}</p>
                  <p className="text-sm opacity-70 mb-1">{request.recipient.location}</p>
                  <div
                    className={`text-sm flex items-center gap-1 ${
                      request.status === 'accepted' ? 'text-green-500' : 'text-yellow-500'
                    }`}
                  >
                    <ClockIcon size={14} />
                    {request.status === 'accepted' ? 'Accepted' : 'Pending'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>



        
      </div>
    </Layout>
  );
};

export default NotificationPage;
