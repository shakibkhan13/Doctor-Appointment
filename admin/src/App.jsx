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


const App = () => {

  const { aToken } = useContext(AdminContext)

  return aToken ? (
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
