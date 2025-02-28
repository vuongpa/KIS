import React from "react";
import { useEditor } from "@craftjs/core";
import { elementConfigs } from "../../../data";
import { ColumnLayout } from "./column-layout";

export const ColumnIcon: React.FC = () => {
  const { connectors } = useEditor();
  const containerData = elementConfigs.find((el) => el.name === "Column");

  if (!containerData) return <div>Column not found</div>;
return (
    <div
      className="flex flex-col items-center gap-2 p-1  cursor-pointer"
     ref={(ref) => { if (ref) connectors.create(ref, <ColumnLayout/>); }}
    >
      <img src={containerData.iconUrl} alt={containerData.name} className="w-6 h-6" />
      <span className="text-xs font-medium">{containerData.name}</span>
    </div>
  );
};
