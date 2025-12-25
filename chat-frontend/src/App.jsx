import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect } from 'react'; // 👈 1. MUST import useEffect
import Login from "./Pages/Login.jsx";
import Chat from "./Pages/Chat.jsx";
import SignUp from "./Pages/Signup.jsx"
// Ensure this path is correct based on your file structure
import { useStore } from "../libs/Zustand.js"; 
import { Toaster } from "react-hot-toast";
import { useSocket } from "../libs/useSocket.js";
import Navbar from "./Components/Navbar.jsx";
import Profile from "./Pages/Profile.jsx";
import BubbleThemeSelector from "./Components/Pallete.jsx";

function App() {
  // 2. GET the new state and action
  const { currentUser, isAuthLoading, checkAuthStatus } = useStore();
  useSocket();
  // 3. CALL THE FUNCTION WHEN THE APP LOADS
  useEffect(() => {
    checkAuthStatus();
    
    // We only want this to run ONCE on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 


  // 4. STOP RENDERING AND SHOW SPINNER WHILE THE AUTH CHECK IS RUNNING
  if (isAuthLoading) {
    return (
        <div className="flex items-center justify-center h-screen bg-black">
            <div className="flex items-center space-x-2">
                {/* Simple loading spinner */}
                <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>
            </div>
        </div>
    );
  }

  // 5. RENDER ROUTES only after the loading is complete (isAuthLoading is false)
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          
          className: '',
          duration: 1000,
          style: {
            background: '#1A5D1A',
            color: '#FAE392',
          },

          // Default options for specific types
        
          error:{
            duration:1000,
            style:{
                background:"red",
                color:"white"
            }
          }
        }}
      />

      
      <Routes>
        {/* Auth protection logic remains the same */}
        <Route path="/login" element={currentUser ? <Navigate to="/chat"/> : <Login/>} />
        <Route path="/signup" element={currentUser ? <Navigate to="/chat"/> : <SignUp/>} />
        <Route path="/chat" element={currentUser ? <Chat/> : <Navigate to="/login"/>} />
        <Route path="/" element={<Navigate to={currentUser ? "/chat" : "/login"} />} />
        <Route path="/profile" element={currentUser ? <Profile/> :<Navigate to= "/login"/>}  />
        <Route path="/theme" element={currentUser ? <BubbleThemeSelector/> :<Navigate to= "/login"/>}  />
      </Routes>
    </>
  );
}

export default App;