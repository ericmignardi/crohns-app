import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import { useChatStore } from "../store/useChatStore.js";
import ChatContainer from "../components/ChatContainer.jsx";
import NoChatContainer from "../components/NoChatContainer.jsx";

const Chat = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="flex container mx-auto py-4">
      <Sidebar />
      {!selectedUser ? <NoChatContainer /> : <ChatContainer />}
    </div>
  );
};

export default Chat;
