import React from "react";

export const InteractionSettings: React.FC = () => {
  return (
    <div className="w-[300px] bg-gray-800 text-white rounded-lg p-4 shadow-md space-y-4">
    
      <div>
        <label className="text-sm font-bold block mb-1">Page</label>
        <select className="w-full bg-gray-700 text-white rounded-md p-2">
          <option>Home</option>
          <option>About</option>
          <option>Contact</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-bold block mb-1">Button</label>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-600 rounded-md flex justify-center items-center">
            <span role="img" aria-label="button-icon" className="text-lg">⚙️</span>
          </div>
          <span>Settings</span>
        </div>
      </div>
      <div>
        <label className="text-sm font-bold block mb-2">Interactions</label>
        <div className="space-y-2">
          <div>
            <label className="text-xs font-bold block mb-1">Action 1</label>
            <select className="w-full bg-gray-700 text-white rounded-md p-2">
              <option>Tap</option>
              <option>Hover</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold block mb-1">Action 2</label>
            <div className="flex space-x-2">
              <select className="flex-1 bg-gray-700 text-white rounded-md p-2">
                <option>Navigate to</option>
                <option>Open Modal</option>
              </select>
              <select className="flex-1 bg-gray-700 text-white rounded-md p-2">
                <option>Maps</option>
                <option>Settings</option>
              </select>
            </div>
          </div>
          <div className="mt-2">
            <label className="inline-flex items-center space-x-2">
              <input type="checkbox" className="rounded bg-gray-700 text-gray-400" />
              <span>Conditional Logic</span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-bold block mb-2">Animations</label>
        <div className="space-y-2">
          <div>
            <label className="text-xs font-bold block mb-1">Style</label>
            <select className="w-full bg-gray-700 text-white rounded-md p-2">
              <option>Slide In</option>
              <option>Fade In</option>
            </select>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <button className="w-10 h-10 bg-gray-700 rounded flex justify-center items-center">←</button>
            <button className="w-10 h-10 bg-gray-700 rounded flex justify-center items-center">→</button>
            <button className="w-10 h-10 bg-gray-700 rounded flex justify-center items-center">↑</button>
            <button className="w-10 h-10 bg-gray-700 rounded flex justify-center items-center">↓</button>
          </div>
          <div>
            <label className="text-xs font-bold block mb-1">Speed</label>
            <input
              type="number"
              className="w-full bg-gray-700 text-white rounded-md p-2"
              defaultValue="300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
