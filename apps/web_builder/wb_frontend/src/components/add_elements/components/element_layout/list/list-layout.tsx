// list-layout.tsx
import React, { useState } from "react";
import { Element, useNode, useEditor } from "@craftjs/core";
import { getListPropertiesDefaults } from "./list-properties";
import { ListProperties } from "./properties-list-panel";
import { DeleteContextMenu } from "../../../delete_context_menu/delete-context-menu";

interface ListProps extends Partial<ReturnType<typeof getListPropertiesDefaults>> {
  children?: React.ReactNode;
}

export const ListLayout: React.FC<ListProps> & { craft: any } = (props) => {
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

  const defaultProps = getListPropertiesDefaults();
  const {
    type = defaultProps.type,
    items = defaultProps.items,
    color = defaultProps.color,
    fontSize = defaultProps.fontSize,
    padding = defaultProps.padding,
    margin = defaultProps.margin,
    backgroundColor = defaultProps.backgroundColor,
    border = defaultProps.border,
  } = props;

  const listStyle = {
    listStyleType: type === "ol" ? "decimal" : "disc",
    color,
    fontSize,
    padding,
    margin,
    backgroundColor,
    border,
    outline: selected ? "2px solid gray" : "none",
    cursor: "move", 
    boxSizing: "border-box",
    width: "100%",
  };

  const itemStyle = {
    margin: "5px 0", 
    padding: "5px",
    userSelect: "none", 
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    actions.selectNode(id);
    console.log("ListLayout selected:", id, "Selected state:", selected);
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
      {type === "ol" ? (
        <ol style={listStyle} onClick={handleClick}>
          {items.map((item, index) => (
            <li key={index} style={itemStyle}>
              <Element
                id={`list-item-${index}`}
                is="div"
                canvas
                className="p-2"
              >
                {item}
                {props.children}
              </Element>
            </li>
          ))}
        </ol>
      ) : (
        <ul style={listStyle} onClick={handleClick}>
          {items.map((item, index) => (
            <li key={index} style={itemStyle}>
              <Element
                id={`list-item-${index}`}
                is="div"
                canvas
                className="p-2"
              >
                {item}
                {props.children}
              </Element>
            </li>
          ))}
        </ul>
      )}
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

ListLayout.craft = {
  displayName: "ListLayout",
  props: getListPropertiesDefaults(),
  rules: {
    canDrag: () => true, 
    canDrop: () => true, 
  },
  related: {
    toolbar: ListProperties,
  },
};

