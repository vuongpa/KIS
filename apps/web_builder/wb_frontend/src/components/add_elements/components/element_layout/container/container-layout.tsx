import React, { useState } from "react";
import { Element, useNode, useEditor } from "@craftjs/core";
import { getDefaultContainerProperties, DefaultContainerProperties } from "./container-properties";
import { ContainerProperties } from "./properties-container-panel";
import { DeleteContextMenu } from "../../../delete_context_menu/delete-context-menu";
import { ResizeHandles } from "./resizes";

interface ContainerProps extends Partial<DefaultContainerProperties> {
  children?: React.ReactNode;
}

interface CraftComponent extends React.FC<ContainerProps> {
  craft?: any;
}

export const ContainerLayout: CraftComponent = (props) => {
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
      <Element id="drop_target" canvas is="div" className="w-full h-full flex flex-col gap-2">
        {props.children}
      </Element>
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