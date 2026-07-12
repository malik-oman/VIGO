import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ServerUrl } from '../App';
import { setUserData } from '../redux/userSlice';

// Lucide React icons (ya react-icons bhi chalega)
import { Search, X, ShoppingCart, MapPin, LogOut, Package } from 'lucide-react';

const Nav = () => {
  const { userData, city } = useSelector((state) => state.user);
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

  return (
    <>
      {/* ===== MAIN NAVBAR ===== */}
      <nav
        className="w-full h-[72px] flex items-center justify-between 
        px-4 sm:px-6 lg:px-10 fixed top-0 z-[9999] 
        bg-[#fff9f6]/85 backdrop-blur-[20px] saturate-[180%]
        border-b border-orange-100/50 
        shadow-[0_4px_30px_rgba(255,77,45,0.06)] 
        overflow-visible"
      >
        {/* --- Logo --- */}
        <div className="flex items-center gap-2 shrink-0">
          <h1
            className="text-2xl sm:text-3xl font-black tracking-tight cursor-pointer select-none"
            style={{
              background: 'linear-gradient(90deg, #ff4d2d 0%, #ff6b4f 25%, #ff8f70 50%, #ff6b4f 75%, #ff4d2d 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 3s linear infinite',
            }}
          >
            Vingo
          </h1>
          <span className="hidden sm:block w-2 h-2 rounded-full bg-[#ff4d2d] animate-pulse mt-1" />
        </div>

        {/* --- Desktop Search Bar --- */}
        <div
          className="hidden md:flex items-center w-[55%] lg:w-[45%] xl:w-[40%] 
          max-w-[600px] h-[52px] 
          bg-white/95 backdrop-blur-[16px] saturate-[180%]
          rounded-2xl border border-orange-100/60 
          shadow-[0_2px_20px_rgba(255,77,45,0.08)] 
          overflow-hidden transition-all duration-300 
          hover:shadow-[0_4px_30px_rgba(255,77,45,0.12)] 
          hover:border-orange-200/80"
        >
          {/* Location Section */}
          <div
            className="flex items-center gap-2.5 px-4 py-2 
            border-r border-orange-200/50 
            min-w-[140px] lg:min-w-[160px] cursor-pointer group 
            rounded-l-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,77,45,0.08) 0%, rgba(255,77,45,0.03) 100%)',
            }}
          >
            <div className="p-1.5 rounded-full bg-[#ff4d2d]/10 group-hover:bg-[#ff4d2d]/20 transition-all duration-300">
              <MapPin size={18} className="text-[#ff4d2d]" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                Location
              </span>
              <span className="text-sm font-semibold text-gray-700 truncate max-w-[100px]">
                {city}
              </span>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex-1 flex items-center gap-3 px-4">
            <Search
              size={20}
              className="text-gray-400 transition-all duration-300 shrink-0"
              strokeWidth={2.5}
            />
            <input
              type="text"
              placeholder="Search delicious food..."
              className="w-full bg-transparent text-gray-700 text-sm font-medium 
              placeholder:text-gray-400 outline-none"
            />
          </div>
        </div>

        {/* --- Right Actions --- */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2.5 rounded-xl hover:bg-[#ff4d2d]/10 
            transition-all duration-300 active:scale-90"
          >
            {showSearch ? (
              <X size={20} className="text-[#ff4d2d]" strokeWidth={2.5} />
            ) : (
              <Search size={20} className="text-[#ff4d2d]" strokeWidth={2.5} />
            )}
          </button>

          {/* Cart */}
          <button
            className="relative p-2.5 rounded-xl hover:bg-[#ff4d2d]/10 
            transition-all duration-300 active:scale-90 group"
          >
            <ShoppingCart
              size={22}
              className="text-[#ff4d2d] transition-transform duration-300 group-hover:scale-110"
              strokeWidth={2}
            />
            <span
              className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full 
              text-white text-[10px] font-bold flex items-center justify-center 
              shadow-lg shadow-orange-500/30"
              style={{
                background: 'linear-gradient(135deg, #ff4d2d 0%, #ff6b4f 100%)',
              }}
            >
              0
            </span>
          </button>

          {/* My Orders Button */}
          <button
            className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl 
            text-[#ff4d2d] text-sm font-semibold 
            border border-[#ff4d2d]/10 
            transition-all duration-300 
            hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgba(255,77,45,0.15)]"
            style={{
              background: 'linear-gradient(135deg, rgba(255,77,45,0.10) 0%, rgba(255,107,79,0.10) 100%)',
            }}
          >
            <Package size={16} strokeWidth={2.5} />
            My Orders
          </button>

          {/* Avatar */}
          <div className="relative">
            <button
              onClick={() => setInfo(!info)}
              className="w-10 h-10 rounded-full text-white text-sm font-bold 
              shadow-lg shadow-orange-500/30 flex items-center justify-center 
              hover:shadow-orange-500/50 transition-all duration-300 
              hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #ff4d2d 0%, #ff6b4f 100%)',
                animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            >
              {userData?.fullName?.slice(0, 1)}
            </button>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE SEARCH OVERLAY ===== */}
      {showSearch && (
        <div
          className="md:hidden fixed top-[72px] left-0 right-0 mx-4 
          h-[56px] bg-white/95 backdrop-blur-[16px] saturate-[180%]
          rounded-2xl border border-orange-100/60 
          shadow-[0_4px_20px_rgba(255,77,45,0.1)] 
          flex items-center overflow-hidden z-[9998]"
          style={{
            animation: 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {/* Mobile Location (VISIBLE!) */}
          <div
            className="flex items-center gap-2 px-3 py-2 
            border-r border-orange-200/50 min-w-[100px] rounded-l-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,77,45,0.08) 0%, rgba(255,77,45,0.03) 100%)',
            }}
          >
            <MapPin size={16} className="text-[#ff4d2d]" strokeWidth={2.5} />
            <div className="flex flex-col leading-tight">
              <span className="text-[9px] text-gray-400 font-medium">Location</span>
              <span className="text-xs font-semibold text-gray-700 truncate">
                {city}
              </span>
            </div>
          </div>

          <div className="flex-1 flex items-center gap-2 px-3">
            <Search size={18} className="text-[#ff4d2d]" strokeWidth={2.5} />
            <input
              type="text"
              placeholder="Search food..."
              className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
          </div>

          <button
            onClick={() => setShowSearch(false)}
            className="p-2 mr-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={18} className="text-[#ff4d2d]" strokeWidth={2.5} />
          </button>
        </div>
      )}

      {/* ===== USER DROPDOWN ===== */}
      {info && (
        <div
          className="fixed top-[80px] right-3 sm:right-6 lg:right-10 
          w-[200px] bg-white/98 backdrop-blur-[24px] saturate-[200%]
          rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] 
          border border-orange-100/50 p-2 z-[9999] overflow-hidden"
          style={{
            animation: 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-orange-100/50">
            <p className="text-sm font-bold text-gray-800">{userData?.fullName}</p>
            <p className="text-xs text-gray-400 mt-0.5">Welcome back!</p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {/* My Orders (Mobile pe bhi dikhayega) */}
            <button
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-600 
              rounded-xl flex items-center gap-2.5 
              transition-all duration-200 
              hover:pl-5 hover:text-[#ff4d2d]"
              style={{
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,77,45,0.06) 0%, rgba(255,77,45,0.02) 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Package size={16} strokeWidth={2} />
              My Orders
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-600 
              rounded-xl flex items-center gap-2.5 
              transition-all duration-200 
              hover:pl-5 hover:text-[#ff4d2d]"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,77,45,0.06) 0%, rgba(255,77,45,0.02) 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <LogOut size={16} strokeWidth={2} />
              Log Out
            </button>
          </div>
        </div>
      )}

      {/* ===== KEYFRAME STYLES (Add to your global CSS / Tailwind config) ===== */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 77, 45, 0.4); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(255, 77, 45, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 77, 45, 0); }
        }
      `}</style>
    </>
  );
};

export default Nav;