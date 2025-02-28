
import React, { useState } from "react";
import { useNode, useEditor } from "@craftjs/core";
import { getLinkPropertiesDefaults } from "./link-properties";
import { LinkProperties } from "./properties-link-panel";
import { DeleteContextMenu } from "../../../delete_context_menu/delete-context-menu";

interface LinkProps extends Partial<ReturnType<typeof getLinkPropertiesDefaults>> {}

export const LinkLayout: React.FC<LinkProps> & { craft: any } = (props) => {
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

  const defaultProps = getLinkPropertiesDefaults();
  const {
    url = defaultProps.url,
    text = defaultProps.text,
    target = defaultProps.target,
    color = defaultProps.color,
    fontFamily = defaultProps.fontFamily,
    fontSize = defaultProps.fontSize,
    textDecoration = defaultProps.textDecoration,
  } = props;

  const linkStyle = {
    color,
    fontFamily,
    fontSize,
    textDecoration,
    cursor: "pointer",
    outline: selected ? "2px solid gray" : "none",
    display: "inline-block", 
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    actions.selectNode(id);
    console.log("LinkLayout selected:", id, "Selected state:", selected);
  };

  const handleTextChange = (e: React.FormEvent<HTMLAnchorElement>) => {
    const newText = e.currentTarget.textContent || "";
    actions.setProp((prop: LinkProps) => {
      prop.text = newText;
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
      className={`relative cursor-pointer transition-all ${isHovered || selected ? "border border-dashed border-gray-400" : ""}`}
      onContextMenu={handleContextMenu}
      onClick={handleCloseContextMenu}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        contentEditable={selected} 
        suppressContentEditableWarning={true}
        href={url}
        target={target}
        onClick={handleClick}
        onBlur={handleTextChange} 
        style={linkStyle}
      >
        {text}
      </a>
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

LinkLayout.craft = {
  displayName: "LinkLayout",
  props: getLinkPropertiesDefaults(),
  rules: {
    canDrag: () => true,
    canDrop: () => true,
  },
  related: {
    toolbar: LinkProperties, 
  },
};

