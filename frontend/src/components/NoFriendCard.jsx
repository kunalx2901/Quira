import React from 'react';
import { UserPlus, Smile } from 'lucide-react';

const NoFriendCard = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-6 bg-base-100 rounded-xl shadow-md text-center">
      <div className="bg-blue-100 p-4 rounded-full shadow-sm mb-4">
        <Smile className="w-10 h-10 text-blue-500" />
      </div>
      <h2 className="text-lg font-semibold text-gray-700">You have no friends yet</h2>
      <p className="text-sm text-gray-500 mt-1 mb-4">
        Start chatting by adding or inviting friends to your list.
      </p>
    </div>
  );
};

export default NoFriendCard;
