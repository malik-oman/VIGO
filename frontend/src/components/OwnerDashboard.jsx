import React from 'react'
import Nav from './Nav'
import { useSelector } from 'react-redux'
import { FaUtensils, FaStore, FaChartLine, FaUsers, FaPen } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import OwnerItemCard from './OwnerItemCard'

const OwnerDashboard = () => {
  const navigate = useNavigate()
  const { myShopData } = useSelector(state => state.owner)

  

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-[#fff9f6] via-white to-[#fff5f0]'>
      <Nav />

      {!myShopData &&
        // Add Restaurant Section
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='flex justify-center items-center min-h-[calc(100vh-80px)] p-4 sm:p-6 md:p-8'
        >
          <div className='w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 sm:p-10 md:p-12 
            border border-white/50 hover:shadow-[0_20px_70px_-15px_rgba(255,77,45,0.3)] 
            transition-all duration-500 relative overflow-hidden group'
          >
            {/* Decorative gradient circles */}
            <div className='absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-[#ff4d2d]/10 to-[#ff6b4a]/5 rounded-full blur-3xl'></div>
            <div className='absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-[#ff4d2d]/10 to-[#ff6b4a]/5 rounded-full blur-3xl'></div>

            <div className='relative z-10 flex flex-col items-center text-center'>
              {/* Animated Icon Container */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className='relative'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a] rounded-full blur-xl opacity-20 animate-pulse'></div>
                <div className='w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-[#ff4d2d] to-[#ff6b4a] rounded-full 
                  flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300'
                >
                  <FaUtensils className='text-white w-12 h-12 sm:w-14 sm:h-14' />
                </div>
              </motion.div>

              <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mt-6 mb-3 
                bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'
              >
                Add Your Restaurant
              </h2>
              
              <p className='text-gray-600 text-base sm:text-lg md:text-xl mb-8 max-w-md mx-auto leading-relaxed'>
                Join our food delivery platform and reach thousands of hungry customers every day.
              </p>

              {/* Feature highlights */}
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 w-full mb-8'>
                {[
                  { icon: FaStore, text: 'Easy Setup' },
                  { icon: FaChartLine, text: 'Analytics' },
                  { icon: FaUsers, text: 'More Customers' }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className='flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors'
                  >
                    <feature.icon className='text-[#ff4d2d] w-5 h-5' />
                    <span className='text-xs sm:text-sm font-medium text-gray-700'>{feature.text}</span>
                  </motion.div>
                ))}
                <div className='col-span-2 sm:col-span-1'></div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/create-edit-shop")}
                className='bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a] text-white px-8 sm:px-10 py-3.5 rounded-full
                  font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 
                  cursor-pointer relative overflow-hidden group'
              >
                <span className='relative z-10'>Get Started</span>
                <div className='absolute inset-0 bg-gradient-to-r from-[#e63e1e] to-[#ff4d2d] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </motion.button>

              <p className='text-xs text-gray-400 mt-4'>
                🚀 Join 1000+ restaurant owners already on our platform
              </p>
            </div>
          </div>
        </motion.div>
      }

  {/* ==================================== SHOP DATA ============================ */}
      {myShopData && 
      <div className='w-full flex flex-col items-center gap-8 px-4 sm:px-6 pt-8'>
  
      {/* ======= SHOP HEADER ======= */}
      <h1 className='text-2xl sm:text-3xl text-gray-900 flex items-center gap-3 text-center font-bold'>
        <FaUtensils className='text-[#ff4d2d] w-10 h-10 sm:w-12 sm:h-12' />
        Welcome to {myShopData.name}
      </h1> 
    
      {/* ======= SHOP IMAGE CARD ======= */}
      <div className='bg-white shadow-lg rounded-2xl overflow-hidden border border-orange-100 hover:shadow-xl transition-all duration-300 w-full max-w-3xl relative group'>
        <button 
          onClick={()=>navigate("/create-edit-shop")}
          className='absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm text-[#ff4d2d] p-2.5 rounded-full shadow-md hover:bg-[#ff4d2d] hover:text-white transition-all duration-200 cursor-pointer'
        >
          <FaPen size={16}/>
        </button>
        <img src={myShopData.image} alt={myShopData.name} className='w-full h-52 sm:h-64 object-cover' />
        <div className='p-5 sm:p-6'>
          <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-1'>{myShopData.name}</h2>
          <p className='text-gray-500 text-sm font-medium'>{myShopData.city}, {myShopData.state}</p>
          <p className='text-gray-400 text-sm mt-1'>{myShopData.address}</p>
        </div>
      </div>
      
      {/* ======= EMPTY STATE (ADD FOOD) ======= */}
      {myShopData.item.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-md bg-white rounded-3xl shadow-xl border border-orange-100 p-8 sm:p-12 text-center'
        >
          <div className='w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#ff4d2d] to-[#ff6b4a] rounded-full flex items-center justify-center shadow-lg shadow-orange-200'>
            <FaUtensils className='text-white w-10 h-10' />
          </div>
    
          <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-3'>
            Add Your First Item
          </h2>
          
          <p className='text-gray-500 mb-8 leading-relaxed text-sm sm:text-base'>
            Share your delicious creations with thousands of hungry customers.
          </p>
    
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 15px 30px -10px rgba(255, 77, 45, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/add-food")}
            className='w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a] text-white rounded-full font-semibold shadow-lg shadow-[#ff4d2d]/25 cursor-pointer'
          >
            Add Food Item
          </motion.button>
        </motion.div>
      )}
      
    </div>}


    {myShopData && myShopData.item.length>0 && <div className='flex flex-col items-center gap-4
    w-full max-w-3xl mx-auto mt-9'>
      {myShopData.item.map((itm,index)=>(
        <OwnerItemCard data={itm} key={index}/>
      ))}
      </div>}   
    </div>
  )
}

export default OwnerDashboard