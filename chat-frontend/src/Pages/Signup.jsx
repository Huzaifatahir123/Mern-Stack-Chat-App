
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import api from "../../libs/Axios.js";
import { useStore } from "../../libs/Zustand.js";
import toast from "react-hot-toast";
import { Mail, Lock ,EyeIcon ,Unlock, User, Eye, EyeOff} from 'lucide-react';
import LoadingSpinner from '../Components/Loader.jsx';

const Signup = () => {
  const {peach,green} = useStore();
    const [showPassword,setShowPassword] = useState(false);
 
    const navigate = useNavigate();
    const [name ,setName] = useState("");
     const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [loading, setLoading] = useState(false);
         const togglePassword = ()=>{
      setShowPassword(prev => !prev);
    }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/user/signUp", { email, password,name });
      
 
      

      toast.success(res.data.message || " Register successfully!");
      navigate("/login");
    } catch (err) {
      console.error("SignUp Error", err);
      toast.error(err.response?.data?.message || "SignUp failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={`px-10 md:px-14 lg:px-24 xl:px-30 bg-color-bg  w-screen h-screen flex flex-col justify-center items-center`}>
      
      <form
        onSubmit={handleSubmit}
        className={`bg-white  rounded-xl px-6 py-10   flex flex-col gap-4 w-full max-w-md`}
      >
        <h1 className={`self-center md:text-4xl max-sm:text-3xl font-medium  text-color-bgbg-color-bg`}>Sign Up </h1>
        
               <div className={`flex justify-between border-b border-black `}>
          <input
               
                  type= "text"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  className={`px-2 py-1  outline-none w-full`}
                  required
                />
                
               <User/>
               </div>
        
       <div className={`flex justify-between border-b border-black outline-none`}>
                  <input
                 type="email"
                 placeholder="Email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)} 
                 className={`px-2 py-1  w-full outline-none`}
                 required
               /> 
                <Mail />
       
       
               </div>

       
             <div className={`flex justify-between border-b border-black `}>
        <input
             
                type={showPassword ? "text":"password"}
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className={`px-2 py-1  outline-none w-full`}
                required
              />
              {
                showPassword ? <Eye className="cursor-pointer" onClick={togglePassword}/> :   <EyeOff className="cursor-pointer" onClick={togglePassword} />
              }
             
             </div>

       <button
          type="submit"
          className={`px-4 flex justify-center items-center
             py-2 w-full bg-color-bg font-medium text-white rounded-xl`}
        >
          {loading ? <LoadingSpinner/> : "SignUp"}
        </button>

        <p className="text-center mt-4 text-black">
          Already have a account ? <br />
        
        </p>
        <button
          onClick={()=>{navigate("/login")}}
          className={`px-4 py-2 w-full font-medium border border-black text-black hover:bg-color-bg rounded-xl`}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Signup