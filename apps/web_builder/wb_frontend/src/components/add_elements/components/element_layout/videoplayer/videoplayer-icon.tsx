import React from "react";
import { useEditor } from "@craftjs/core";
import { elementConfigs } from "../../../data";
import { VideoPlayerLayout } from "./videoplayer-layout";

export const VideoIcon: React.FC = () => {
  const { connectors } = useEditor();
  const textData = elementConfigs.find((el) => el.name === "VideoPlayer");

  if (!textData) return <div>Text not found</div>;

  return (
    <div
      className="flex flex-col items-center gap-2 p-1  cursor-pointer"
       ref={(ref) => { if (ref) connectors.create(ref, < VideoPlayerLayout />); }}
    >
      <img src={textData.iconUrl} alt={textData.name} className="w-6 h-6" />
      <span className="text-xs font-medium">{textData.name}</span>
    </div>
  );
};
