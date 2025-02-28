import { useEditor, useNode } from "@craftjs/core";
import React, { useState } from "react";
import { DeleteContextMenu } from "../../../delete_context_menu/delete-context-menu";
import { DefaultContainerProperties, getDefaultContainerProperties } from "./container-properties";
import { ContainerProperties } from "./properties-container-panel";
import { ResizeHandles } from "./resizes";

export const ContainerLayout = (props: Partial<DefaultContainerProperties>) => {
  const {
    connectors: { connect, drag },
    selected,
    id,
  } = useNode((node) => ({
    selected: node.events.selected,
    id: node.id,
  }));

  const { actions } = useEditor();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    actions.selectNode(id);
    console.log("Node clicked and selected:", id);
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
        }
      }}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      className="relative"
      style={{
        width: props.width,
        height: props.height,
        maxWidth: props.maxWidth,
        maxHeight: props.maxHeight,
        minWidth: props.minWidth,
        minHeight: props.minHeight,
        backgroundColor: props.backgroundColor,
        color: props.textColor,
        border: `${props.borderWidth} ${props.borderStyle || "solid"} ${props.borderColor}`,
        borderRadius: props.borderRadius,
        padding: `${props.paddingTop} ${props.paddingRight} ${props.paddingBottom} ${props.paddingLeft}`,
        margin: `${props.marginTop} ${props.marginRight} ${props.marginBottom} ${props.marginLeft}`,
        display: props.display || "flex",
        flexDirection: props.flexDirection,
        alignItems: props.alignItems,
        justifyContent: props.justifyContent,
        gap: props.gap,
        boxShadow: props.boxShadow,
        position: props.position || "relative",
        top: props.top,
        left: props.left,
        right: props.right,
        bottom: props.bottom,
        zIndex: props.zIndex,
        overflow: props.overflow,
        opacity: props.opacity,
        outline: selected ? "2px solid gray" : "none",
      }}
    >
      {props.children}
      <ResizeHandles nodeId={id} />
      <DeleteContextMenu
        nodeId={id}
        onClose={handleCloseContextMenu}
        position={contextMenu}
        onDelete={() => {}}
      />
    </div>
  );
};

ContainerLayout.craft = {
  displayName: "ContainerLayout",
  props: getDefaultContainerProperties(),
  rules: {
    canDrop: () => true,
  },
  related: {
    toolbar: ContainerProperties,
  },
};