import axios from 'axios'
import React from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { ServerUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setMyShopData } from '../redux/ownerSlice'

const OwnerItemCard = ({data}) => {

  const dispatch = useDispatch()
const navigate = useNavigate()

const handleDelete = async () => {
  try {
    const result = await axios.delete(`${ServerUrl}/api/item/delete/${data._id}`,
      {withCredentials:true}
    )
   dispatch(setMyShopData(result.data))
  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className='flex bg-white rounded-xl shadow-md overflow-hidden border border-[#ff4d2d]/30
    w-full max-w-2xl mx-auto hover:shadow-lg transition-shadow duration-300'>
      
      <div className='w-36 h-36 flex-shrink-0 bg-gray-50'>
        <img src={data.image} alt="" className='w-full h-full object-cover' />
      </div>

      <div className='flex flex-col justify-between p-4 flex-1'>
        <div className='space-y-1'>
          <h2 className='text-lg font-semibold text-gray-800'>{data.name}</h2>
          <p className='text-sm text-gray-500'>
            <span className='font-medium text-gray-600'>Category: </span>{data.category}
          </p>
          <p className='text-sm text-gray-500'>
            <span className='font-medium text-gray-600'>Food Type: </span>{data.foodType}
          </p>
        </div>

        <div className='flex items-center justify-between mt-3'>
          <div className='text-[#ff4d2d] font-bold text-lg'>
            <span className='text-gray-600 font-medium text-sm mr-1'>Price:</span>
            ₹{data.price}
          </div>

          <div className='flex items-center gap-3'>
            <button onClick={()=>navigate(`/edit-item/${data._id}`)}
             className='p-2 rounded-full hover:bg-[#ff4d2d]/10 text-[#ff4d2d] cursor-pointer transition-colors'>
              <FaPen size={16}/>
            </button>
            <button onClick={handleDelete}
             className='p-2 rounded-full hover:bg-red-100 text-red-500 cursor-pointer transition-colors'>
              <FaTrash size={16}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OwnerItemCard