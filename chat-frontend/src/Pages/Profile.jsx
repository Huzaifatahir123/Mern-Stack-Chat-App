import React from 'react'
import { useStore } from '../../libs/Zustand'

const Profile = () => {
    const currentUser = useStore((state)=>state.currentUser);
    console.log(currentUser);
    
  return (
    <div className='flex justify-center w-screen h-screen overflow-hidden items-center'>
           <div className='p-10 flex flex-col justify-center items-center flex-wrap gap-3 rounded-2xl bg-black text-white text-2xl'>
                       <img 
                src={currentUser.profilePic || `https://ui-avatars.com/api/?name=${currentUser.name}&background=random&color=fff`} 
                alt={currentUser.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-700 group-hover:border-gray-500 transition-colors"
              />
                 <p>{currentUser.name}</p>
                 <p>{currentUser.email}</p>
                 <p>{currentUser.createdAt.slice(0,10)}</p>
           </div>
    </div>
  )
}

export default Profile