import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { FaUserCircle } from "react-icons/fa"; // For user icons

const Sidebar = () => {
  const { users, getUsers, isUsersLoading, selectedUser, setSelectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredOnlineUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(String(user.id)))
    : users;

  if (isUsersLoading) return <div className="text-center">Loading...</div>;

  return (
    <aside className="flex flex-col bg-base-300 p-4 rounded-lg shadow-lg w-full sm:w-80">
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold mb-4">Users</h1>
        <button
          onClick={() => setShowOnlineOnly(!showOnlineOnly)}
          className="btn btn-primary text-[var(--light)] mb-4"
        >
          {showOnlineOnly ? "Show All Users" : "Show Online Users Only"}
        </button>
        <div className="w-full space-y-2">
          {filteredOnlineUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-base-200 transition-all justify-start ${
                selectedUser?.id === user.id ? "bg-base-200" : ""
              }`}
            >
              <img
                src={user.profile_pic || "/avatar.png"}
                alt={
                  user.first_name + " " + user.last_name + "'s Profile Picture"
                }
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-medium">
                  {user.first_name} {user.last_name}
                </p>
                <span
                  className={`${
                    onlineUsers.includes(String(user.id))
                      ? "text-teal-500"
                      : "text-gray-500"
                  }`}
                >
                  {onlineUsers.includes(String(user.id)) ? "Online" : "Offline"}
                </span>
              </div>
            </button>
          ))}
        </div>
        {filteredOnlineUsers.length === 0 && (
          <div className="text-center text-gray-500">No Online Users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
