import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import { useChatStore } from "../store/useChatStore.js";
import ChatContainer from "../components/ChatContainer.jsx";
import NoChatContainer from "../components/NoChatContainer.jsx";

const Chat = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen">
      <div className="flex container mx-auto py-4 pt-[80px] gap-6">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="w-3/4 bg-base-200 p-6 rounded-xl shadow-lg">
          {!selectedUser ? <NoChatContainer /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};

export default Chat;
