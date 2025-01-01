import { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import SlideBar from './components/SlideBar'
import { Route, Routes } from 'react-router-dom'
import Dashbord from './pages/admin/Dashbord'
import AllAppointmens from './pages/admin/AllAppointmens'
import AddDoctor from './pages/admin/AddDoctor'
import DoctorsList from './pages/admin/doctorsList'
import { DoctorContext } from './context/DoctorContext'
import DoctorDashBoard from './pages/Doctor/DoctorDashBoard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProflie from './pages/Doctor/DoctorProflie'


const App = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <SlideBar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashbord />} />
          <Route path='/all-appointments' element={<AllAppointmens />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctor-list' element={<DoctorsList />} />


          <Route path='/doctor-dashboard' element={<DoctorDashBoard />} />
          <Route path='/doctor-appointments' element={<DoctorAppointments />} />
          <Route path='/doctor-proflie' element={<DoctorProflie />} />

        </Routes>
      </div>
    </div>
  )
    : (
      <>
        <Login />
        <ToastContainer />
      </>
    )
}



export default App
