import React, { useState } from 'react'
import {NavLink} from "react-router-dom"
import { Menu, X } from 'lucide-react';
import { useStore } from '../../libs/Zustand';
import { ChevronLeft } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setisOpen] = useState(false);
  const logout = useStore((state)=>state.logout);
  const setIsMessageTabOpen = useStore((state)=> state.setIsMessageTabOpen);
  const toggleMenu = ()=>{
    setisOpen(prev => !prev);
  }
  
   const navLinkClasses = ({isActive})=>{
    `p-4 rounded-xl flex justify-center items-center w-full transition-colors ${isActive ? "bg-blue-600 text-white font-bold shadow-lg":"bg-gray-700 text-white hover:bg-gray-600"}`
   }
  return (
          <>
            {/* 4. OPEN BUTTON: Toggles the menu */}
            <div 
                
                className='flex fixed top-0  w-screen justify-between items-center py-4 px-10  bg-blue-400 text-white shadow-md cursor-pointer'
            >
               <ChevronLeft onClick={()=>setIsMessageTabOpen(false)} size={28} />
                <span className="text-lg font-semibold">Chatty</span>
                <Menu onClick={toggleMenu}  size={24} />
            </div>

            {/* 1. FIXED MENU CONTAINER (Fixed CSS Syntax) */}
            <div 
                className={`fixed top-0 left-0 z-50 
                    w-screen h-screen bg-black text-white text-3xl p-6
                    flex flex-col gap-8 justify-center items-center transition-opacity ease-in-out duration-300
                    ${ isOpen ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none"}
                `}
            >
                {/* 2. CLOSE BUTTON (Placed at the top right for easy access) */}
                <button 
                    onClick={toggleMenu} 
                    className='absolute top-4 right-4 p-3 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-colors'
                >
                    <X size={24} />
                </button>
                
                {/* 2. NavLink 1: Logout (FIXED: Added 'to' prop) */}
                <NavLink 
                    className={navLinkClasses} 
                    to="/logout" 
                    onClick={
                      ({isActive})=>{
                        logout();
                        
                        

`p-4 rounded-xl flex justify-center items-center w-full transition-colors ${isActive ? "bg-blue-600 text-white font-bold shadow-lg":"bg-gray-700 text-white hover:bg-gray-600"}`
                      }
                    } // Close menu on click
                >
                    Logout
                </NavLink>

                {/* NavLink 2: Profile (Using the clean class function) */}
                <NavLink 
                    className={navLinkClasses} 
                    to="/profile"
                    onClick={toggleMenu}
                >
                    Profile
                </NavLink>
                
                <NavLink 
                    className={navLinkClasses} 
                    to="/chat"
                    onClick={toggleMenu}
                >
                    Chat
                </NavLink>
                <NavLink 
                    className={navLinkClasses} 
                    to="/theme"
                    onClick={toggleMenu}
                >
                    Theme
                </NavLink>
                <ThemeToggle/>
            </div>
        </>

  )
}

export default Navbar