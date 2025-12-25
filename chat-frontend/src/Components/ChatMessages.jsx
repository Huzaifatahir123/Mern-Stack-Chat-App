import React, { useEffect, useRef } from "react";
import { useStore } from "../../libs/Zustand";
import { decryptMessage } from "../../libs/crypto";
const ChatMessages = () => {
  // ... (State and useEffect hooks are correct and remain unchanged)
  const { messages, isMessagesLoading, currentUser , bubbleTheme } = useStore();
  const lastMessageRef = useRef();
  
  

  
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 bg-black">
        Loading chat history...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[65vh] overflow-y-auto p-4 space-y-4  bg-nuetral2">
      
      {/* Empty State */}
      {!isMessagesLoading && messages.length === 0 && (
        <div className="text-center text-gray-600 mt-10">
          No history yet. Start the conversation!
        </div>
      )}

      {/* Render Messages */}
      {messages.map((message, index) => {
        const fromMe = message.senderId === currentUser?._id; 
        
        const isLastMessage = index === messages.length - 1;
// INSIDE THE messages.map((message, index) => { ... }) FUNCTION:
 const decryptedMessage = decryptMessage(message.message);
   const myBg = bubbleTheme.primary
  const myText = bubbleTheme.text;
  console.log(myBg,myText);

 

        return (
          // 1. OUTER ALIGNMENT: Pushes the whole box left/right
          <div 
            key={message._id} 
            ref={isLastMessage ? lastMessageRef : null} 
            className={`flex ${fromMe ? "justify-end" : "justify-start"}`}
          >
            {/* 2. INNER ALIGNMENT FIX: Make the inner elements (bubble + timestamp) align to the right when fromMe */}
            <div className={`flex flex-col max-w-[70%] ${fromMe ? "items-end" : "items-start"}`}>
              
              {/* Message Bubble (B&W Theme) */}
              <div
                className={`px-4 py-2 rounded-xl text-sm shadow-md
                  ${fromMe 
                    // MY MESSAGE: White background, cuts bottom-right corner
                    ? `${myBg}  text-white rounded-br-none` 
                    // THEIR MESSAGE: Dark background, cuts bottom-left corner
                    : ` bg-white text-text-gray rounded-bl-none font-bol`
                  }`}
              >
                {decryptedMessage}
              </div>

              {/* Time Stamp (subtle and small) */}
              <span className="text-[10px] text-gray-500 mt-1 px-1">
                {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;