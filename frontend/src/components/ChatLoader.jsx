import React from 'react';

const ChatLoader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="flex space-x-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
        </div>
        <p className="text-gray-500 text-sm sm:text-base">Connecting to chat...</p>
      </div>
    </div>
  );
};

export default ChatLoader;
