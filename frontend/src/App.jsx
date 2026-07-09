import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SingUp from './pages/SingUp'
import SignIn from './pages/SignIn'


export const ServerUrl =  "http://localhost:8000" 

const App = () => {
  return (
    <div>


  <Routes>
    <Route path='/signup' element={<SingUp/>}/>
    <Route path='/signin' element={<SignIn/>}/>
  </Routes>
    </div>
  )
}

export default App