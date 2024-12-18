import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '../assets/bg.png'; // Import the image



const Landing = () => {

    const navigate = useNavigate(); // Hook for navigation

    const handleButtonClick = () => {
      navigate('/home'); // Navigate to the Home page
    };
    
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white overflow-hidden">
      {/* Background Image */}
      <img
        src={BackgroundImage} // Use the imported image here
        alt="Background"
        className="absolute top-0 left-0 w-full h-170 opacity-30 z-6 mt-0 animate-typewriter"
      />

      {/* Title */}
      <h1 className="font-inter font-extrabold text-7xl text-center z-10">
        <span className="text-black hover:scale-50">CAMPUS</span> <span className="text-blue-300">REVEAL</span>
      </h1>

      {/* Subtitle */}
      <p className="font-serif text-center mt-4 text-xl text-black z-10">
        “Discover and Review Your Dream Colleges Anonymously”
      </p>

      {/* Button */}
      <button  onClick={handleButtonClick}  className="mt-8 z-10 font-inter font-bold text-2xl text-white bg-blue-700 px-6 py-3 rounded-xl animate-bounce">
        Write a Review
      </button>
    </div>
  );
};

export default Landing;
