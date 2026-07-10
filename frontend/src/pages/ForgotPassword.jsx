import React, { useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { TbMotorbike } from "react-icons/tb";
import { HiOutlineHome } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ServerUrl } from '../App';

const ForgotPassword = () => {

  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const steps = [
    { key: 1, label: "Email" },
    { key: 2, label: "Verify" },
    { key: 3, label: "Reset" },
  ]

  // Updated Input & Button Classes for smooth feel
  const inputClass = "w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5 text-[15px]" +
    " text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-300" +
    " focus:bg-white focus:border-[#ff4d2d] focus:ring-4 focus:ring-[#ff4d2d]/10 hover:border-gray-300"

  const buttonClass = "w-full mt-2 rounded-xl px-4 py-3.5 text-[15px] font-bold text-white" +
    " bg-gradient-to-r from-[#ff4d2d] to-[#ff7a4d] shadow-lg shadow-[#ff4d2d]/30" +
    " transition-all duration-300 hover:shadow-xl hover:shadow-[#ff4d2d]/40" +
    " hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]" +
    " disabled:opacity-60 disabled:hover:translate-y-0 cursor-pointer"

  // CONTROLLERS==============================================
  const handleSendOtp = async () => {
    try {
     const result = await axios.post(`${ServerUrl}/api/auth/send-otp`,{email},{withCredentials:true})
      setStep(2)
    } catch (error) {
      console.log(error)
    }
  }

  const handleVerifyOtp = async () => {
    try {
     const result = await axios.post(`${ServerUrl}/api/auth/verify-otp`,{email,otp},{withCredentials:true})
      setStep(3)
    } catch (error) {
      console.log(error)
    }
  }

  const handleResetPassword = async () => {
    if (newPassword!=confirmPassword) {
      return null
    }
    try {
     const result = await axios.post(`${ServerUrl}/api/auth/reset-password`,{email,newPassword},{withCredentials:true})
      navigate("/signin")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    // flex-col for mobile, lg:flex-row for desktop
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#fff9f6]">

      {/* LEFT — BRAND / HERO PANEL ===================================== */}
      {/* Now visible on mobile with adjusted height */}
      <div className="w-full lg:w-[46%] relative overflow-hidden bg-gradient-to-br from-[#ff4d2d] via-[#ff6b3d] to-[#ff9a56] min-h-[35vh] lg:min-h-screen flex flex-col">

        {/* ambient blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 -right-16 w-80 h-80 rounded-full bg-[#8b1e0f]/30 blur-3xl" />
        <div className="absolute top-1/3 right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />

        <div className="relative z-10 flex flex-col justify-between w-full px-8 sm:px-12 py-8 lg:py-14 text-white flex-1">

          <div>
            {/* Mobile Brand Mark (Centered) */}
            <div className="flex lg:hidden items-center justify-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                <IoFastFoodOutline size={18} />
              </div>
              <span className="text-xl font-extrabold tracking-tight">Vingo</span>
            </div>

            {/* Desktop Brand Mark */}
            <div className="hidden lg:flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                <IoFastFoodOutline size={22} />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">Vingo</span>
            </div>

            <h1 className="mt-6 lg:mt-16 text-center lg:text-left text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.1] font-extrabold tracking-tight">
              Let's get you<br />back <span className="text-white/80">in.</span>
            </h1>
            <p className="mt-3 lg:mt-4 text-white/80 text-sm sm:text-[15px] max-w-sm leading-relaxed text-center lg:text-left mx-auto lg:mx-0">
              Verify your email, confirm the code, and set a fresh password in three quick steps.
            </p>
          </div>

          {/* signature: delivery route */}
          <div className="relative py-4 lg:py-6">
            <div className="flex items-center justify-between max-w-[250px] sm:max-w-sm mx-auto lg:mx-0">
              {[
                { icon: IoFastFoodOutline, label: "Kitchen" },
                { icon: TbMotorbike, label: "On the way" },
                { icon: HiOutlineHome, label: "Your door" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 lg:gap-2 z-10">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white text-[#ff4d2d] flex items-center justify-center shadow-lg shadow-black/10 transition-transform hover:scale-110">
                    <s.icon size={16} className="lg:hidden" />
                    <s.icon size={20} className="hidden lg:block" />
                  </div>
                  <span className="text-[10px] lg:text-xs font-medium text-white/85">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="absolute top-5 lg:top-6 left-8 lg:left-6 right-8 lg:right-6 border-t-2 border-dashed border-white/40" />
          </div>

          <p className="text-white/60 text-xs hidden lg:block">© {new Date().getFullYear()} Vingo Foods, Inc.</p>
        </div>
      </div>

      {/* RIGHT — FORM PANEL ============================================= */}
      {/* Bottom sheet effect for mobile, normal for desktop */}
      <div className="flex-1 flex items-start lg:items-center justify-center p-6 sm:p-8 lg:p-10 
                      -mt-10 lg:mt-0 relative z-20 
                      bg-white rounded-t-[2.5rem] lg:rounded-none 
                      shadow-[0_-10px_40px_rgba(0,0,0,0.05)] lg:shadow-none 
                      min-h-[65vh] lg:min-h-screen">
        <div className="w-full max-w-md pt-6 lg:pt-0">

          {/* header with back button */}
          <div className="flex items-center gap-2 mb-2 text-center lg:text-left">
            <button
              onClick={() => step === 1 ? navigate("/signin") : setStep(step - 1)}
              className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center text-[#ff4d2d]
                hover:bg-[#fff3ef] transition-colors cursor-pointer"
            >
              <IoIosArrowRoundBack size={26} />
            </button>
            <h2 className="text-xl sm:text-[1.7rem] font-extrabold text-[#1f1f1f] tracking-tight">
              Forgot password
            </h2>
          </div>
          
          <p className="text-gray-500 mt-1 mb-7 text-sm sm:text-[15px] text-center lg:text-left pl-11 lg:pl-0">
            {step === 1 && "Enter your email and we'll send you a reset code."}
            {step === 2 && `We sent a 6-digit code to ${email || "your email"}.`}
            {step === 3 && "Choose a new password for your account."}
          </p>

          {/* STEP PROGRESS */}
          <div className="flex items-center mb-8 px-4 lg:px-0">
            {steps.map((s, i) => (
              <React.Fragment key={s.key}>
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px]
                    font-bold transition-all duration-300
                    ${step === s.key
                      ? "bg-gradient-to-br from-[#ff4d2d] to-[#ff7a4d] text-white shadow-md shadow-[#ff4d2d]/30"
                      : step > s.key
                        ? "bg-[#ff4d2d]/15 text-[#ff4d2d]"
                        : "bg-gray-100 text-gray-400"
                    }`}>
                    {step > s.key ? "✓" : s.key}
                  </div>
                  <span className={`text-[11px] font-medium ${step >= s.key ? "text-gray-700" : "text-gray-400"}`}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-[2px] mx-2 mb-4 rounded-full transition-all duration-300
                    ${step > s.key ? "bg-[#ff4d2d]" : "bg-gray-200"}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* ================ STEP 1 ===================================== */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email address
                </label>
                <input
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
              <button onClick={handleSendOtp} disabled={loading} className={buttonClass}>
                {loading ? "Sending…" : "Send OTP"}
              </button>
            </div>
          )}

          {/* ================ STEP 2 ===================================== */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  One-time code
                </label>
                <input
                  id="otp"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="6-digit code"
                  className={`${inputClass} tracking-[0.5em] text-center font-semibold`}
                />
              </div>
              <button onClick={handleVerifyOtp} disabled={loading} className={buttonClass}>
                {loading ? "Verifying…" : "Verify OTP"}
              </button>
              <p className="text-center text-[13px] text-gray-500">
                Didn't get a code?{" "}
                <span onClick={handleSendOtp} className="font-semibold text-[#ff4d2d] hover:text-[#e64323]
                  transition-colors cursor-pointer">
                  Resend
                </span>
              </p>
            </div>
          )}

          {/* ===================================== STEP 3 ====================== */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  New password
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className={`${inputClass} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#ff4d2d] transition-colors cursor-pointer"
                  >
                    {showNewPassword ? <FaEye size={18} /> : <FaRegEyeSlash size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter new password"
                    className={`${inputClass} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#ff4d2d] transition-colors cursor-pointer"
                  >
                    {showConfirmPassword ? <FaEye size={18} /> : <FaRegEyeSlash size={18} />}
                  </button>
                </div>
              </div>

              <button onClick={handleResetPassword} disabled={loading} className={buttonClass}>
                {loading ? "Resetting…" : "Reset password"}
              </button>
            </div>
          )}

          <p onClick={() => navigate("/signin")}
            className="text-center mt-8 text-[14px] text-gray-500 cursor-pointer">
            Remembered your password?{" "}
            <span className="font-semibold text-[#ff4d2d] hover:text-[#e64323] transition-colors">
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword