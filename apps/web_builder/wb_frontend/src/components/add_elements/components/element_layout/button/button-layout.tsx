import React, { useState } from "react";
import { useNode, useEditor } from "@craftjs/core";
import { getButtonPropertiesDefaults } from "./button-properties"; 
import { ButtonProperties } from "./button-properties-panel";
import { DeleteContextMenu } from "../../../delete_context_menu/delete-context-menu";

interface ButtonProps extends Partial<ReturnType<typeof getButtonPropertiesDefaults>> {
  text?: string;
}

export const ButtonLayout: React.FC<ButtonProps> & { craft: any } = (props) => {
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

  const defaultProps = getButtonPropertiesDefaults();
  const {
    text = "Button",
    fontFamily = defaultProps.fontFamily,
    fontWeight = defaultProps.fontWeight,
    fontSize = defaultProps.fontSize,
    lineHeight = defaultProps.lineHeight,
    color = defaultProps.color,
    textAlign = defaultProps.textAlign,
    textDecoration = defaultProps.textDecoration,
    backgroundColor = defaultProps.backgroundColor,
    borderRadius = defaultProps.borderRadius,
    borderStyle = defaultProps.borderStyle,
    borderWidth = defaultProps.borderWidth,
    borderColor = defaultProps.borderColor,
  } = props;

  const buttonStyle = {
    fontFamily,
    fontWeight,
    fontSize,
    lineHeight,
    color,
    textAlign,
    textDecoration,
    backgroundColor,
    borderRadius,
    border: `${borderWidth} ${borderStyle} ${borderColor}`,
    padding: "8px 16px",
    cursor: "pointer",
    outline: selected ? "2px solid gray" : "none",
    width: "150px", 
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    actions.selectNode(id);
    console.log("ButtonLayout selected:", id, "Selected state:", selected);
  };

  const handleTextChange = (e: React.FormEvent<HTMLButtonElement>) => {
    const newText = e.currentTarget.textContent || "";
    actions.setProp(id, (prop: ButtonProps) => {
      prop.text = newText;
    });
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
      className={`relative cursor-pointer transition-all ${isHovered || selected ? "border border-dashed border-gray-400" : ""}`}
      onContextMenu={handleContextMenu}
      onClick={handleCloseContextMenu}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        contentEditable={selected}
        suppressContentEditableWarning={true}
        onClick={handleClick}
        onBlur={handleTextChange}
        style={buttonStyle}
      >
        {text}
      </button>
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

ButtonLayout.craft = {
  displayName: "ButtonLayout",
  props: getButtonPropertiesDefaults(),
  rules: {
    canDrag: () => true,
    canDrop: () => true,
  },
  related: {
    toolbar: ButtonProperties,
  },
};
