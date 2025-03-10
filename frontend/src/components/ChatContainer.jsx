import React, { useEffect } from "react";
import ChatHeader from "./ChatHeader.jsx";
import Messages from "./Messages.jsx";
import ChatFooter from "./ChatFooter.jsx";

const ChatContainer = () => {
  return (
    <div>
      <ChatHeader />
      <Messages />
      <ChatFooter />
    </div>
  );
};

export default ChatContainer;
