import React, { useState } from "react";
import { useNode, useEditor } from "@craftjs/core";
import { getRadioPropertiesDefaults } from "./properties-radio";
import { RadioProperties } from "./radio-properties-panel";
import { DeleteContextMenu } from "../../../delete_context_menu/delete-context-menu";

interface RadioProps extends Partial<ReturnType<typeof getRadioPropertiesDefaults>> {}

export const RadioLayout: React.FC<RadioProps> & { craft: any } = (props) => {
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

  const defaultProps = getRadioPropertiesDefaults();
  const {
    label = defaultProps.label,
    name = defaultProps.name,
    checked = defaultProps.checked,
    color = defaultProps.color,
    fontSize = defaultProps.fontSize,
    padding = defaultProps.padding,
    margin = defaultProps.margin,
    backgroundColor = defaultProps.backgroundColor,
    border = defaultProps.border,
  } = props;

  const radioStyle = {
    display: "flex",
    alignItems: "center",
    padding,
    margin,
    backgroundColor,
    border,
    outline: selected ? "2px solid gray" : "none",
    cursor: "move", 
    boxSizing: "border-box",
  };

  const labelStyle = {
    color,
    fontSize,
    marginLeft: "8px",
    userSelect: "none",
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    actions.selectNode(id);
    console.log("RadioLayout selected:", id, "Selected state:", selected);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    actions.setProp((prop: RadioProps) => {
      prop.checked = e.target.checked;
    }, id);
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({ x: event.pageX, y: event.pageY });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  console.log("Connecting and dragging RadioLayout with ID:", id);

  return (
    <div
      ref={(ref) => connect(drag(ref))} 
      className={`relative cursor-move transition-all ${isHovered || selected ? "border border-dashed border-gray-400" : ""}`}
      onContextMenu={handleContextMenu}
      onClick={handleCloseContextMenu}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={radioStyle} onClick={handleClick}>
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={handleChange}
          style={{ cursor: "pointer" }}
        />
        <label style={labelStyle}>{label}</label>
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

RadioLayout.craft = {
  displayName: "RadioLayout", 
  props: getRadioPropertiesDefaults(), 
  rules: {
    canDrag: () => true,
    canDrop: () => true, 
  },
  related: {
    toolbar: RadioProperties,
  },
};
