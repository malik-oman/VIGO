import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'motion/react';
import axios from 'axios';
import { ServerUrl } from '../App';
import { setUserData } from '../redux/userSlice';

import { Search, X, ShoppingCart, MapPin, LogOut, Package } from 'lucide-react';
import { FaPlus } from 'react-icons/fa';
import { TbReceipt2 } from 'react-icons/tb';

const Nav = () => {
  const { userData, currentCity } = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.owner);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.get(`${ServerUrl}/api/auth/signout`, { withCredentials: true });
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  const [info, setInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  // Ref for Click Outside Logic
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setInfo(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* ===== INVISIBLE OVERLAY TO CLOSE DROPDOWN ===== */}
      <AnimatePresence>
        {info && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998]" 
            onClick={() => setInfo(false)}
          />
        )}
      </AnimatePresence>

      {/* ===== MAIN NAVBAR ===== */}
      <nav className="w-full h-[72px] flex items-center justify-between px-4 sm:px-6 lg:px-10 fixed top-0 z-[9999] bg-[#fff9f6]/80 backdrop-blur-xl border-b border-white/50 shadow-sm transition-all duration-300">
        
        {/* --- Logo --- */}
        <div className="flex items-center gap-2.5 shrink-0">
          <h1 className="text-3xl font-black tracking-tight cursor-pointer select-none bg-gradient-to-r from-[#ff4d2d] to-[#ff8f70] bg-clip-text text-transparent">
            Vingo
          </h1>
          <span className="hidden sm:block w-2 h-2 rounded-full bg-[#ff4d2d] animate-pulse mt-1" />
        </div>

        {/* --- Desktop Search Bar (Only for User) --- */}
        {userData?.role === "user" && (
          <div className="hidden md:flex items-center w-[55%] lg:w-[45%] xl:w-[40%] max-w-[600px] h-[52px] bg-white/90 backdrop-blur-lg rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="flex items-center gap-2.5 px-4 border-r border-gray-100 min-w-[140px] lg:min-w-[160px] cursor-pointer group">
              <div className="p-1.5 rounded-full bg-[#ff4d2d]/10 group-hover:bg-[#ff4d2d]/20 transition-colors">
                <MapPin size={18} className="text-[#ff4d2d]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Location</span>
                <span className="text-sm font-semibold text-gray-700 truncate max-w-[100px]">{currentCity}</span>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search size={20} className="text-gray-400 shrink-0" strokeWidth={2.5} />
              <input type="text" placeholder="Search delicious food..." className="w-full bg-transparent text-gray-700 text-sm font-medium placeholder:text-gray-400 outline-none" />
            </div>
          </div>
        )}

        {/* --- Right Actions --- */}
        <div className="flex items-center gap-2 sm:gap-3 relative" ref={menuRef}>
          
          {/* Mobile Search Toggle (Only for User) */}
          {userData?.role === "user" && (
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSearch(!showSearch)}
              className="md:hidden p-2.5 rounded-xl hover:bg-[#ff4d2d]/10 transition-colors"
            >
              {showSearch ? <X size={20} className="text-[#ff4d2d]" strokeWidth={2.5} /> : <Search size={20} className="text-[#ff4d2d]" strokeWidth={2.5} />}
            </motion.button>
          )}
         
          {/* Cart (Only for User) */}
          {userData?.role === "user" && (
            <button className="relative p-2.5 rounded-xl hover:bg-[#ff4d2d]/10 transition-all active:scale-90 group">
              <ShoppingCart size={22} className="text-[#ff4d2d] group-hover:scale-110 transition-transform" strokeWidth={2} />
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center bg-gradient-to-br from-[#ff4d2d] to-[#ff6b4f] shadow-md shadow-orange-500/30">
                0
              </span>
            </button>
          )}

          {/* =============== OWNER ACTIONS (Premium UI) =============== */}
          {userData?.role === "owner" && (
            <>
              {/* Add Food Item CTA */}
          { myShopData &&  <motion.button 
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(255, 77, 45, 0.3)" }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4f] text-white pl-3 pr-4 py-2.5 rounded-full shadow-lg shadow-orange-500/20 cursor-pointer"
              >
                <FaPlus size={14} />
                <span className="hidden sm:inline text-sm font-semibold">Add Food Item</span>
              </motion.button>}

              {/* Owner Orders Badge */}
              <button className="relative flex items-center gap-2 bg-white border border-gray-200 px-3 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer">
                <TbReceipt2 size={20} className="text-[#ff4d2d]" />
                <span className="hidden sm:inline text-sm font-semibold text-gray-700">My Orders</span>
                <span className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center text-[10px] font-bold text-white bg-[#ff4d2d] rounded-full px-1 shadow-sm">
                  0
                </span>
              </button>
            </>
          )}

          {/* My Orders Button (Only for User Desktop) */}
          {userData?.role === "user" && (
            <button className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl text-[#ff4d2d] text-sm font-semibold bg-[#ff4d2d]/5 border border-[#ff4d2d]/10 hover:bg-[#ff4d2d]/10 transition-all hover:-translate-y-0.5 hover:shadow-md">
              <Package size={16} strokeWidth={2.5} />
              My Orders
            </button>
          )}
        
          {/* Avatar */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setInfo(!info)}
            className="w-10 h-10 rounded-full text-white text-sm font-bold bg-gradient-to-br from-[#ff4d2d] to-[#ff6b4f] shadow-lg shadow-orange-500/25 flex items-center justify-center cursor-pointer hover:shadow-orange-500/40 transition-shadow"
          >
            {userData?.fullName?.slice(0, 1).toUpperCase()}
          </motion.button>
        </div>
      </nav>

      {/* ===== MOBILE SEARCH OVERLAY (Smooth Animation) ===== */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: "80px" }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed left-0 right-0 mx-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-100 shadow-2xl overflow-hidden z-[9998]"
          >
            <div className="flex items-center h-[56px]">
              <div className="flex items-center gap-2 px-3 border-r border-gray-100 min-w-[100px]">
                <MapPin size={16} className="text-[#ff4d2d]" strokeWidth={2.5} />
                <span className="text-xs font-semibold text-gray-700 truncate">{currentCity}</span>
              </div>
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search size={18} className="text-[#ff4d2d]" strokeWidth={2.5} />
                <input type="text" placeholder="Search food..." className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400" autoFocus />
              </div>
              <button onClick={() => setShowSearch(false)} className="p-2 mr-1 rounded-lg hover:bg-gray-100 transition-colors">
                <X size={18} className="text-[#ff4d2d]" strokeWidth={2.5} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== USER DROPDOWN MENU (Smooth Animation) ===== */}
      <AnimatePresence>
        {info && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-[80px] right-3 sm:right-6 lg:right-10 w-[220px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 p-2 z-[9999] overflow-hidden"
            ref={menuRef}
          >
            <div className="px-4 py-3 border-b border-gray-100 mb-1">
              <p className="text-sm font-bold text-gray-800 truncate">{userData?.fullName}</p>
              <p className="text-xs text-gray-400 mt-0.5 truncate">{userData?.email}</p>
            </div>

            <div className="py-1">
              <button className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-600 rounded-xl flex items-center gap-3 hover:bg-[#ff4d2d]/5 hover:text-[#ff4d2d] transition-colors">
                <Package size={16} strokeWidth={2} />
                My Orders
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-500 rounded-xl flex items-center gap-3 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} strokeWidth={2} />
                Log Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;