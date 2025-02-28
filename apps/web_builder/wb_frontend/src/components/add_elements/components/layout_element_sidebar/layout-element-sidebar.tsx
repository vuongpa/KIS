import React, { useRef, useState} from "react";
import { ListElementsComponent } from "../list_element/elements-list";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export const AddElementsComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const sidebarRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={sidebarRef}
      className={`transition-all duration-300 bg-gray-900 text-white h-full flex flex-col ${isSidebarOpen ? "w-64" : "w-12"}`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        {isSidebarOpen && <span className="text-xs font-medium">Add Element</span>}
        <button
          className="text-gray-400 hover:text-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FiChevronLeft size={14} /> : <FiChevronRight size={18} />}
        </button>
      </div>
      {isSidebarOpen && (
        <ListElementsComponent
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          collapsedGroups={collapsedGroups}
          onToggleGroup={setCollapsedGroups}
        />
      )}
    </div>
  );
};