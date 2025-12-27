import React, { useState, useEffect } from "react";
import { useStore } from "../../libs/Zustand";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const selectedUser = useStore((state) => state.selectedUser);
  const fetchUsers = useStore((state) => state.fetchUsers);
  const allUsers = useStore((state) => state.registeredUsers);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);
  const setSelectedUser = useStore((state) => state.setSelectedUser);
  const onlineUsers = useStore((state) => state.onlineUsers);
  const isMessageTabOpen = useStore((state) => state.isMessageTabOpen);
  const setIsMessageTabOpen = useStore((state) => state.setIsMessageTabOpen);
  const [search, setSearch] = useState("");
  console.log(onlineUsers);

  const filteredUsers = allUsers?.filter((user) => {
    if (!user.name) {
      return false;
    }
    return user.name.toLowerCase().includes(search.toLowerCase());
  });

  console.log(search, filteredUsers);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div
      className={`h-screen pt-4 w-[25vw] max-sm:w-screen bg-background border-r  ${
        selectedUser ? "hidden md:flex flex-col" : "flex flex-col"
      }  text-white`}
    >
      {/* 1. Sidebar Header & Search */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 tracking-wide">Chats</h2>
        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search users..."
            className="w-full bg-gray-900 text-gray-300 text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white transition-all"
          />
        </div>
      </div>

      {/* 2. User List (Scrollable) */}
      <div className="flex-1  overflow-y-auto custom-scrollbar">
        {loading && (
          <div className="text-center text-gray-500 mt-10">
            Loading users...
          </div>
        )}
        {error && (
          <div className="text-center text-red-400 mt-10">Error: {error}</div>
        )}

        {!loading &&
          !error &&
          filteredUsers?.map((u) => {
            const isOnline = onlineUsers.includes(u._id);
            console.log(isOnline);

            return (
              <div
                key={u._id || u.id} // Handle both _id (MongoDB) and id
                onClick={() => {
                  
                  setSelectedUser(u);
                  setIsMessageTabOpen(false)
                  navigate(`/chat/${u._id}`);
                }}
                className="flex   items-center gap-4 p-4 hover:bg-gray-900 cursor-pointer transition-colors duration-200 group "
              >
                {/* Avatar Section */}
                <div className="relative">
                  {/* Uses a placeholder avatar service based on their name */}
                  <img
                    src={
                      u.profilePic ||
                      `https://ui-avatars.com/api/?name=${u.name}&background=random&color=fff`
                    }
                    alt={u.name}
                    className="w-12 h-12 rounded-full object-cover border  group-hover:border-gray-500 transition-colors"
                  />

                  {/* Online Status Dot (White for B&W theme, or Green for standard) */}
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></span>
                  )}
                </div>

                {/* User Info Section */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className=" truncate font-bold  text-text-gray group-hover:text-white transition-colors">
                      {u.name}
                    </h3>
                    {/* Timestamp placeholder */}
                    <span className="text-sm text-nuetral">10:23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm  text-nuetral font-bold truncate group-hover:text-gray-400">
                      Click to start chatting...
                    </p>
                    <p className="bg-color-bg rounded-sm text-sm text-white px-2 ">5</p>
                  </div>
                </div>
              </div>
            );
          })}

        {/* Empty State */}
        {!loading && allUsers?.length === 0 && (
          <div className="text-center text-gray-600 mt-10">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
