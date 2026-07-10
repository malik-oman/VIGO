import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import genToken from "../utils/token.js"
import { sendOtpMail } from "../utils/mail.js"

// ============================ SIGNUP CONTROLLER========================================
export const signUp = async (req,res) => {
    try {
        const {fullName,email,password,mobile,role} = req.body
        const existUser = await User.findOne({email})
        if (existUser) {
            return res.status(400).json({message:"User Already Exist."})
        }
        if (password.length < 6) {
            return res.status(400).json({message:"Password must be atleast."})
        }
        if (mobile.length < 10) {
            return res.status(400).json({message:"Mobile Number at least 10 digits."})
        }
        const hashedPassword = await bcrypt.hash(password,10)
       const  user = await User.create({
        fullName,
        email,
        password:hashedPassword,
        mobile,
        role
       })

       const token = await genToken(user._id)
       res.cookie("token",token,{
        secure:false,
        sameSite:"strict",
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
       });

       return res.status(201).json(user)

    } catch (error) {
        res.status(500).json({message:`Singup Error ${error}`})
    }
}

//=================================SIGN IN CONTROLLER====================================

export const signIn = async (req,res) => {
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message:"User Doest Not Exist."})
        }
      

    const isMatch = await bcrypt.compare(password,user.password)
    if (!isMatch) {
        return res.status(400).json({message:"Incorrect password"})
    }

       const token = await genToken(user._id)
       res.cookie("token",token,{
        secure:false,
        sameSite:"strict", 
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
       });

       return res.status(200).json(user)

    } catch (error) {
        res.status(500).json({message:`Singin Error ${error}`})
    }
}

// =============================SING OUT CONTROLLER========================================

export const singOut = async (req,res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"logout sucessfully"})
    } catch (error) {
        res.status(500).json({message:`SingOut Error ${error}`})   
    }
}


// OTP SEND CONTROLLER=====================================

export const sendOtp = async (req,res) => {
    try {
        const {email} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user doest not exist"}) 
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        user.resetOtp = otp
        user.otpExpires =  Date.now()+5*60*1000
        user.isOtpVerified=false
        await user.save()
        sendOtpMail(email, otp)
        return res.status(200).json({message:"Otp Send Successfully"})
    } catch (error) {
        res.status(500).json({message:`send otp Error ${error}`})   
    }
}


//  ====================== VERIFY OTP============================================

export const verifyOtp = async (req,res) => {
    try {
       const {email, otp} = req.body
       const user = await User.findOne({email})
       if(!user || user.resetOtp !=otp || user.otpExpires < Date.now()  ){
        return res.status(400).json({message:"invalid/expired otp"}) 
    }
    user.isOtpVerified=true,
    user.resetOtp=undefined,
    user.otpExpires=undefined,
    await user.save()
    return res.status(200).json({message:"Otp Verify Successfully"})
    } catch (error) {
        res.status(500).json({message:`Otp Verify Error ${error}`})      
    }
}


// =============================RESET PASSWORD=======================================

export const resetPassword = async (req,res) => {
    try {
        const {email,newPassword} = req.body
        const user = await User.findOne({email})
        if(!user || !user.isOtpVerified){
            return res.status(400).json({message:"Otp verification reqired"}) 
        }
       const hashedPassword = await bcrypt.hash(newPassword,10) 
       user.password = hashedPassword
       user.isOtpVerified=false
       await user.save()
       return res.status(200).json({message:"Password Reset Successfully"})
    } catch (error) {
        res.status(500).json({message:`Reset Password Error ${error}`})      
    }
}


// =============================== GOOGLE AUTH CONTROLLER ===============================

export const googleAuth = async (req,res) => {
    try {
       const {fullName,email,mobile,role} = req.body
       let user = await User.findOne({email})
       if (!user) {
        user = await User.create({
            fullName,email,mobile,role
        })
       } 
       const token = await genToken(user._id)
       res.cookie("token",token,{
        secure:false,
        sameSite:false,
        maxAge:7*24*60*60*1000,
        httpOnly:true
       })

       return res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:`Google Auth  Error ${error}`})  
    }
}