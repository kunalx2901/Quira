// VideoCallButton.jsx
import { Video } from 'lucide-react';

export default function CallButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bottom-6 right-6 z-50 absolute bg-gray-600 top-1 h-12 w-12 rounded-full flex items-center justify-center text-white shadow-lg"
      aria-label="Start Video Call"
    >
      <Video className="w-6 h-6" />
    </button>
  );
}
