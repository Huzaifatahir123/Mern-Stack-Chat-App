import React from 'react';
import Sidebar from '../Components/Sidebar';
import ChatContainer from '../Components/ChatContainer'; 
import { useStore } from '../../libs/Zustand';
import Navbar from '../Components/Navbar';

const Chat = () => {
  // 👈 Reads the state set by the Sidebar
  const selectedUser = useStore((state) => state.selectedUser); 
  const isMessageTabOpen = useStore((state)=> state.isMessageTabOpen);

  return (
    // Sets up the black background and the horizontal split
    <div className="flex flex-col  h-screen overflow-x-hidden bg-black text-white ">
      <Navbar/>
      {/* 1. LEFT: Sidebar (Fixed Width) */}

    <div className='flex'>
      <Sidebar />
      

      {/* 2. RIGHT: Conditional Chat Area (Takes remaining space) */}
      <div className="flex-1 flex  flex-col">
        {!selectedUser  ? ( 
          <NoChatSelected />
        ) : (
          <ChatContainer />
        )}
      </div>
      
      </div> 
        
    </div>
  );
};

export default Chat;

// The simple component shown when no one is clicked
const NoChatSelected = () => {
  return (
    <div className="hidden items-center justify-center w-full h-full">
      <p className="text-gray-500 text-lg">
        👋 Select a user from the sidebar to start chatting.
      </p>
    </div>
  );
};