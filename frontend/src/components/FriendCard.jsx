import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Link } from 'react-router';

const FriendCard = ({friend}) => {
  return (
    <div className="w-full bg-white dark:bg-base-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-4">
      
      {/* Avatar + Info */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <img
          src={friend.profileAvatar}
          alt={friend.name}
          className="w-16 h-16 rounded-full border-2 border-primary object-cover"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-base sm:text-lg font-semibold ">{friend.name}</h2>
          <p className="text-sm ">{friend.bio}</p>
        </div>
      </div>

      {/* Message Button */}
      <div className="w-full sm:w-auto text-center ">
        <Link to={`/chat/${friend._id}`} className="btn btn-primary btn-sm w-full sm:w-auto flex items-center justify-center gap-2" onClick={onMessageClick}>
          <MessageSquare size={16} />
          Message
        </Link>
      </div>

    </div>
  );
};

export default FriendCard;
