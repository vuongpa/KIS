import React, { useState, ChangeEvent } from "react";
import { useNode, useEditor } from "@craftjs/core";
import { getCheckboxPropertiesDefaults } from "./checkbox-properties";
import { CheckboxProperties } from "./properties-checkbox-panel";
import { DeleteContextMenu } from "../../../delete_context_menu/delete-context-menu";

interface CheckboxProps extends Partial<ReturnType<typeof getCheckboxPropertiesDefaults>> {}

export const CheckboxLayout: React.FC<CheckboxProps> & { craft: any } = (props) => {
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

  const defaultProps = getCheckboxPropertiesDefaults();
  const {
    label = defaultProps.label,
    value = defaultProps.value,
    name = defaultProps.name,
    checked = defaultProps.checked,
    color = defaultProps.color,
    fontSize = defaultProps.fontSize,
    padding = defaultProps.padding,
    margin = defaultProps.margin,
    backgroundColor = defaultProps.backgroundColor,
    border = defaultProps.border,
  } = props;

  const checkboxStyle = {
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
    console.log("CheckboxLayout selected:", id, "Selected state:", selected);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    actions.setProp((prop: CheckboxProps) => {
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

  return (
    <div
      ref={(ref) => { if (ref) connect(drag(ref)); }}
      className={`relative cursor-move transition-all ${isHovered || selected ? "border border-dashed border-gray-400" : ""}`}
      onContextMenu={handleContextMenu}
      onClick={handleCloseContextMenu}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={checkboxStyle} onClick={handleClick}>
        <input
          type="checkbox"
          name={name}
          value={value}
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

CheckboxLayout.craft = {
  displayName: "CheckboxLayout",
  props: getCheckboxPropertiesDefaults(),
  rules: {
    canDrag: () => true,
    canDrop: () => true ,
  },
  related: {
    toolbar: CheckboxProperties,
  },
};
