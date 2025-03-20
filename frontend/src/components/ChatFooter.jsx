import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore.js";
import toast from "react-hot-toast";

const ChatFooter = () => {
  const [message, setMessage] = useState("");
  const { createMessage, isCreatingMessage } = useChatStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        await createMessage({ message: message });
        setMessage("");
      } catch (error) {
        toast.error("Error Creating Message");
        console.log(error.message);
      }
    }
  };

  return (
    <div className="p-4 bg-base-200 border-t border-base-300 rounded-b-lg">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <input
          className="input input-bordered w-full max-w-xl focus:outline-none"
          type="text"
          name="message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={isCreatingMessage}
        />
        <button
          className="btn btn-primary text-white hover:bg-primary-focus disabled:bg-gray-400"
          type="submit"
          disabled={isCreatingMessage || !message.trim()}
        >
          {isCreatingMessage ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Send"
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
