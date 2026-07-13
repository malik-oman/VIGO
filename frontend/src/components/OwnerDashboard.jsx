import React from 'react'
import Nav from './Nav'
import { useSelector } from 'react-redux'
import { FaUtensils, FaStore, FaChartLine, FaClipboardList, FaStar, FaUsers } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const OwnerDashboard = () => {
  const navigate = useNavigate()
  const { myShopData } = useSelector(state => state.owner)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 }
    }
  }

  // Stats cards data
  const statsData = [
    { icon: FaChartLine, label: 'Total Orders', value: '0', color: 'from-blue-500 to-blue-600' },
    { icon: FaUsers, label: 'Customers', value: '0', color: 'from-purple-500 to-purple-600' },
    { icon: FaStar, label: 'Rating', value: '0.0', color: 'from-yellow-500 to-yellow-600' },
    { icon: FaClipboardList, label: 'Menu Items', value: '0', color: 'from-green-500 to-green-600' },
  ]

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-[#fff9f6] via-white to-[#fff5f0]'>
      <Nav />

      {!myShopData ? (
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
      ) : (
        // Dashboard View when restaurant exists
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12'
        >
          {/* Welcome Section */}
          <motion.div variants={itemVariants} className='mb-8'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800'>
              Welcome back, <span className='bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a] bg-clip-text text-transparent'>
                {myShopData?.name || 'Owner'}!
              </span>
            </h1>
            <p className='text-gray-500 mt-2 text-sm sm:text-base'>
              Here's what's happening with your restaurant today
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants} className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8'>
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`bg-gradient-to-br ${stat.color} rounded-2xl p-5 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-xs sm:text-sm opacity-80 font-medium'>{stat.label}</p>
                    <p className='text-2xl sm:text-3xl font-bold mt-1'>{stat.value}</p>
                  </div>
                  <stat.icon className='w-8 h-8 sm:w-10 sm:h-10 opacity-60' />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <h2 className='text-lg sm:text-xl font-semibold text-gray-700 mb-4'>Quick Actions</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4'>
              {[
                { label: 'Edit Menu', icon: FaUtensils, color: 'from-blue-400 to-blue-500', action: '/create-edit-shop' },
                { label: 'View Orders', icon: FaClipboardList, color: 'from-green-400 to-green-500', action: '/orders' },
                { label: 'Analytics', icon: FaChartLine, color: 'from-purple-400 to-purple-500', action: '/analytics' },
                { label: 'Manage Shop', icon: FaStore, color: 'from-orange-400 to-orange-500', action: '/create-edit-shop' },
              ].map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(item.action)}
                  className={`bg-gradient-to-br ${item.color} p-4 sm:p-5 rounded-xl text-white shadow-md hover:shadow-lg transition-all duration-300 text-center`}
                >
                  <item.icon className='w-6 h-6 sm:w-7 sm:h-7 mx-auto mb-2' />
                  <span className='text-xs sm:text-sm font-medium'>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default OwnerDashboard