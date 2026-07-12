import React, { useEffect } from 'react'
import axios from 'axios'
import {useDispatch, useSelector } from 'react-redux'
import { setCity } from '../redux/userSlice'



const UseGetCity = () => {
const dispatch = useDispatch()
const {userData} = useSelector(state=>state.user)
const apiKey = import.meta.env.VITE_GEOAPI_KEY
useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
  
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
      )
  
      const location = result?.data.results[0]
      const cityName = location?.city || location?.county || location?.state || location?.formatted
  
      dispatch(setCity(cityName))
    }, (error) => {
      console.log("Geolocation error:", error)
    })
  }, [userData])
}
   

export default UseGetCity



