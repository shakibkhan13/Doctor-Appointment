import { useContext, useEffect, useState  } from 'react';
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const MyAppointment = () => {

  const { backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])
  const months = [" ", "jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const navigate = useNavigate()

  const slotDateFormat = (slotData) => {
    const dataArray = slotData.split('-')
    return dataArray[0] + " " + months[Number(dataArray[1])] + " " + dataArray[2]
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {

     const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment' , {appointmentId}, {headers:{token}})

     if (data.success) {
      toast.success(data.message)
      getUserAppointments()
      getDoctorsData()
     }else{
      toast.error(data.message)
     }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {
          appointments.map((item, index) => (
            
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              {
                console.log(item.docData)
              }
              <div>
                <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Degree : {item.docData.degree} </p>
                {/* <p>{item.docData.address}</p> */}
                {/* <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p> */}
                <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time : </span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                {
                  !item.cancelled && item.payment && <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>
                }
                {
                  !item.cancelled && !item.payment && <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>
                }
                {
                  !item.cancelled && <button onClick={()=> cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded  hover:bg-red-500 hover:text-white transition-all duration-300'>Cancel appointment</button>
                }
                {
                  item.cancelled &&  <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500' >Appointment Cancelled</button>
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )

  // return (
  //   <div>
  //     <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
  //     <div>
  //       {
  //         appointments.map((item, index) => {
  //           // Parse docData outside of JSX
  //           let docData;
  //           try {
  //             console.log(item.user)
  //             docData = JSON.parse(item.userData); // Parse the docData string
  //           } catch (error) {
  //             console.error('Error parsing docData:', error);
  //             docData = {}; // Fallback if JSON parsing fails
  //           }
  
  //           // You can log the parsed docData here
  //           console.log(docData);
  
  //           // Render the JSX
  //           return (
  //             <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
  //               <div>
  //                 <p>Name: {docData.name}</p>
  //                 <p>Email: {docData.email}</p>
  //                 <img src={docData.image} alt={docData.name} />
  //                 {/* Render other properties of docData as needed */}
  //               </div>
  //             </div>
  //           );
  //         })
  //       }
  //     </div>
  //   </div>
  // );
  
}


export default MyAppointment
