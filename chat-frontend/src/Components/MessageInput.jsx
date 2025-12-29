import React, { useState } from "react";
// We need the Send icon for the button
import { Send , Image } from "lucide-react"; 
import { useStore } from "../../libs/Zustand";

const MessageInput = () => {
  // Local state to hold the text the user is currently typing
  const [text, setText] = useState("");
  
  // Zustand actions
  const sendMessages = useStore((state) => state.sendMessages);
  // Optional: check if a message is currently in transit (for disabling the button)
  const isSending = useStore((state) => state.isMessagesLoading); 

  const handleSend = async (e) => {
    e.preventDefault();
    
    // 1. Basic validation: Don't send empty or whitespace-only messages
    if (!text.trim()) return; 

    // 2. Call the Zustand action. 
    // We send an object { message: '...' } because your backend expects req.body.message
    await sendMessages({ message: text }); 
    
    // 3. Clear the input field after a successful send
    setText(""); 
  };

  return (
    <div className="flex justify-evenly items-center w-full h-[13vh] bg-white ">
      < Image color="gray" size={34} /> 
      {/* The form ensures that pressing ENTER submits the message */}
      <form onSubmit={handleSend} className="flex items-center justify-center  gap-3">
        
        {/* Input Field */}
        <input
          type="text"
          className={`w-[60vw] bg-nuetral2 text-black  rounded-lg p-3 text-sm focus:outline-none focus:border-gray-500 transition-all placeholder-black`}
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)} // Update local state on change
          disabled={isSending} // Disable while waiting for server response
        />

        {/* Send Button */}
        <button
          type="submit"
          // Disable if there is no text or if a message is already in transit
          disabled={!text.trim() || isSending} 
          className={`p-3 bg-color-bg text-black rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {/* Show a spinner while sending, otherwise show the icon */}
          {isSending ? (
            <div className="w-5 h-5 border-2 border-t-2 border-black rounded-full animate-spin"></div>
          ) : (
            <Send className="" color="white" size={20} />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;