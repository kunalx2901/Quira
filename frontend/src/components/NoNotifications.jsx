import { BellOff } from 'lucide-react';

const NoNotifications = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-12 px-4">
      <div className="bg-gray-100 p-5 rounded-full mb-4 shadow-md">
        <BellOff className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No Notifications
      </h3>
      <p className="text-gray-500 max-w-sm">
        You're all caught up! Any new incoming or accepted requests will appear here.
      </p>
    </div>
  );
};

export default NoNotifications;
