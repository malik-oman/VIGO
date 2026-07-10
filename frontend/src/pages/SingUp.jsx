import React, { useState } from 'react'
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoFastFoodOutline } from "react-icons/io5";
import { TbMotorbike } from "react-icons/tb";
import { HiOutlineHome } from "react-icons/hi2";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ServerUrl } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';

const SingUp = () => {

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState("user")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mobile, setMobile] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const roles = [
    { key: "user", label: "Customer", icon: HiOutlineHome },
    { key: "owner", label: "Restaurant", icon: IoFastFoodOutline },
    { key: "deliveryBoy", label: "Rider", icon: TbMotorbike },
  ]

  // VALIDATION ======================================================
  const validateForm = () => {
    const newErrors = {}

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address"
    }

    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required"
    } else if (!/^\d{10,}$/.test(mobile)) {
      newErrors.mobile = "Mobile number must be at least 10 digits"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // small helper to clear a single field's error as the user types
  const clearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[field]
        return copy
      })
    }
  }

  // reusable, polished inline error message
  const FieldError = ({ message }) => {
    if (!message) return null
    return (
      <p className="flex items-center gap-1.5 mt-1.5 text-[12.5px] font-medium text-red-500 animate-[fadeIn_0.2s_ease-in-out]">
        <MdErrorOutline size={14} className="shrink-0" />
        {message}
      </p>
    )
  }

  // SIGNUP CONTROLLER==============================================
  const handleSignUp = async () => {
    if (!validateForm()) return

    try {
      setLoading(true)
      const result = await axios.post(`${ServerUrl}/api/auth/signup`, {
        fullName, email, password, mobile, role
      }, { withCredentials: true })

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    if (!mobile) {
      return alert("Mobile Number is Required")
    }
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth,provider)
    try {
      const {data} = await axios.post(`${ServerUrl}/api/auth/google-auth`,{
        fullName:result.user.displayName,
        email:result.user.email,
        role,
        mobile
      },{withCredentials:true})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    // flex-col added for mobile, lg:flex-row for desktop
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#fff9f6]">

      {/* LEFT — BRAND / HERO PANEL ===================================== */}
      {/* Changed from hidden lg:flex to always flex, adjusted height for mobile */}
      <div className="w-full lg:w-[46%] relative overflow-hidden bg-gradient-to-br from-[#ff4d2d] via-[#ff6b3d] to-[#ff9a56] min-h-[35vh] lg:min-h-screen flex flex-col">

        {/* ambient blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 -right-16 w-80 h-80 rounded-full bg-[#8b1e0f]/30 blur-3xl" />
        <div className="absolute top-1/3 right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />

        <div className="relative z-10 flex flex-col justify-between w-full px-8 sm:px-12 py-8 lg:py-14 text-white flex-1">

          <div>
            {/* Mobile Brand Mark (Centered on mobile, left on desktop) */}
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
              Hot meals,<br />delivered in <span className="text-white/80">minutes.</span>
            </h1>
            <p className="mt-3 lg:mt-4 text-white/80 text-sm sm:text-[15px] max-w-sm leading-relaxed text-center lg:text-left mx-auto lg:mx-0">
              Join thousands of hungry customers, restaurants, and riders already moving on Vingo.
            </p>
          </div>

          {/* signature: delivery route */}
          <div className="relative py-4 lg:py-6">
            <div className="flex items-center justify-between max-w-[250px] sm:max-w-sm mx-auto lg:mx-0">
              {[
                { icon: IoFastFoodOutline, label: "Kitchen" },
                { icon: TbMotorbike, label: "On the way" },
                { icon: HiOutlineHome, label: "Your door" },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 lg:gap-2 z-10">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white text-[#ff4d2d] flex items-center justify-center shadow-lg shadow-black/10 transition-transform hover:scale-110">
                    <step.icon size={16} className="lg:hidden" />
                    <step.icon size={20} className="hidden lg:block" />
                  </div>
                  <span className="text-[10px] lg:text-xs font-medium text-white/85">{step.label}</span>
                </div>
              ))}
            </div>
            <div className="absolute top-5 lg:top-6 left-8 lg:left-6 right-8 lg:right-6 border-t-2 border-dashed border-white/40" />
          </div>

          <p className="text-white/60 text-xs hidden lg:block">© {new Date().getFullYear()} Vingo Foods, Inc.</p>
        </div>
      </div>

      {/* RIGHT — FORM PANEL ============================================= */}
      {/* Added negative margin, rounded top corners, and shadow for mobile "Bottom Sheet" effect */}
      <div className="flex-1 flex items-start lg:items-center justify-center p-6 sm:p-8 lg:p-10 
                      -mt-10 lg:mt-0 relative z-20 
                      bg-white rounded-t-[2.5rem] lg:rounded-none 
                      shadow-[0_-10px_40px_rgba(0,0,0,0.05)] lg:shadow-none 
                      min-h-[65vh] lg:min-h-screen">
        <div className="w-full max-w-md pt-6 lg:pt-0">

          <h2 className="text-xl sm:text-[1.7rem] font-extrabold text-[#1f1f1f] tracking-tight text-center lg:text-left">
            Create your account
          </h2>
          <p className="text-gray-500 mt-1.5 mb-8 text-sm sm:text-[15px] text-center lg:text-left">
            Get started with delicious food deliveries today.
          </p>

          <div className="space-y-4">

            {/* FULL NAME */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-1.5">Full name</label>
              <input
                id="fullName"
                onChange={(e) => { setFullName(e.target.value); clearError("fullName") }}
                value={fullName}
                type="text"
                placeholder="Jordan Lee"
                className={`w-full rounded-xl border ${errors.fullName ? "border-red-400 bg-red-50/40 focus:ring-red-100 focus:border-red-400" : "border-gray-200 bg-gray-50/50 focus:border-[#ff4d2d] focus:ring-[#ff4d2d]/10"} px-4 py-3.5 text-[15px]
                  text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-300
                  focus:bg-white focus:ring-4 hover:border-gray-300`}
              />
              <FieldError message={errors.fullName} />
            </div>

            {/* EMAIL */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
              <input
                id="email"
                onChange={(e) => { setEmail(e.target.value); clearError("email") }}
                value={email}
                type="email"
                placeholder="you@example.com"
                className={`w-full rounded-xl border ${errors.email ? "border-red-400 bg-red-50/40 focus:ring-red-100 focus:border-red-400" : "border-gray-200 bg-gray-50/50 focus:border-[#ff4d2d] focus:ring-[#ff4d2d]/10"} px-4 py-3.5 text-[15px]
                  text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-300
                  focus:bg-white focus:ring-4 hover:border-gray-300`}
              />
              <FieldError message={errors.email} />
            </div>

            {/* MOBILE */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile number</label>
              <input
                id="mobile"
                onChange={(e) => { setMobile(e.target.value); clearError("mobile") }}
                value={mobile}
                type="tel"
                placeholder="+1 (555) 000-0000"
                className={`w-full rounded-xl border ${errors.mobile ? "border-red-400 bg-red-50/40 focus:ring-red-100 focus:border-red-400" : "border-gray-200 bg-gray-50/50 focus:border-[#ff4d2d] focus:ring-[#ff4d2d]/10"} px-4 py-3.5 text-[15px]
                  text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-300
                  focus:bg-white focus:ring-4 hover:border-gray-300`}
              />
              <FieldError message={errors.mobile} />
            </div>

            {/* PASSWORD */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  id="password"
                  onChange={(e) => { setPassword(e.target.value); clearError("password") }}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className={`w-full rounded-xl border ${errors.password ? "border-red-400 bg-red-50/40 focus:ring-red-100 focus:border-red-400" : "border-gray-200 bg-gray-50/50 focus:border-[#ff4d2d] focus:ring-[#ff4d2d]/10"} px-4 py-3.5 pr-12 text-[15px]
                    text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-300
                    focus:bg-white focus:ring-4 hover:border-gray-300`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#ff4d2d] transition-colors cursor-pointer"
                >
                  {showPassword ? <FaEye size={18} /> : <FaRegEyeSlash size={18} />}
                </button>
              </div>
              <FieldError message={errors.password} />
            </div>

            {/* ROLE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">I'm signing up as</label>
              <div className="grid grid-cols-3 gap-2.5">
                {roles.map(({ key, label, icon: Icon }) => {
                  const active = role === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setRole(key)}
                      className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border
                        px-2 py-3 text-xs sm:text-[13px] font-semibold cursor-pointer transition-all duration-300
                        ${active
                          ? "border-transparent bg-gradient-to-br from-[#ff4d2d] to-[#ff7a4d] text-white shadow-lg shadow-[#ff4d2d]/25 scale-[1.02]"
                          : "border-gray-200 text-gray-600 hover:border-[#ff4d2d]/40 hover:bg-[#fff3ef]"
                        }`}
                    >
                      <Icon size={18} />
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* SUBMIT */}
            <button
              onClick={handleSignUp}
              disabled={loading}
              className="w-full mt-2 rounded-xl px-4 py-3.5 text-[15px] font-bold text-white
                bg-gradient-to-r from-[#ff4d2d] to-[#ff7a4d] shadow-lg shadow-[#ff4d2d]/30
                transition-all duration-300 hover:shadow-xl hover:shadow-[#ff4d2d]/40
                hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]
                disabled:opacity-60 disabled:hover:translate-y-0 cursor-pointer"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>

            {/* DIVIDER */}
            <div className="flex items-center gap-3 py-1">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-medium text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* GOOGLE */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-2.5 rounded-xl border
                border-gray-200 bg-white px-4 py-3.5 text-[15px] font-semibold text-gray-700
                transition-all duration-300 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm cursor-pointer"
            >
              <FcGoogle size={19} />
              Sign up with Google
            </button>
          </div>

          <p onClick={() => navigate("/signin")}
            className="text-center mt-8 text-[14px] text-gray-500 cursor-pointer">
            Already have an account?{" "}
            <span className="font-semibold text-[#ff4d2d] hover:text-[#e64323] transition-colors">
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SingUp