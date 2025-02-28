import React from "react";
import hand from "../../../../assets/icons/hand.png";
export const TopBar: React.FC = () => {
  
  return (
    <div className="p-2 w-full h-10 flex items-center">
      <div className="rounded bg-gray-700 flex items-center space-x-2 px-2">
        <button className="text-white text-sm px-1 py-0.5 hover:bg-gray-600">
          −
        </button>
        <span className="text-gray-400 text-xs">100%</span>
        <button className="text-white text-sm px-1 py-0.5 hover:bg-gray-600">
          +
        </button>
      </div>

      <div className="ml-4 bg-gray-700 p-1 rounded flex items-center justify-center">
        <img src={hand} alt="Hand Icon" className="w-4 h-4" />
      </div>

      <button className="ml-4 text-white text-sm px-3 py-1 bg-blue-600 rounded hover:bg-blue-700">
        Add page
      </button>
      <div className="flex-grow"></div>
      <div className="bg-gray-700 h-6 w-14 rounded flex items-center justify-center">
        <span className="text-xs text-gray-300">767676</span>
      </div>
    </div>
  );
};
