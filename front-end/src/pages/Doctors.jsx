import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  if (!doctors || doctors.length === 0) {
    return <p>Loading doctors...</p>;
  }

  return (
    <div className="px-4 py-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">
          Browse Doctors by Speciality
        </h1>
        <p className="text-gray-600 mt-2">
          Select a speciality to find your preferred doctor.
        </p>
      </div>

      <button className={`py-1 px-3 border bg-gray-300 mb-3 rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white': ''}`} onClick={()=>setShowFilter(prev => !prev)}>Filters</button>
      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 mb-10 mt-3 ${showFilter ? 'flex':'hidden sm:flex'}`}>
        {[
          'General Physician',
          'Gynecologist',
          'Dermatologist',
          'Pediatricians',
          'Neurologist',
          'Gastroenterologist',
        ].map((specialty, index) => (
          <p
            key={index}
            className={`cursor-pointer text-center text-sm sm:text-base text-white py-2 px-4 rounded-lg ${
              speciality === specialty.toLowerCase()
                ? 'bg-blue-600'
                : 'bg-gray-300 hover:bg-blue-500 hover:text-white'
            }`}
            onClick={() => {
              navigate(`/doctors/${specialty.toLowerCase()}`);
            }}
          >
            {specialty}
          </p>
        ))}
      </div>

      {/* Doctors List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filterDoc.length > 0 ? (
          filterDoc.map((item) => (
            <div
              key={item._id}
              className="border border-blue-300 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => navigate(`/appointment/${item._id}`)}
            >
              {/* Image Container */}
              <div className="w-full h-40 sm:h-48 bg-blue-50 overflow-hidden flex justify-center items-center">
                <img
                  src={item.image} // Ensure image exists in your doctors data
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Doctor Details */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2 text-green-500 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <p>Available</p>
                </div>
                <h2 className="text-gray-900 text-lg font-semibold">
                  {item.name}
                </h2>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No doctors available for this speciality.
          </p>
        )}
      </div>
    </div>
  );
};

export default Doctors;
