export const doctorsData = {
  Cardiology: [
    {
      name: 'Dr. Rajeev Mehta',
      specialization: 'Heart Specialist',
      image: '/src/assets/assets_frontend/doc1.png',
      experience: '15+ years',
      availability: 'Mon - Fri',
      education: 'MD - Cardiology, MBBS'
    },
    {
      name: 'Dr. Ananya Sen',
      specialization: 'Cardiovascular Surgeon',
      image: '/src/assets/assets_frontend/doc2.png',
      experience: '12+ years',
      availability: 'Tue - Sat',
      education: 'MD - Cardiovascular Surgery'
    },
    {
      name: 'Dr. Sarah Johnson',
      specialization: 'Interventional Cardiologist',
      image: '/src/assets/assets_frontend/doc3.png',
      experience: '18+ years',
      availability: 'Mon - Thu',
      education: 'MD - Interventional Cardiology'
    },
    {
      name: 'Dr. William Parker',
      specialization: 'Cardiac Surgeon',
      image: '/src/assets/assets_frontend/doc4.png',
      experience: '20+ years',
      availability: 'Wed - Sun',
      education: 'MD - Cardiac Surgery'
    },
    {
      name: 'Dr. Maria Rodriguez',
      specialization: 'Heart Rhythm Specialist',
      image: '/src/assets/assets_frontend/doc5.png',
      experience: '14+ years',
      availability: 'Mon - Fri',
      education: 'MD - Cardiology, DM'
    }
  ],
  Neurology: [
    {
      name: 'Dr. Sameer Kulkarni',
      specialization: 'Brain & Nerve Specialist',
      image: '/src/assets/assets_frontend/doc6.png',
      experience: '20+ years',
      availability: 'Mon - Fri',
      education: 'MD - Neurology, DM'
    },
    {
      name: 'Dr. Emily Chen',
      specialization: 'Neurologist',
      image: '/src/assets/assets_frontend/doc7.png',
      experience: '16+ years',
      availability: 'Tue - Sat',
      education: 'MD - Neurology'
    },
    {
      name: 'Dr. David Wilson',
      specialization: 'Neurosurgeon',
      image: '/src/assets/assets_frontend/doc8.png',
      experience: '22+ years',
      availability: 'Mon - Thu',
      education: 'MD - Neurosurgery'
    },
    {
      name: 'Dr. Rachel Green',
      specialization: 'Pediatric Neurologist',
      image: '/src/assets/assets_frontend/doc9.png',
      experience: '13+ years',
      availability: 'Wed - Sun',
      education: 'MD - Pediatric Neurology'
    }
  ],
  Orthopedics: [
    {
      name: 'Dr. Rahul Singh',
      specialization: 'Joint Specialist',
      image: '/src/assets/assets_frontend/doc10.png',
      experience: '15+ years',
      availability: 'Tue - Sun',
      education: 'MS - Orthopedics'
    },
    {
      name: 'Dr. Michael Brown',
      specialization: 'Sports Medicine',
      image: '/src/assets/assets_frontend/doc11.png',
      experience: '17+ years',
      availability: 'Mon - Fri',
      education: 'MD - Sports Medicine'
    },
    {
      name: 'Dr. Lisa Thompson',
      specialization: 'Spine Surgeon',
      image: '/src/assets/assets_frontend/doc12.png',
      experience: '19+ years',
      availability: 'Tue - Sat',
      education: 'MS - Spine Surgery'
    }
  ],
  // ... Adding more specializations and doctors to reach 50 total
  Dermatology: [
    {
      name: 'Dr. Priya Sharma',
      specialization: 'Skin Specialist',
      image: '/src/assets/assets_frontend/doc13.png',
      experience: '12+ years',
      availability: 'Mon - Fri',
      education: 'MD - Dermatology'
    },
    // ... more dermatologists
  ],
  'General Medicine': [
    {
      name: 'Dr. John Davis',
      specialization: 'General Physician',
      image: '/src/assets/assets_frontend/doc14.png',
      experience: '16+ years',
      availability: 'Mon - Sat',
      education: 'MD - Internal Medicine'
    },
    // ... more general physicians
  ]
};

export const categories = Object.keys(doctorsData);

export const getAllDoctors = () => {
  return Object.values(doctorsData).flat();
};