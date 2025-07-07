import React from 'react';
import { MessageSquare, PenIcon } from 'lucide-react';
import { Link } from 'react-router';

const FriendCard = ({friend}) => {
  return (
    <div className="w-full bg-white dark:bg-base-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-4">
      
      {/* Avatar + Info */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <img
          src={friend.profileAvatar}
          alt={friend.fullName}
          className="w-16 h-16 rounded-full border-2 border-primary object-cover"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-base sm:text-lg font-semibold ">{friend.fullName[0].toUpperCase() + friend.fullName.slice(1)}</h2>
          <p className="text-sm flex justify-center items-center gap-1"><PenIcon size={14}/> {friend.bio}</p>
        </div>
      </div>

      {/* Message Button */}
      <div className="w-full sm:w-auto text-center ">
        <Link to={`/chat/${friend._id}`} className="btn btn-primary btn-sm w-full sm:w-auto flex items-center justify-center gap-2">
          <MessageSquare size={16} />
          Message
        </Link>
      </div>

    </div>
  );
};

export default FriendCard;
