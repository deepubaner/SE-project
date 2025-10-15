import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { doctorsData, categories } from '../Hero-com/DoctorList';
import { doctors as doctorImages } from '../../assets/assets_frontend/assets';
import profile_pic from '../../assets/assets_frontend/profile_pic.png';

const DoctorsComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Get all doctors for "All" category
  const allDoctors = Object.values(doctorsData).flat();

  // Filter doctors based on selected category and search term
  const filteredDoctors = selectedCategory === 'All' 
    ? allDoctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : doctorsData[selectedCategory].filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-gray-50 pt-20"> {/* Added pt-20 for navbar space */}
      {/* Mobile Menu Button */}
      <div className="lg:hidden p-4">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 bg-blue-600 text-white rounded-md"
        >
          {isMenuOpen ? 'Close Menu' : 'Show Specializations'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className={`
          lg:w-64 bg-white shadow-lg p-6 
          ${isMenuOpen ? 'block' : 'hidden'} 
          lg:block fixed lg:sticky top-20 h-[calc(100vh-5rem)]
          overflow-y-auto z-10
        `}>
          <h2 className="text-xl font-bold mb-6 text-gray-800">Specializations</h2>
          <div className="space-y-2">
            <button
              onClick={() => {
                setSelectedCategory('All');
                setIsMenuOpen(false);
              }}
              className={`
                w-full text-left px-4 py-2 rounded-md transition-colors
                ${selectedCategory === 'All' 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-gray-100 text-gray-700'}
              `}
            >
              All Doctors
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setIsMenuOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-2 rounded-md transition-colors
                  ${selectedCategory === category 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-100 text-gray-700'}
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:pl-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
              {selectedCategory === 'All' ? 'All Doctors' : `${selectedCategory} Specialists`}
            </h1>
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={doctorImages.find(d => d.name === doctor.name)?.image || doctor.image || '/src/assets/assets_frontend/profile_pic.png'}
                  alt={doctor.name}
                  className="w-full h-48 object-cover"
                  onError={e => {
                    e.currentTarget.src = '/src/assets/assets_frontend/profile_pic.png';
                  }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {doctor.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-2">
                    {doctor.specialization}
                  </p>
                  <div className="space-y-2 text-gray-600 text-sm mb-4">
                    <p>Experience: {doctor.experience}</p>
                    <p>Available: {doctor.availability}</p>
                    <p>Education: {doctor.education}</p>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsComponent;
