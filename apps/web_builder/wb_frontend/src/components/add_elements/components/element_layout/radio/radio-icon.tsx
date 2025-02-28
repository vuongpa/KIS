import React from "react";
import { useEditor } from "@craftjs/core";
import { elementConfigs } from "../../../data";
import { RadioLayout } from "./radio-layout";

export const RadioIcon: React.FC = () => {
  const { connectors } = useEditor();
  const containerData = elementConfigs.find((el) => el.name === "Radio");

  if (!containerData) return <div>Radio not found</div>;

  return (
    <div
      className="flex flex-col items-center gap-5 p-2 cursor-move"
      ref={(ref) => {
        if (ref) {
          connectors.create(ref, <RadioLayout />);
          console.log("Created RadioLayout from RadioIcon:", ref);
        }
      }}
      draggable="true"
    >
      <img src={containerData.iconUrl} alt={containerData.name} className="w-6 h-6" />
      <span className="text-xs font-medium">{containerData.name}</span>
    </div>
  );
};