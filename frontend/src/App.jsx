import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SingUp from './pages/SingUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'


export const ServerUrl =  "http://localhost:8000" 

const App = () => {
  return (
    <div>


  <Routes>
    <Route path='/signup' element={<SingUp/>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/forgot-password' element={<ForgotPassword/>}/>
  </Routes>
    </div>
  )
}

export default App