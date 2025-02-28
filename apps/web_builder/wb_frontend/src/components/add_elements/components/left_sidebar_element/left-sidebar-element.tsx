import React, { useState } from "react";
import iconLogo from "../../../../assets/icons/logo.svg";
import iconAdd from "../../../../assets/icons/add.svg";
import iconProject from "../../../../assets/icons/project.svg";
import iconDiv from "../../../../assets/icons/div.svg";
import iconHelp from "../../../../assets/icons/help.svg";
import iconSetting from "../../../../assets/icons/setting.svg";

interface LeftSideBarProps {
  onComponentChange?: (component: string | null) => void; 
}

export const LeftSideBar: React.FC<LeftSideBarProps> = ({ onComponentChange }) => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const handleAddClick = () => {
    setActiveComponent("add");
    if (onComponentChange) onComponentChange("add");
  };

  const handleProjectClick = () => {
    setActiveComponent("layers");
    if (onComponentChange) onComponentChange("layers");
  };

  return (
    <aside
      className="border border-gray-500 bg-slate-900 h-screen w-16 flex flex-col items-center py-1 relative"
    >
      <div className="mt-2 mb-5">
        <img src={iconLogo} alt="Logo" width="15" height="15" />
      </div>
      <nav className="flex flex-col space-y-4 flex-1">
        <button
          className="text-gray-400 hover:text-white"
          onClick={handleAddClick}
        >
          <img src={iconAdd} alt="Add" width="15" height="15" />
        </button>
        <button
          className="text-gray-400 hover:text-white"
          onClick={handleProjectClick}
        >
          <img src={iconProject} alt="Project" width="15" height="15" />
        </button>
        <button className="text-gray-400 hover:text-white">
          <img src={iconDiv} alt="Div" width="15" height="15" />
        </button>
      </nav>
      <div className="flex flex-col space-y-4 mb-16">
        <button className="text-gray-400 hover:text-white">
          <img src={iconHelp} alt="Help" width="15" height="15" />
        </button>
        <button className="text-gray-400 hover:text-white">
          <img src={iconSetting} alt="Settings" width="15" height="15" />
        </button>
      </div>
    </aside>
  );
};