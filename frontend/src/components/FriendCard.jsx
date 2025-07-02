import React from 'react';
import { MessageSquare } from 'lucide-react';

const FriendCard = ({
  name = 'Jane Doe',
  bio = 'Hey there! I love coding and coffee.',
  avatar = 'https://api.dicebear.com/7.x/thumbs/svg?seed=Jane',
  onMessageClick = () => console.log('Open chat'),
}) => {
  return (
    <div className="w-full bg-white dark:bg-base-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-4">
      
      {/* Avatar + Info */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <img
          src={avatar}
          alt={name}
          className="w-16 h-16 rounded-full border-2 border-primary object-cover"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">{name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{bio}</p>
        </div>
      </div>

      {/* Message Button */}
      <div className="w-full sm:w-auto text-center ">
        <button
          onClick={onMessageClick}
          className="btn btn-sm btn-outline btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <MessageSquare size={16} />
          Message
        </button>
      </div>
    </div>
  );
};

export default FriendCard;
