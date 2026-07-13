import React, { useEffect } from 'react'
import axios from 'axios'
import { ServerUrl } from '../App'
import {useDispatch } from 'react-redux'
import { setMyShopData } from '../redux/ownerSlice'


const useGetMyShop = () => {
const dispatch = useDispatch()
    useEffect(()=>{
        const fetchShop = async () => {
           try {
            const result = await axios.get(`${ServerUrl}/api/shop/get-my`,{withCredentials:true})
           dispatch(setMyShopData(result.data))
           } catch (error) {
            console.log(error)
           } 
        }
        fetchShop()
    },[])
}
   

export default useGetMyShop



