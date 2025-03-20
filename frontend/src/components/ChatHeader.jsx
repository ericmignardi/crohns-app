import React from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { FaTimes } from "react-icons/fa";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="flex justify-between items-center p-4 bg-base-200 border-b border-base-300 rounded-t-lg shadow-md">
      <div className="flex items-center space-x-4">
        <img
          className="w-14 h-14 rounded-full object-cover"
          src={selectedUser.profile_pic || "/avatar.png"}
          alt={selectedUser.name + "'s Profile Picture"}
        />
        <div className="flex flex-col">
          <span className="text-xl font-semibold">{selectedUser.name}</span>
          <span
            className={`text-sm ${
              onlineUsers.includes(String(selectedUser.id))
                ? "text-green-500"
                : "text-gray-500"
            }`}
          >
            {onlineUsers.includes(String(selectedUser.id))
              ? "Online"
              : "Offline"}
          </span>
        </div>
      </div>
      <button
        onClick={() => setSelectedUser(null)}
        className="btn btn-ghost text-xl hover:text-red-500 focus:outline-none"
        aria-label="Close Chat"
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default ChatHeader;
