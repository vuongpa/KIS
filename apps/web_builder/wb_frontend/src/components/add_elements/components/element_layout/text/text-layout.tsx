import React, { useState } from "react";
import { useNode, useEditor } from "@craftjs/core";
import { getTextDefaultProperties, TextDefaultProperties } from "./text-properties";
import { TextProperties } from "./properties-text-panel";
import { DeleteContextMenu } from "../../../delete_context_menu/delete-context-menu";

interface TextProps extends Partial<TextDefaultProperties> {
  text?: string;
}

export const TextLayout: React.FC<TextProps> & { craft: any } = (props) => {
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

  const defaultProps = getTextDefaultProperties();
  const {
    text = "Hi there",
    fontSize = defaultProps.fontSize,
    fontWeight = defaultProps.fontWeight,
    fontFamily = defaultProps.fontFamily,
    textAlign = defaultProps.textAlign,
    marginTopTypography = defaultProps.marginTopTypography,
    marginRightTypography = defaultProps.marginRightTypography,
    marginBottomTypography = defaultProps.marginBottomTypography,
    marginLeftTypography = defaultProps.marginLeftTypography,
    paddingTop = defaultProps.paddingTop,
    paddingRight = defaultProps.paddingRight,
    paddingBottom = defaultProps.paddingBottom,
    paddingLeft = defaultProps.paddingLeft,
    lineHeight = defaultProps.lineHeight,
    letterSpacing = defaultProps.letterSpacing,
    textDecoration = defaultProps.textDecoration,
    textTransform = defaultProps.textTransform,
    backgroundColorAppearance = defaultProps.backgroundColorAppearance,
    boxShadowAppearance = defaultProps.boxShadowAppearance,
    textColorAppearance = defaultProps.textColorAppearance,
    textShadow = defaultProps.textShadow,
    opacity = defaultProps.opacity,
    whiteSpace = defaultProps.whiteSpace,
  } = props;

  const fontWeightValue = {
    "100": "100",
    "200": "200",
    "300": "300",
    "400": "400",
    "500": "500",
    "600": "600",
    "700": "700",
    "800": "800",
    "900": "900",
    regular: "400",
    medium: "500",
    bold: "700",
  }[fontWeight] || "400";

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    actions.selectNode(id);
    console.log("TextLayout selected:", id);
  };

  const handleTextChange = (e: React.FormEvent<HTMLHeadingElement>) => {
    const newText = e.currentTarget.textContent || "";
    actions.setProp(id, (props: TextProps) => {
      props.text = newText;
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
      className={`relative cursor-pointer p-1 transition-all ${isHovered || selected ? "border border-dashed border-gray-400" : ""}`}
      onContextMenu={handleContextMenu}
      onClick={handleCloseContextMenu}
    >
      <h1
        contentEditable={selected}
        suppressContentEditableWarning={true}
        onClick={handleClick}
        onBlur={handleTextChange}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          fontSize: fontSize,
          fontWeight: fontWeightValue,
          fontFamily: fontFamily,
          textAlign: textAlign,
          marginTop: marginTopTypography,
          marginRight: marginRightTypography,
          marginBottom: marginBottomTypography,
          marginLeft: marginLeftTypography,
          paddingTop: paddingTop,
          paddingRight: paddingRight,
          paddingBottom: paddingBottom,
          paddingLeft: paddingLeft,
          lineHeight: lineHeight,
          letterSpacing: letterSpacing,
          textDecoration: textDecoration,
          textTransform: textTransform,
          backgroundColor: backgroundColorAppearance,
          boxShadow: boxShadowAppearance,
          color: textColorAppearance,
          textShadow: textShadow,
          opacity: opacity,
          whiteSpace: whiteSpace,
          outline: "none",
        }}
      >
        {text}
      </h1>
      <DeleteContextMenu
        nodeId={id}
        onClose={handleCloseContextMenu}
        position={contextMenu}
        onDelete={() => {}}
      />
    </div>
  );
};

TextLayout.craft = {
  displayName: "TextLayout",
  props: getTextDefaultProperties(),
  related: {
    toolbar: TextProperties,
  },
};