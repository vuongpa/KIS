import React from "react";
import { useEditor } from "@craftjs/core";
import { elementConfigs } from "../../../data";
import { TextLayout } from "./text-layout";

export const TextIcon: React.FC = () => {
  const { connectors } = useEditor();
  const textData = elementConfigs.find((el) => el.name === "Text");

  if (!textData) return <div>Text not found</div>;

  return (
    <div
      className="flex flex-col items-center gap-2 p-1  cursor-pointer"
      ref={(ref) => { if (ref) connectors.create(ref, <TextLayout/>); }}
    >
      <img src={textData.iconUrl} alt={textData.name} className="w-6 h-6" />
      <span className="text-xs font-medium">{textData.name}</span>
    </div>
  );
};
