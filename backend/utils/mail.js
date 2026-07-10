import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
   service:"Gmail",
    port: 465,
    secure: true, 
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });


  export const sendOtpMail = async (to, otp) => {
    await transporter.sendMail({
        from: process.env.SMTP_EMAI,
        to,
        subject:"Reset Your Password",
        html:`Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.`
    })
  }