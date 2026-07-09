import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import {FcGoogle} from "react-icons/fc"
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ServerUrl } from '../App';

const SingIn = () => {

const primaryColor = "#ff4d2d";
const hoverColor = "#e64323";
const bgColor = "#fff9f6";
const borderColor = "#ddd";
const navigate = useNavigate()

const [showPassword,setShowPassword] = useState(false)

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")



// SIGNUP CONTROLLER==============================================
const handleSignIn = async () => {
  try {
    const result = await axios.post(`${ServerUrl}/api/auth/signin`,{
      email,
      password,
    },{withCredentials:true})
    
  } catch (error) {
    console.log(error)
  }
  
}


  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4'
    style={{backgroundColor:bgColor}}
    >
      <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]
        `} style={{border:`1px solid ${borderColor}`}}>
         <h1 className={`text-3xl font-bold mb-2`} style={{color:primaryColor}}>Vingo</h1> 
        <p className='text-gray-600 mb-8'>Sign In to your account to get started with
           delicious food deliveries</p> 



          {/* EMAIL====================================================  */}

      <div className='mb-4'>
        <label
        className='block text-gray-700 font-medium mb-1'
        htmlFor="email">Email</label>
       <input
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
       className='w-full border rounded-lg px-3 py-2 focus:outline-none
       focus:border-orange-500'
       type="email" placeholder='Enter your Email'
       style={{border:`1px solid ${borderColor}`}}
       /> 
        </div> 

    

         {/* PASSWORDE====================================================  */}

         <div className='mb-4'>
        <label
        className='block text-gray-700 font-medium mb-1'
        htmlFor="password">Password</label>
        <div className='relative'>
       <input
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
       className='w-full border rounded-lg px-3 py-2 focus:outline-none
       focus:border-orange-500'
       type={showPassword ? "text" : "password"} placeholder='Enter Password'
       style={{border:`1px solid ${borderColor}`}}
       /> 
       <button
       onClick={()=>setShowPassword(!showPassword)}
       className='absolute right-3 
       top-[14px] text-gray-500 
       cursor-pointer
       '>{showPassword ? <FaEye /> : <FaRegEyeSlash />}</button>
       </div>
        </div>   

        {/* FORGOT PASSWORD====== */}

        <div
        onClick={()=>navigate("/forgot-password")}
        className='text-right mb-4 text-[#ff4d2d]'>
          Forgot Password
        </div>


    

      <button
      onClick={handleSignIn}
      className={`w-full mt-4 flex items-center justify-center gap-2 
      border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] 
      text-white hover:bg-[#e64323] cursor-pointer `}
      
      >
        Sign In
        </button>

        {/* GOOGLE SINGUP================================================= */}

       <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg
       px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100
       cursor-pointer'>
        <FcGoogle size={20}/>
        <span>Sign In With Google</span>
        </button> 
        <p
        onClick={()=>navigate("/signup")}
        className='text-center mt-6 cursor-pointer'
        >Want to Create a new account? <span className='text-[#e64323]'>Sign Up</span> </p>
      </div>

    </div>
  )
}

export default SingIn