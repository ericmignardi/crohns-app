import React, { useEffect } from "react";
import ChatHeader from "./ChatHeader.jsx";
import Messages from "./Messages.jsx";
import ChatFooter from "./ChatFooter.jsx";

const ChatContainer = () => {
  return (
    <div className="flex flex-col h-full bg-base-100 rounded-lg shadow-lg overflow-hidden">
      <div className="flex-shrink-0 bg-base-200 p-4 rounded-t-lg shadow-md">
        <ChatHeader />
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-50">
        <Messages />
      </div>
      <div className="flex-shrink-0 bg-base-200 p-4 rounded-b-lg shadow-md">
        <ChatFooter />
      </div>
    </div>
  );
};

export default ChatContainer;
