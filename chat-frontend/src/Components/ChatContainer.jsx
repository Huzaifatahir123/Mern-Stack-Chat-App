import React, { useEffect } from 'react';
import { useStore } from '../../libs/Zustand';
import MessageInput from './MessageInput'; // 👈 Functional Input
import ChatMessages from './ChatMessages'; // 👈 Message Display



const ChatContainer = () => {
  const { selectedUser, fetchMessages,currentUser, isMessageTabOpen ,onlineUsers } = useStore();

  // --- CRUCIAL LOGIC: API Trigger ---
  useEffect(() => {
    // 👈 When selectedUser changes, fetch the new chat history
    if (selectedUser?._id) {
      fetchMessages(); 
    }
    // Optional cleanup logic (clears messages when switching chats)
    return () => {
        useStore.setState({ messages: [] });
    };
  }, [selectedUser, fetchMessages]); 
  // ----------------------------------
  
  const isOnline = onlineUsers.includes(selectedUser._id);
  console.log(isOnline);
  
  return (
    // Vertical stack: Header, Messages, Input
    <div className={`${isMessageTabOpen ? "flex" : "hidden"} flex-col pt-13  h-full w-full bg-black`}>
      
      {/* 1. HEADER (Top Bar) */}
      <div className="p-4 bg-white text-gray-500 flex justify-between  items-center gap-3">
        <div className='flex  justify-center items-center gap-4'>
          <img 
                src={selectedUser.profilePic || `https://ui-avatars.com/api/?name=${selectedUser.name}&background=random&color=fff`} 
                alt={currentUser.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-700 group-hover:border-gray-500 transition-colors"
              />
              <div>
                <h2 className="text-[#0D1217] font-bold tracking-wide">{selectedUser?.name}</h2>
          <p className={`text-sm  text-gray-900}`}>
          {isOnline ? "Online":"Offline"}
        </p>
            
              </div>
        
          
        </div>
     
      </div>

      {/* 2. MESSAGES (Scrollable Middle Area) */}
      <ChatMessages />

      {/* 3. INPUT (Bottom Bar with Send Button) */}
      <MessageInput /> 
      
    </div>
  );
};

export default ChatContainer;