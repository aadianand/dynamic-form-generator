import React from "react";
import { VscColorMode } from "react-icons/vsc";
import { useTheme } from "../context/ThemeContext";

const NavJSON: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div
      className="flex items-center justify-between"
      style={{
        margin: "0",
        padding: "16px",
        backgroundColor: isDarkMode ? "black" : "white",
        color: isDarkMode ? "white" : "black",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      {/* Left side content */}
      <div className="font-bold">JSONEditor</div>
      <div className="font-bold ml-2">Form</div>

      {/* Right side content */}
      <VscColorMode
        style={{ fontSize: "24px", cursor: "pointer" }}
        onClick={toggleTheme} // Toggle theme on click
      />
    </div>
  );
};

export default NavJSON;
