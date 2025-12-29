import React from 'react'
import { useStore } from '../../libs/Zustand'
import {Copy} from 'lucide-react'
import Bottombar from '../Components/Bottombar';

const Profile = () => {
    const currentUser = useStore((state)=>state.currentUser);
    console.log(currentUser);
    
  return (
    <div className='flex flex-col pt-20 w-screen h-screen  items-center'>
        <img className='w-32 h-32 rounded-full mb-6' src={currentUser?.ProfilePic || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"} alt="Profile Avatar" />
      
          <h1 className='font-bold text-2xl'>{currentUser?.name}</h1>
 
        
        <div className='flex items-center gap-3 justify-center'>
          <p className='text-gray-600 font-bold mt-4 text-xl'>435215</p>
        < Copy className='mt-4 '/>

        </div>
        <Bottombar/>


    </div>
  )
}

export default Profile