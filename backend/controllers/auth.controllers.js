import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import genToken from "../utils/token.js"

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


