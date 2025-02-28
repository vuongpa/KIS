import React from "react";
import diamondIcon from "../../../../assets/icons/logo.png";

export const Loading:React.FC =()=> {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="text-center">
        <img src={diamondIcon} alt="Diamond Icon" className="w-20 h-20 mx-auto animate-spin" />
        <p className="text-white text-lg mt-4">Creating a project...</p>
      </div>
    </div>
  );
}
