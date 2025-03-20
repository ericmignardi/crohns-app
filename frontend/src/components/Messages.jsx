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
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const messageRef = useRef(null);

  return (
    <div className="flex flex-col overflow-y-auto p-4 space-y-4 max-h-[70vh]">
      {isMessagesLoading && (
        <div className="flex justify-center items-center text-lg text-gray-500">
          Loading messages...
        </div>
      )}
      {messages.length === 0 && !isMessagesLoading && (
        <div className="flex justify-center items-center text-lg text-gray-500">
          No messages yet...
        </div>
      )}
      {messages.map((message) => {
        const messageAlignment =
          message.sender_id === authUser.id ? "chat-end" : "chat-start";
        return (
          <div
            className={`chat ${messageAlignment} max-w-xs rounded-lg shadow-md`}
            key={message.id}
            ref={messageRef}
          >
            <p className="chat-bubble bg-base-200 text-base-content p-3 rounded-lg">
              {message.message}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
