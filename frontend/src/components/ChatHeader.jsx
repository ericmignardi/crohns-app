import React from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { FaTimes } from "react-icons/fa";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  return (
    <div className="flex justify-center items-center border-red-500 border-2">
      <img
        className="size-8"
        src={selectedUser.profile_pic || "/avatar.png"}
        alt={selectedUser + "'s Profile Picture"}
      />
      <span>
        {onlineUsers.includes(selectedUser.id) ? "Online" : "Offline"}
      </span>
      <button onClick={() => setSelectedUser(null)}>
        <FaTimes />
      </button>
    </div>
  );
};

export default ChatHeader;
