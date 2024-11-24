import React from 'react'
import { Routes , Route } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import MyAppointment from './pages/MyAppointment'
import Doctors from './pages/Doctors'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import Login from './pages/Login'
import Appointment from './pages/Appointment'
import Navbar from './Components/Navbar'



function App() {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/my-appointment' element={<MyAppointment />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/login' element={<Login />} />
      </Routes>


    </div>
  )
}

export default App
