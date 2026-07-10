import React, { useState } from 'react'
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoFastFoodOutline } from "react-icons/io5";
import { TbMotorbike } from "react-icons/tb";
import { HiOutlineHome } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ServerUrl } from '../App';

const SingUp = () => {

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState("user")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mobile, setMobile] = useState("")
  const [loading, setLoading] = useState(false)

  const roles = [
    { key: "user", label: "Customer", icon: HiOutlineHome },
    { key: "owner", label: "Restaurant", icon: IoFastFoodOutline },
    { key: "deliveryBoy", label: "Rider", icon: TbMotorbike },
  ]

  // SIGNUP CONTROLLER==============================================
  const handleSignUp = async () => {
    try {
      setLoading(true)
      const result = await axios.post(`${ServerUrl}/api/auth/signup`, {
        fullName,
        email,
        password,
        mobile,
        role
      }, { withCredentials: true })

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex bg-[#fff9f6]">

      {/* LEFT — BRAND / HERO PANEL ===================================== */}
      <div className="hidden lg:flex lg:w-[46%] relative overflow-hidden
        bg-gradient-to-br from-[#ff4d2d] via-[#ff6b3d] to-[#ff9a56]">

        {/* ambient blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 -right-16 w-80 h-80 rounded-full bg-[#8b1e0f]/30 blur-3xl" />
        <div className="absolute top-1/3 right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />

        <div className="relative z-10 flex flex-col justify-between w-full px-12 py-14 text-white">

          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center
                justify-center border border-white/20">
                <IoFastFoodOutline size={22} />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">Vingo</span>
            </div>

            <h1 className="mt-16 text-[2.6rem] leading-[1.1] font-extrabold tracking-tight">
              Hot meals,<br />delivered in <span className="text-white/80">minutes.</span>
            </h1>
            <p className="mt-4 text-white/80 text-[15px] max-w-sm leading-relaxed">
              Join thousands of hungry customers, restaurants, and riders
              already moving on Vingo.
            </p>
          </div>

          {/* signature: delivery route */}
          <div className="relative py-6">
            <div className="flex items-center justify-between max-w-sm">
              {[
                { icon: IoFastFoodOutline, label: "Kitchen" },
                { icon: TbMotorbike, label: "On the way" },
                { icon: HiOutlineHome, label: "Your door" },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-2 z-10">
                  <div className="w-12 h-12 rounded-full bg-white text-[#ff4d2d] flex items-center
                    justify-center shadow-lg shadow-black/10">
                    <step.icon size={20} />
                  </div>
                  <span className="text-xs font-medium text-white/85">{step.label}</span>
                </div>
              ))}
            </div>
            <div className="absolute top-6 left-6 right-6 border-t-2 border-dashed border-white/40" />
          </div>

          <p className="text-white/60 text-xs">© {new Date().getFullYear()} Vingo Foods, Inc.</p>
        </div>
      </div>

      {/* RIGHT — FORM PANEL ============================================= */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">

          {/* mobile brand mark */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-[#ff4d2d] flex items-center justify-center text-white">
              <IoFastFoodOutline size={18} />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-[#1f1f1f]">Vingo</span>
          </div>

          <h2 className="text-[1.7rem] font-extrabold text-[#1f1f1f] tracking-tight">
            Create your account
          </h2>
          <p className="text-gray-500 mt-1.5 mb-8 text-[15px]">
            Get started with delicious food deliveries today.
          </p>

          <div className="space-y-4">

            {/* FULL NAME */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Full name
              </label>
              <input
                id="fullName"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                type="text"
                placeholder="Jordan Lee"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.75 text-[15px]
                  text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200
                  focus:border-[#ff4d2d] focus:ring-4 focus:ring-[#ff4d2d]/10 hover:border-gray-300"
              />
            </div>

            {/* EMAIL */}
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
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.75 text-[15px]
                  text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200
                  focus:border-[#ff4d2d] focus:ring-4 focus:ring-[#ff4d2d]/10 hover:border-gray-300"
              />
            </div>

            {/* MOBILE */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Mobile number
              </label>
              <input
                id="mobile"
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
                type="text"
                placeholder="+1 (555) 000-0000"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.75 text-[15px]
                  text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200
                  focus:border-[#ff4d2d] focus:ring-4 focus:ring-[#ff4d2d]/10 hover:border-gray-300"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.75 pr-11 text-[15px]
                    text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200
                    focus:border-[#ff4d2d] focus:ring-4 focus:ring-[#ff4d2d]/10 hover:border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400
                    hover:text-gray-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <FaEye size={17} /> : <FaRegEyeSlash size={17} />}
                </button>
              </div>
            </div>

            {/* ROLE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                I'm signing up as
              </label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map(({ key, label, icon: Icon }) => {
                  const active = role === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setRole(key)}
                      className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border
                        px-2 py-3 text-[13px] font-semibold cursor-pointer transition-all duration-200
                        ${active
                          ? "border-transparent bg-gradient-to-br from-[#ff4d2d] to-[#ff7a4d] text-white shadow-md shadow-[#ff4d2d]/25 scale-[1.02]"
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
              className="w-full mt-2 rounded-xl px-4 py-3 text-[15px] font-bold text-white
                bg-gradient-to-r from-[#ff4d2d] to-[#ff7a4d] shadow-lg shadow-[#ff4d2d]/30
                transition-all duration-200 hover:shadow-xl hover:shadow-[#ff4d2d]/40
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
              className="w-full flex items-center justify-center gap-2.5 rounded-xl border
                border-gray-200 bg-white px-4 py-2.75 text-[15px] font-semibold text-gray-700
                transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer"
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