import React, { useState } from 'react'
import { FaUtensils, FaCamera } from 'react-icons/fa'
import { IoIosArrowBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import { ServerUrl } from '../App'
import { setMyShopData } from '../redux/ownerSlice'
import { GiChiliPepper, GiPlantSeed } from 'react-icons/gi'
import { MdCurrencyRupee, MdCategory } from 'react-icons/md'

const AddItem = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { myShopData } = useSelector(state => state.owner)

    const [name, setName] = useState("")
    const [price, setPrice] = useState("") // Changed from 0 to "" to avoid input warnings
    const [category, setCategory] = useState("")
    const [foodType, setFoodType] = useState("veg")

    const categories = [
        "Snacks", "Main Course", "Desserts", "Pizza", "Burgers", 
        "Sandwiches", "South Indian", "North Indian", "Chinese", "Fast Food", "Others"
    ]

    const [frontendImage, setFrontendImage] = useState(null)
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
        if(!name || !price || !category) {
            alert("Please fill all required fields")
            return;
        }
        
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("price", price)
            formData.append("category", category) // Fixed: Added category
            formData.append("foodType", foodType) // Fixed: Added foodType
            
            if (backendImage) {
                formData.append("image", backendImage)
            }

            const result = await axios.post(`${ServerUrl}/api/item/add-item`, formData, {
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
        <div className='min-h-screen flex justify-center items-center p-4 sm:p-6 relative bg-gradient-to-br from-orange-50 via-white to-red-50 overflow-hidden'>
            
            {/* Decorative blurred blobs */}
            <div className='absolute -top-32 -right-32 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl animate-pulse'></div>
            <div className='absolute -bottom-32 -left-32 w-96 h-96 bg-red-200/30 rounded-full blur-3xl animate-pulse' style={{animationDelay: '2s'}}></div>

            {/* Back Button */}
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='absolute top-5 left-5 z-20 cursor-pointer bg-white/80 backdrop-blur-sm p-2.5 rounded-full shadow-lg border border-white/50'
                onClick={() => navigate("/")}
            >
                <IoIosArrowBack size={22} className='text-gray-700' />
            </motion.div>

            {/* Main Card */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className='max-w-xl w-full bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-6 sm:p-10 border border-white/50 relative z-10'
            >
                
                {/* Header */}
                <div className='flex flex-col items-center mb-8'>
                    <motion.div
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                        className='bg-gradient-to-br from-[#ff4d2d] to-[#ff8c42] p-4 rounded-2xl mb-4 shadow-lg shadow-orange-200'
                    >
                        <FaUtensils className='text-white w-8 h-8' />
                    </motion.div>
                    <h1 className='text-3xl font-extrabold text-gray-800 tracking-tight'>
                        Add New Food
                    </h1>
                    <p className='text-gray-400 text-sm mt-1'>
                        Fill in the details to add to your menu
                    </p>
                </div>

                <form className='space-y-5' onSubmit={handleSubmit}>

                    {/* Image Upload */}
                    <div>
                        <label className='block text-sm font-semibold text-gray-600 mb-2'>Food Image</label>
                        <label
                            htmlFor='foodImage'
                            className='relative flex flex-col items-center justify-center w-full h-52 
                                rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/50
                                hover:border-orange-400 hover:bg-orange-50/30 transition-all duration-300 cursor-pointer overflow-hidden group'
                        >
                            {frontendImage ? (
                                <>
                                    <img src={frontendImage} alt="Food preview" className='w-full h-full object-cover' />
                                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all duration-300'>
                                        <FaCamera className='text-white w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg' />
                                    </div>
                                </>
                            ) : (
                                <div className='flex flex-col items-center gap-2 text-gray-400 group-hover:text-orange-400 transition-colors'>
                                    <FaCamera className='w-10 h-10' />
                                    <span className='text-sm font-medium'>Click to upload food image</span>
                                </div>
                            )}
                            <input id='foodImage' onChange={handleImage} type="file" accept='image/*' className='hidden' />
                        </label>
                    </div>

                    {/* Food Name */}
                    <div>
                        <label className='block text-sm font-semibold text-gray-600 mb-1.5'>Food Name</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            placeholder='e.g. Chicken Biryani'
                            className='w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none'
                        />
                    </div>

                    {/* Grid for Price and Category */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        {/* Price */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-600 mb-1.5'>
                                <MdCurrencyRupee className='inline mr-1 mb-0.5 text-orange-500' size={16} />
                                Price
                            </label>
                            <input
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                type="number"
                                placeholder='250'
                                className='w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none'
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-600 mb-1.5'>
                                <MdCategory className='inline mr-1 mb-0.5 text-orange-500' size={16} />
                                Category
                            </label>
                            <select
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                                className='w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none appearance-none'
                            >
                                <option value="" disabled>Select Type</option>
                                {categories.map((cate, index) => (
                                    <option key={index} value={cate}>{cate}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Food Type (Veg / Non-Veg Toggle) */}
                    <div>
                        <label className='block text-sm font-semibold text-gray-600 mb-2'>Food Type</label>
                        <div className='flex gap-3'>
                            <button
                                type="button"
                                onClick={() => setFoodType("veg")}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
                                    foodType === "veg" 
                                    ? 'border-green-500 bg-green-50 text-green-700 shadow-sm shadow-green-100' 
                                    : 'border-gray-200 bg-white/50 text-gray-500 hover:border-gray-300'
                                }`}
                            >
                                <GiPlantSeed className={`w-5 h-5 ${foodType === "veg" ? 'text-green-600' : 'text-gray-400'}`} />
                                Veg
                            </button>

                            <button
                                type="button"
                                onClick={() => setFoodType("non veg")}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
                                    foodType === "non veg" 
                                    ? 'border-red-500 bg-red-50 text-red-700 shadow-sm shadow-red-100' 
                                    : 'border-gray-200 bg-white/50 text-gray-500 hover:border-gray-300'
                                }`}
                            >
                                <GiChiliPepper className={`w-5 h-5 ${foodType === "non veg" ? 'text-red-500' : 'text-gray-400'}`} />
                                Non-Veg
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: loading ? 1 : 1.02, boxShadow: "0 10px 30px -10px rgba(255, 77, 45, 0.5)" }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        type='submit'
                        disabled={loading}
                        className='w-full mt-2 bg-gradient-to-r from-[#ff4d2d] to-[#ff8c42] text-white px-6 py-4
                            rounded-xl font-bold text-lg shadow-lg shadow-orange-200 transition-all duration-300
                            disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                    >
                        {loading ? (
                            <>
                                <span className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
                                Saving Item...
                            </>
                        ) : (
                            "Add to Menu"
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    )
}

export default AddItem