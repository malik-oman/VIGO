import React, { useState } from 'react'
import { FaUtensils, FaCamera, FaStore, FaMapMarkerAlt } from 'react-icons/fa'
import { IoIosArrowBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import { ServerUrl } from '../App'
import { setMyShopData } from '../redux/ownerSlice'

const CreateEditShop = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { myShopData } = useSelector(state => state.owner)
    const { currentCity, currentState, currentAddress } = useSelector(state => state.user)

    const [name, setName] = useState(myShopData?.name || "")
    const [address, setAddress] = useState(myShopData?.address || currentAddress)
    const [city, setCity] = useState(myShopData?.city || currentCity)
    const [state, setState] = useState(myShopData?.state || currentState)

    const [frontendImage, setFrontendImage] = useState(myShopData?.image || null)
    const [backendImage, setBackendImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleImage = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setFrontendImage(URL.createObjectURL(file))
        setBackendImage(file)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("city", city)
            formData.append("state", state)
            formData.append("address", address)
            if (backendImage) {
                formData.append("image", backendImage)
            }
            const result = await axios.post(`${ServerUrl}/api/shop/create-edit`, formData, {
                withCredentials: true
            })
            dispatch(setMyShopData(result.data))
            navigate("/")
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex justify-center items-center p-4 sm:p-6 relative
            bg-gradient-to-br from-orange-50 via-white to-orange-50/50 overflow-hidden'>

            {/* Decorative blobs */}
            <div className='absolute -top-24 -right-24 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl'></div>
            <div className='absolute -bottom-24 -left-24 w-72 h-72 bg-orange-300/20 rounded-full blur-3xl'></div>

            {/* Back button */}
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='absolute top-5 left-5 z-20 cursor-pointer bg-white p-2.5 rounded-full shadow-md'
                onClick={() => navigate("/")}
            >
                <IoIosArrowBack size={24} className='text-[#ff4d2d]' />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='max-w-lg w-full bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl 
                    p-6 sm:p-10 border border-orange-100 relative z-10'
            >
                {/* Header */}
                <div className='flex flex-col items-center mb-8'>
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className='bg-gradient-to-br from-[#ff4d2d] to-[#ff6b4a] p-5 rounded-full mb-4 shadow-lg'
                    >
                        <FaUtensils className='text-white w-10 h-10' />
                    </motion.div>
                    <h1 className='text-2xl sm:text-3xl font-extrabold text-gray-900 text-center'>
                        {myShopData ? "Edit Shop" : "Add Shop"}
                    </h1>
                    <p className='text-gray-500 text-sm mt-1 text-center'>
                        {myShopData ? "Update your restaurant details" : "Let's get your restaurant online"}
                    </p>
                </div>

                <form className='space-y-5' onSubmit={handleSubmit}>

                    {/* Image upload */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Shop Image</label>
                        <label
                            htmlFor='shopImage'
                            className='relative flex flex-col items-center justify-center w-full h-48 sm:h-56
                                rounded-2xl border-2 border-dashed border-orange-300 bg-orange-50/50
                                hover:bg-orange-50 transition-colors cursor-pointer overflow-hidden group'
                        >
                            {frontendImage ? (
                                <>
                                    <img
                                        src={frontendImage}
                                        alt="Shop preview"
                                        className='w-full h-full object-cover'
                                    />
                                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/40
                                        flex items-center justify-center transition-all duration-300'>
                                        <FaCamera className='text-white w-8 h-8 opacity-0 
                                            group-hover:opacity-100 transition-opacity duration-300' />
                                    </div>
                                </>
                            ) : (
                                <div className='flex flex-col items-center gap-2 text-orange-400'>
                                    <FaCamera className='w-10 h-10' />
                                    <span className='text-sm font-medium'>Click to upload shop image</span>
                                </div>
                            )}
                            <input
                                id='shopImage'
                                onChange={handleImage}
                                type="file"
                                accept='image/*'
                                className='hidden'
                            />
                        </label>
                    </div>

                    {/* Name */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1.5'>
                            <FaStore className='inline mr-1.5 mb-0.5 text-orange-400' size={14} />
                            Shop Name
                        </label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            placeholder='Enter Shop Name'
                            className='w-full px-4 py-2.5 border border-gray-200 rounded-xl
                                focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent
                                transition-all duration-200 bg-gray-50/50'
                        />
                    </div>

                    {/* City / State */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1.5'>Shop City</label>
                            <input
                                onChange={(e) => setCity(e.target.value)}
                                value={city}
                                type="text"
                                placeholder='Shop City'
                                className='w-full px-4 py-2.5 border border-gray-200 rounded-xl
                                    focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent
                                    transition-all duration-200 bg-gray-50/50'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1.5'>Shop State</label>
                            <input
                                onChange={(e) => setState(e.target.value)}
                                value={state}
                                type="text"
                                placeholder='Shop State'
                                className='w-full px-4 py-2.5 border border-gray-200 rounded-xl
                                    focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent
                                    transition-all duration-200 bg-gray-50/50'
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1.5'>
                            <FaMapMarkerAlt className='inline mr-1.5 mb-0.5 text-orange-400' size={14} />
                            Shop Address
                        </label>
                        <input
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            type="text"
                            placeholder='Enter Shop Address'
                            className='w-full px-4 py-2.5 border border-gray-200 rounded-xl
                                focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent
                                transition-all duration-200 bg-gray-50/50'
                        />
                    </div>

                    {/* Submit */}
                    <motion.button
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        type='submit'
                        disabled={loading}
                        className='w-full bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a] text-white px-6 py-3.5
                            rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200
                            disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                    >
                        {loading ? (
                            <>
                                <span className='w-5 h-5 border-2 border-white border-t-transparent 
                                    rounded-full animate-spin'></span>
                                Saving...
                            </>
                        ) : (
                            myShopData ? "Update Shop" : "Save Shop"
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    )
}

export default CreateEditShop