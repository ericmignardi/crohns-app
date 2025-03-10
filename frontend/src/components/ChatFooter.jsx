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
    <div className="border-red-500 border-2">
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          name="message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="btn" type="submit" disabled={isCreatingMessage}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
