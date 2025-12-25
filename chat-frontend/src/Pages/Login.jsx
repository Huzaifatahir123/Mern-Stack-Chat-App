import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../libs/Axios.js";
import { useStore } from "../../libs/Zustand.js";
import toast from "react-hot-toast";
import { Mail, Lock  ,Unlock ,} from 'lucide-react';
import LoadingSpinner from "../Components/Loader.jsx";

const Login = () => {
  const navigate = useNavigate();



  const setCurrentUser = useStore((state) => state.setCurrentUser);

  const [showPassword,setShowPassword] = useState(false);
  const togglePassword = ()=>{
    setShowPassword(prev => !prev);
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/user/login", { email, password });
      
 
      setCurrentUser(res.data.user);

      toast.success(res.data.message || "Logged in successfully!");
      navigate("/chat");
    } catch (err) {
      console.error("LOGIN_ERROR:", err);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <div className={`px-10 md:px-14 lg:px-24 xl:px-30 bg-color-bg w-screen h-screen flex flex-col justify-center items-center`}>
      
      <form
        onSubmit={handleSubmit}
        className={`rounded-xl px-6 py-10 flex flex-col  gap-6 w-full shadow-blue-500/20 shadow-2xl max-w-md bg-white`}
      >
        <h1 className={`sm:text-4xl max-sm:text-3xl font-medium self-center text-black`}>Login</h1>
        <div className={`flex justify-between border-b border-black  outline-none`}>
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
          showPassword ? <Unlock className="cursor-pointer" onClick={togglePassword}/> :   <Lock className="cursor-pointer" onClick={togglePassword} />
        }
       
       </div>
      

        <button
          type="submit"
          className={`px-4 py-2 flex justify-center items-center cursor-pointer w-full bg-color-bg font-medium text-white rounded-xl`}
        >
          {loading ? <LoadingSpinner/> : "Login"}
        </button>

        <p className="text-center mt-4 text-black">
          Don't have an account?{" "}
        </p>
        <button
          onClick={()=>{navigate("/signUp")}}
          className={`px-4 py-2 w-full font-medium hover:bg-color-bg  border border-black cursor-pointer  transition-all duration-150 ease-in-out rounded-xl`}
        >
          SignUp
        </button>
      </form>
    </div>
  );
};

export default Login;
 
