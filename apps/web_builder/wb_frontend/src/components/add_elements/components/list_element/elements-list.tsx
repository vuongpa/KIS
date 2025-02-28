import React, { useMemo } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import {
  ContainerIcon,
  TextIcon,
  ButtonIcon,
  HeadingIcon,
  ColumnIcon,
  GridIcon,
  RowIcon,
  ListIcon,
  DividerIcon,
  TabIcon,
  VideoIcon,
  LinkIcon,
  CheckboxIcon,
  ImageIcon,
  RadioIcon,
} from "../element_layout";
import { elementConfigs } from "../../data";

interface ElementData {
  id: number;
  name: string;
  category: string;
  iconUrl?: string;
}

interface ListElementsComponentProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  collapsedGroups: Record<string, boolean>;
  onToggleGroup: (value: Record<string, boolean>) => void;
}

export const ListElementsComponent: React.FC<ListElementsComponentProps> = ({
  searchTerm,
  onSearchChange,
  collapsedGroups,
  onToggleGroup,
}) => {
  const filteredElements = useMemo(() => {
    return elementConfigs.filter((element: ElementData) =>
      element.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);
  const groupedElements = useMemo(() => {
    return filteredElements.reduce((acc: Record<string, ElementData[]>, element: ElementData) => {
      if (!acc[element.category]) acc[element.category] = [];
      acc[element.category].push(element);
      return acc;
    }, {});
  }, [filteredElements]);

  return (
    <div className="flex-1  p-0 h-screen">
      <div className="mb-2">
        <div className="relative px-2 py-2">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-2 py-2 bg-gray-800 text-white text-xs rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      {Object.keys(groupedElements).map((groupName) => (
        <div key={groupName} className="mb-3">
          <div
            className="flex items-center justify-between px-2 py-1 cursor-pointer border-b border-gray-700"
            onClick={() => onToggleGroup({ ...collapsedGroups, [groupName]: !collapsedGroups[groupName] })}
          >
            <span className="text-xs font-medium ">{groupName}</span>
            <FiChevronDown
              size={16}
              className={`transition-transform duration-200 ${collapsedGroups[groupName] ? "rotate-180" : ""}`}
            />
          </div>
          {!collapsedGroups[groupName] && (
            <div className="grid grid-cols-3 gap-1 px-1 py-1">
              {groupedElements[groupName].map((element: ElementData) => (
                <div className="flex items-center justify-center w-full">
                  {element.name === "Container" && <ContainerIcon />}
                  {element.name === "Text" && <TextIcon />}
                  {element.name === "Button" && <ButtonIcon />}
                  {element.name === "Heading" && <HeadingIcon />}
                  {element.name === "Column" && <ColumnIcon />}
                  {element.name === "Grid" && <GridIcon />}
                  {element.name === "Row" && <RowIcon />}
                  {element.name === "List" && <ListIcon />}
                  {element.name === "Divider" && <DividerIcon />}
                  {element.name === "Tabs" && <TabIcon />}
                  {element.name === "VideoPlayer" && <VideoIcon />}
                  {element.name === "Link" && <LinkIcon />}
                  {element.name === "Checkbox" && <CheckboxIcon />}
                  {element.name === "Image" && <ImageIcon />}
                  {element.name === "Radio" && <RadioIcon />}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
     
    </div>
  );
};