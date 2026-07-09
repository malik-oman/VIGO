import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import {FcGoogle} from "react-icons/fc"
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ServerUrl } from '../App';

const SingUp = () => {

const primaryColor = "#ff4d2d";
const hoverColor = "#e64323";
const bgColor = "#fff9f6";
const borderColor = "#ddd";
const navigate = useNavigate()

const [showPassword,setShowPassword] = useState(false)
const [role,setRole] = useState("user")
const [fullName,setFullName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [mobile,setMobile] = useState("")


// SIGNUP CONTROLLER==============================================
const handleSignUp = async () => {
  try {
    const result = await axios.post(`${ServerUrl}/api/auth/signup`,{
      fullName,
      email,
      password,
      mobile,
      role
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
        <p className='text-gray-600 mb-8'>Create your account to get started with
           delicious food deliveries</p> 

       {/* FULL NAME====================================================  */}

      <div className='mb-4'>
        <label
        className='block text-gray-700 font-medium mb-1'
        htmlFor="fullName">Full Name</label>
       <input
       onChange={(e)=>setFullName(e.target.value)}
       value={fullName}
       className='w-full border rounded-lg px-3 py-2 focus:outline-none
       focus:border-orange-500'
       type="text" placeholder='Enter your Full Name'
       style={{border:`1px solid ${borderColor}`}}
       /> 
        </div> 


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

         {/* MOBILE====================================================  */}

         <div className='mb-4'>
        <label
        className='block text-gray-700 font-medium mb-1'
        htmlFor="mobile">Mobile</label>
       <input
        onChange={(e)=>setMobile(e.target.value)}
        value={mobile}
       className='w-full border rounded-lg px-3 py-2 focus:outline-none
       focus:border-orange-500'
       type="text" placeholder='Enter your Mobile Number'
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


        {/* ROLE================================================= */}
        <div className='mb-4'>
        <label
        className='block text-gray-700 font-medium mb-1'
        htmlFor="role">Role</label>
        <div className='flex gap-2'>
        {["user","owner","deliveryBoy"].map((r)=>(
          <button className='flex-1 border rounded-lg px-3 py-2 text-center
          font-medium transition-colors cursor-pointer'
          onClick={()=>setRole(r)}
          style={
            role==r?
            {backgroundColor:primaryColor, color:'white'}
            :{border: `1px solid${primaryColor}`,color:"#333"} 
          }
          >{r}</button>
        ))}
       </div>
        </div>  

      <button
      onClick={handleSignUp}
      className={`w-full mt-4 flex items-center justify-center gap-2 
      border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] 
      text-white hover:bg-[#e64323] cursor-pointer `}
      
      >
        Sign Up
        </button>

        {/* GOOGLE SINGUP================================================= */}

       <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg
       px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100
       cursor-pointer'>
        <FcGoogle size={20}/>
        <span>Sign Up With Google</span>
        </button> 
        <p
        onClick={()=>navigate("/signin")}
        className='text-center mt-6 cursor-pointer'
        >Already have an account? <span className='text-[#e64323]'>Sign In</span> </p>
      </div>

    </div>
  )
}

export default SingUp