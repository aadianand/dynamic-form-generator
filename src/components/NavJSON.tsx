import React, {useState, useContext} from 'react'
import { VscColorMode } from "react-icons/vsc";


interface NavJSONProps {
  isDarkMode: boolean; // Current theme state
  toggleTheme: () => void; // Function to toggle the theme
}

const NavJSON: React.FC<NavJSONProps> = ({ isDarkMode }) => {

  const Themechange = () => {
    
  }


  return (
    <div
      className="flex items-center justify-between"
      style={{
        margin: "0", // Remove external margin to apply background fully
        padding: "16px", // Add internal padding
        backgroundColor: isDarkMode ? "black" : "white", // Dynamic background color
        color: isDarkMode ? "white" : "black", // Dynamic text color
        transition: "background-color 0.3s, color 0.3s", // Smooth transition
      }}
    >
      {/* Left side content */}
      <div className="font-bold">JSONEditor</div> 
      <div className="font-bold ml-2">Form</div>

      {/* Right side content */}
      <VscColorMode
        style={{ fontSize: "24px", cursor: "pointer" }}
        onClick={Themechange} // Toggle theme on click
      />
    </div>
  );
};

export default NavJSON; 