import React from "react";
import { FaCommentSlash } from "react-icons/fa";

const NoChatContainer = () => {
  return (
    <div className="bg-base-300 w-full max-w-md mx-auto shadow-lg flex flex-col gap-4 justify-center items-center p-6 rounded-lg text-center">
      <FaCommentSlash className="text-6xl text-gray-500" />
      <h1 className="text-2xl font-semibold text-gray-700">No Chat Selected</h1>
      <p className="text-gray-500">Please select a user to start chatting.</p>
    </div>
  );
};

export default NoChatContainer;
