// tabs-layout.tsx
import React, { useState } from "react";
import { Element, useNode, useEditor } from "@craftjs/core";
import { getTabsPropertiesDefaults } from "./tabs-properties";
import { TabsProperties } from "./properties-tabs-panel";
import { DeleteContextMenu } from "../../../delete_context_menu/delete-context-menu";

interface TabsProps extends Partial<ReturnType<typeof getTabsPropertiesDefaults>> {
  children?: React.ReactNode;
}

export const TabsLayout: React.FC<TabsProps> & { craft: any } = (props) => {
  const {
    connectors: { connect, drag },
    selected,
    id,
  } = useNode((node) => ({
    selected: node.events.selected,
    id: node.id,
  }));

  const { actions } = useEditor();
  const [isHovered, setIsHovered] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const defaultProps = getTabsPropertiesDefaults();
  const {
    tabs = defaultProps.tabs,
    activeTab = defaultProps.activeTab,
    color = defaultProps.color,
    backgroundColor = defaultProps.backgroundColor,
    activeBackgroundColor = defaultProps.activeBackgroundColor,
    fontSize = defaultProps.fontSize,
    padding = defaultProps.padding,
    margin = defaultProps.margin,
    border = defaultProps.border,
  } = props;

  const [active, setActive] = useState(activeTab);

  const tabsStyle = {
    margin,
    border,
    width: "100%", 
    boxSizing: "border-box",
    outline: selected ? "2px solid gray" : "none",
  };

  const tabHeaderStyle = {
    display: "flex",
    backgroundColor,
    padding,
    cursor: "move", 
  };

  const tabButtonStyle = (index: number) => ({
    color,
    fontSize,
    padding: "8px 16px",
    border: "none",
    backgroundColor: index === active ? activeBackgroundColor : "transparent",
    cursor: "pointer",
    outline: "none",
    userSelect: "none",
  });

  const tabContentStyle = {
    padding: "16px",
    backgroundColor: activeBackgroundColor,
    border: "1px solid #ccc",
    display: active === -1 ? "none" : "block", // Ẩn content nếu không có tab nào được chọn
  };

  const handleTabClick = (index: number) => {
    setActive(index);
    actions.setProp((prop: TabsProps) => {
      prop.activeTab = index;
    }, id);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    actions.selectNode(id);
    console.log("TabsLayout selected:", id, "Selected state:", selected);
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({ x: event.pageX, y: event.pageY });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  return (
    <div
      ref={(ref) => { if (ref) connect(drag(ref)); }}
      className={`relative cursor-move transition-all ${isHovered || selected ? "border border-dashed border-gray-400" : ""}`}
      onContextMenu={handleContextMenu}
      onClick={handleCloseContextMenu}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={tabsStyle} onClick={handleClick}>
        <div style={tabHeaderStyle}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              style={tabButtonStyle(index)}
              onClick={() => handleTabClick(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        {tabs.map((tab, index) => (
          <div
            key={index}
            style={tabContentStyle}
            hidden={active !== index}
          >
            <Element
              id={`tab-content-${index}`}
              is="div"
              canvas
              className="p-2"
            >
              {tab.content}
              {props.children}
            </Element>
          </div>
        ))}
      </div>
      <DeleteContextMenu
        nodeId={id}
        onClose={handleCloseContextMenu}
        position={contextMenu}
        onDelete={() => {
          actions.delete(id);
        }}
      />
    </div>
  );
};

TabsLayout.craft = {
  displayName: "TabsLayout",
  props: getTabsPropertiesDefaults(),
  rules: {
    canDrag: () => true, 
    canDrop: () => true, 
  },
  related: {
    toolbar: TabsProperties,
  },
};

