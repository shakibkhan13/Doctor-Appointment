import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Shakib Khan Sourov",
    image: assets.profile_pic,
    email: "mds893472@gmail.com",
    phone: "01909125813",
    address: {
      line1: "Kawla Bazer, Dhaka-1203",
      line2: "Bangladesh",
    },
    gender: "Male",
    dob: "21-11-2003",
  });

  const [isEdit, setIsEdit] = useState(false);

  const formatDateForInput = (dob) => {
    const [day, month, year] = dob.split("-");
    return `${year}-${month}-${day}`;
  };

  const formatDateForDisplay = (dob) => {
    const [year, month, day] = dob.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="p-4 max-w-lg mx-auto border rounded shadow">
      <img
        src={userData.image}
        alt="Profile"
        className="w-40 h-48 rounded-full mx-auto"
      />

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
      </div>


      <button
        onClick={() => setIsEdit(!isEdit)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-full"
      >
        {isEdit ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default MyProfile;
