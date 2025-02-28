import React, { useState } from "react";
import { Element, useNode, useEditor } from "@craftjs/core";
import { getImagePropertiesDefaults } from "./image-properties";
import { ImageProperties } from "./properties-image-panel";
import { DeleteContextMenu } from "../../../delete_context_menu/delete-context-menu";

interface ImageProps extends Partial<ReturnType<typeof getImagePropertiesDefaults>> {
  children?: React.ReactNode;
}

export const ImageLayout: React.FC<ImageProps> & { craft: any } = (props) => {
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

  const defaultProps = getImagePropertiesDefaults();
  const {
    src = defaultProps.src,
    alt = defaultProps.alt,
    width = defaultProps.width,
    height = defaultProps.height,
    padding = defaultProps.padding,
    margin = defaultProps.margin,
    border = defaultProps.border,
    backgroundColor = defaultProps.backgroundColor,
  } = props;

  const imageStyle = {
    width,
    height,
    padding,
    margin,
    border,
    backgroundColor,
    outline: selected ? "2px solid gray" : "none",
    display: "block",
    position: "relative",
    boxSizing: "border-box",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(255, 255, 255, 0.1)", 
    zIndex: 1, 
    pointerEvents: "auto", 
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    actions.selectNode(id);
    console.log("ImageLayout selected:", id, "Selected state:", selected);
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
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
          console.log("Connected drag ref for ImageLayout:", ref);
        }
      }}
      className={`relative cursor-move transition-all ${isHovered || selected ? "border border-dashed border-gray-400" : ""}`} // Thay cursor-pointer bằng cursor-move
      onContextMenu={handleContextMenu}
      onClick={handleCloseContextMenu}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={src}
        alt={alt}
        onClick={handleClick}
        style={imageStyle}
      />
      <Element
        id="drop_target"
        canvas
        is="div"
        style={overlayStyle}
        className="absolute top-0 left-0 w-full h-full"
      >
        {props.children}
      </Element>
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

ImageLayout.craft = {
  displayName: "ImageLayout",
  props: getImagePropertiesDefaults(),
  rules: {
    canDrag: () => true,
    canDrop: (nodes) => true, 
  },
  related: {
    toolbar: ImageProperties,
  },
};