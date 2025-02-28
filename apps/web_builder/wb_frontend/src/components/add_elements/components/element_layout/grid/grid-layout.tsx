// grid-layout.tsx
import React, { useState } from "react";
import { Element, useNode, useEditor } from "@craftjs/core";
import { getGridPropertiesDefaults } from "./properties-grid";
import { GridProperties } from "./properties-grid-panel";
import { DeleteContextMenu } from "../../../delete_context_menu/delete-context-menu";

interface GridProps extends Partial<ReturnType<typeof getGridPropertiesDefaults>> {
  children?: React.ReactNode;
}

export const GridLayout: React.FC<GridProps> & { craft: any } = (props) => {
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

  const defaultProps = getGridPropertiesDefaults();
  const {
    columns = defaultProps.columns,
    rows = defaultProps.rows,
    gap = defaultProps.gap,
    padding = defaultProps.padding,
    margin = defaultProps.margin,
    backgroundColor = defaultProps.backgroundColor,
    border = defaultProps.border,
  } = props;

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`, 
    gridTemplateRows: `repeat(${rows}, 1fr)`, 
    gap,
    padding,
    margin,
    backgroundColor,
    border,
    minHeight: "200px",
    width: "100%",
    boxSizing: "border-box",
    outline: selected ? "2px solid gray" : "none",
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    actions.selectNode(id);
    console.log("GridLayout selected:", id, "Selected state:", selected);
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
      <div style={gridStyle} onClick={handleClick}>
        {Array.from({ length: rows * columns }).map((_, index) => (
          <Element
            key={index}
            id={`grid-item-${index}`}
            is="div"
            canvas
            className={`p-4 ${selected ? "border border-dashed border-gray-500" : "border-transparent"}`}
          >
            {props.children}
          </Element>
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

GridLayout.craft = {
  displayName: "GridLayout",
  props: getGridPropertiesDefaults(),
  rules: {
    canDrag: () => true,
    canDrop: (nodes) => true, 
  },
  related: {
    toolbar: GridProperties,
  },
};

