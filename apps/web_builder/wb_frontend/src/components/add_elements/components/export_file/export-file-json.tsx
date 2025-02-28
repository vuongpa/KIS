import { useEditor } from "@craftjs/core";
import React from "react";

export const ExportFileJson: React.FC = () => {
  const { query } = useEditor();

  const handleExport = () => {
    const jsonData = query.serialize(); 
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "layout.json"; 
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleExport} className=" text-white p-2 rounded">
       Export 
    </button>
  );
};
