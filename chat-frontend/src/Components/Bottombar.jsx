import React from 'react'
import { NavLink } from 'react-router-dom'
import {User2Icon,Menu} from "lucide-react"
import img from "../assets/Vector.png"
 
const Bottombar = () => {
    const CommonProperties = "text-sm rounded-xl  flex px-6 py-2 justify-center items-center flex-col gap-1"
  return (
    <div className=' max-sm:flex rounded-t-2xl hidden w-screen h-[12vh] bg-gray-100 text-nuetral fixed bottom-0 right-0 justify-around items-center  '>
       <NavLink className={({isActive})=> isActive ? `${CommonProperties} bg-color-bg text-white ` : `${CommonProperties}`} to="/chat">
       <img className='w-6 h-6 '  src={img} alt="Chats" />
       Chats
       </NavLink>
      
       <NavLink className={({isActive})=> isActive ? `${CommonProperties} bg-color-bg text-white ` : `${CommonProperties}`} to="/profile">
       <User2Icon size={36}/>
       Profile
       </NavLink>
       <NavLink className={`${CommonProperties}`} to="/settings">
        <Menu size={36}/>
       More

       </NavLink>
    </div>
  )
}

export default Bottombar