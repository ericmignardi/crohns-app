import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";

const Sidebar = () => {
  const { users, getUsers, isUsersLoading, selectedUser, setSelectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  console.log(users);
  console.log(onlineUsers);

  const filteredOnlineUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(String(user.id)))
    : users;

  if (isUsersLoading) return <div>Loading...</div>;

  return (
    <aside className="border-red-500 border-2">
      <div className="grid grid-cols-1 justify-center items-center">
        <h1>Users</h1>
        <button
          onClick={() => setShowOnlineOnly(!showOnlineOnly)}
          className="btn"
        >
          {showOnlineOnly ? "Show All Users" : "Show Online Users Only"}
        </button>
        {filteredOnlineUsers.map((user) => {
          return (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`flex py-2 px-4 hover:bg-base-300 transition-all justify-start items-center gap-4
              ${selectedUser?.id === user.id ? "bg-base-300" : ""}
            `}
            >
              <img
                src={user.profile_pic || "/avatar.png"}
                alt={
                  user.first_name + " " + user.last_name + "'s Profile Picture"
                }
                className="size-12"
              />
              <div className="text-left">
                <p>
                  {user.first_name} {user.last_name}
                </p>
                <span
                  className={`${
                    onlineUsers.includes(String(user.id))
                      ? "text-[var(--teal)]"
                      : "text-gray-500"
                  }`}
                >
                  {onlineUsers.includes(String(user.id)) ? "Online" : "Offline"}
                </span>
              </div>
            </button>
          );
        })}
        {filteredOnlineUsers.length === 0 && <div>No Online Users</div>}
      </div>
    </aside>
  );
};

export default Sidebar;
