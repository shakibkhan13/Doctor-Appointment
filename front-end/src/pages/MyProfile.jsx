import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from '../assets/assets_frontend/assets'
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {

  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false)


  const updateUserProfileData = async () => {

    try {
      const formData = new FormData()

      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)

      image && formData.append('image', image)

      const {data} = await axios.post(backendUrl + '/api/user/update-profile', formData , {headers:{token}})

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }


  const formatDateForInput = (dob) => {
    const [day, month, year] = dob.split("-");
    return `${year}-${month}-${day}`;
  };

  const formatDateForDisplay = (dob) => {
    const [year, month, day] = dob.split("-");
    return `${day}-${month}-${year}`;
  };

  return userData && (
    <div className="p-4 max-w-lg mx-auto border rounded shadow">
      {
        isEdit ?
          <label htmlFor="image">

            <div className="inline-block relative cursor-pointer">
              <img className="w-36 rounded opacity-75" src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <img className="w-10 absolute bottom-12 right-12" src={image ? '' : assets.upload_icon} alt="" />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />


          </label>
          : <img
            src={userData.image}
            alt="Profile"
            className="w-40 h-48 rounded-full mx-auto"
          />
      }
      {/* <img
        src={userData.image}
        alt="Profile"
        className="w-40 h-48 rounded-full mx-auto"
      /> */}

      <div className="text-center mt-4">
        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="border border-zinc-300 rounded p-2 w-full"
          />
        ) : (
          <p className="text-lg font-bold">{userData.name}</p>
        )}
      </div>

      <hr className="my-4" />

      <div>
        <p className="font-bold mb-4">CONTACT INFORMATION</p>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <p className="font-semibold">Email:</p>
            <p>{userData.email}</p>
          </div>

          <div>
            <p className="font-semibold">Phone:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="border border-zinc-300 rounded p-2 w-full"
              />
            ) : (
              <p>{userData.phone}</p>
            )}
          </div>

          <div>
            <p className="font-semibold">Address:</p>
            {isEdit ? (
              <div>
                <input
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={userData.address.line1}
                  type="text"
                  className="border border-zinc-300 rounded p-2 w-full mb-2"
                />
                <input
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={userData.address.line2}
                  type="text"
                  className="border border-zinc-300 rounded p-2 w-full"
                />
              </div>
            ) : (
              <p>
                {userData.address.line1}, {userData.address.line2}
              </p>
            )}
          </div>

          <div>
            <p className="font-semibold">Gender:</p>
            {isEdit ? (
              <select
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
                className="border border-zinc-300 rounded p-2 w-full"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}
          </div>

          <div>
            <p className="font-semibold">Date Of Birth:</p>
            {isEdit ? (
              <input
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    dob: formatDateForDisplay(e.target.value),
                  }))
                }
                value={formatDateForInput(userData.dob)}
                className="border border-zinc-300 rounded p-2 w-full"
              />
            ) : (
              <p>{userData.dob}</p>
            )}
          </div>
        </div>
        <div className="mt-10">
          {
            isEdit ?
            // <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all" >Save Information</button>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-full" onClick={updateUserProfileData}>Save Information</button>
            :
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-full" onClick={()=>setIsEdit(true)}>Edit</button>
          }
        </div>
      </div>

      
    </div>
  );
};

export default MyProfile;
