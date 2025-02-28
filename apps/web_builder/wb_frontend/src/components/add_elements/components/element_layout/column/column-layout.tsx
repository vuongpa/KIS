import { Element, useNode } from "@craftjs/core";
import React from "react";

interface ColumnProp {
  children?: React.ReactNode;
}

export const ColumnLayout: React.FC<ColumnProp> = ({ children , ...props}) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      className="flex border border-dashed border-gray-500 w-full h-20"
    >
      <Element id="leftColumn" is="div" canvas className="flex-1 border-r border-dashed border-gray-500 ">
        {children}
      </Element>
      <Element id="rightColumn" is="div" canvas className="flex-1">
        {children}
      </Element>
    </div>
  );
};
ColumnLayout.craft = {
  displayName: "ColumnLayout",
  rules: {
    canDrag: () => true,
    canDrop: () => true,
  },
};
