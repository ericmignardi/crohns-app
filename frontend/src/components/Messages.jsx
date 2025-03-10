import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore";

const Messages = () => {
  const {
    selectedUser,
    messages,
    isMessagesLoading,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser.id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    getMessages,
    selectedUser.id,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageRef.current && messages) {
      messageRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  const messageRef = useRef(null);

  return (
    <div className="border-red-500 border-2">
      {isMessagesLoading ? (
        <div>Loading...</div>
      ) : messages.length === 0 ? (
        <div>No messages...</div>
      ) : (
        messages.map((message) => {
          const messageAlignment =
            message.sender_id === authUser.id ? "chat-end" : "chat-start";
          return (
            <div
              className={`chat ${messageAlignment}`}
              key={message.id}
              ref={messageRef}
            >
              <p className="chat-bubble">{message.message}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Messages;
