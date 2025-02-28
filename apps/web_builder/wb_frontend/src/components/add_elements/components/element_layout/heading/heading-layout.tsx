import React, { useState } from "react";
import { useNode, useEditor } from "@craftjs/core";
import { getHeadingPropertiesDefaults } from "./heading-properties";
import { HeadingProperties } from "./properties-heading-panel";
import { DeleteContextMenu } from "../../../delete_context_menu/delete-context-menu";


interface HeadingProps extends Partial<ReturnType<typeof getHeadingPropertiesDefaults>> {
  text?: string;
  level: number;
}
export const HeadingLayout: React.FC<HeadingProps> & { craft: any } = (props) => {
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

  const defaultProps = getHeadingPropertiesDefaults();
  const {
    text = "Heading",
    level = 1,
    color = defaultProps.color,
    fontFamily = defaultProps.fontFamily,
    fontSize = defaultProps.fontSize,
    fontWeight = defaultProps.fontWeight,
    textTransform = defaultProps.textTransform,
    textDecoration = defaultProps.textDecoration,
    letterSpacing = defaultProps.letterSpacing,
    lineHeight = defaultProps.lineHeight,
    textAlign = defaultProps.textAlign,
    textStroke = defaultProps.textStroke,
  } = props;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    actions.selectNode(id);
    console.log("HeadingLayout selected:", id, "Selected state:", selected);
  };

  const handleTextChange = (e: React.FormEvent<HTMLHeadingElement>) => {
    const newText = e.currentTarget.textContent || "";
    actions.setProp(id, (prop: HeadingProps) => {
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

  const headingStyle = {
    color,
    fontFamily,
    fontSize,
    fontWeight,
    textTransform,
    textDecoration,
    letterSpacing,
    lineHeight,
    textAlign,
    WebkitTextStroke: textStroke,
  };

  const HeadingTag = `h${level}` as React.ElementType;

  return (
    <div
      ref={(ref) => { if (ref) connect(drag(ref)); }}
      className={`relative cursor-pointer p-1 transition-all ${isHovered || selected ? "border border-dashed border-gray-400" : ""}`}
      onContextMenu={handleContextMenu}
      onClick={handleClick}
    >
      <HeadingTag
        contentEditable={selected}
        suppressContentEditableWarning={true}
        onBlur={handleTextChange}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={headingStyle}
      >
        {text}
      </HeadingTag>
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

export const HeadingDefaultProps: HeadingProps = {
  text: "Heading",
  level: 1,
  ...getHeadingPropertiesDefaults(),
};
HeadingLayout.craft = {
  displayName: "HeadingComponent",
  props: HeadingDefaultProps,
  related: {
    toolbar: HeadingProperties,
  },
};

export default HeadingLayout;