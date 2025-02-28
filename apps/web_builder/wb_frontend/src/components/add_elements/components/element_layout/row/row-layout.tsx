import { Element, useNode } from "@craftjs/core";
import React from "react";

interface RowProp {
  children?: React.ReactNode;
}

export const RowLayout: React.FC<RowProp> = ({ children, ...props }) => {
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
      className="flex flex-col border border-dashed border-gray-500 w-full h-40"
    >
      <Element id="topRow" is="div" canvas className="flex-1 border-b border-dashed border-gray-500  ">
        {children}
      </Element>
      <Element id="bottomRow" is="div" canvas className="flex-1 " >
        {children}
      </Element>
    </div>
  );
};
RowLayout.craft = {
  displayName: "RowLayout",
  rules: {
    canDrag: () => true,
    canDrop: () => true,
  },
};
