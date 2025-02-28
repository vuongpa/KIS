import React, { useState } from "react";
import { useNode, useEditor } from "@craftjs/core";
import { getVideoPlayerPropertiesDefaults } from "./videoplayer-properties";
import { DeleteContextMenu } from "../../../delete_context_menu/delete-context-menu";
import { VideoPlayerProperties } from "./properties-videoplayer-pannel";

interface VideoPlayerProps extends Partial<ReturnType<typeof getVideoPlayerPropertiesDefaults>> {
  isYouTube?: boolean; 
}

export const VideoPlayerLayout: React.FC<VideoPlayerProps> & { craft: any } = (props) => {
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

  const defaultProps = getVideoPlayerPropertiesDefaults();
  const {
    src = defaultProps.src,
    width = defaultProps.width,
    height = defaultProps.height,
    controls = defaultProps.controls,
    autoplay = defaultProps.autoplay,
    loop = defaultProps.loop,
    muted = defaultProps.muted,
    padding = defaultProps.padding,
    margin = defaultProps.margin,
    backgroundColor = defaultProps.backgroundColor,
    border = defaultProps.border,
  } = props;

  const videoStyle = {
    width,
    height,
    padding,
    margin,
    backgroundColor,
    border,
    outline: selected ? "2px solid gray" : "none",
    display: "block",
    boxSizing: "border-box",
  };

  const isYouTube = src.includes("youtube.com/embed") || src.includes("youtu.be"); // Kiểm tra nếu URL là YouTube

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    actions.selectNode(id);
    console.log("VideoPlayerLayout selected:", id, "Selected state:", selected);
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
      className={`relative cursor-move transition-all ${isHovered || selected ? "border border-dashed border-gray-400" : ""}`}
      onContextMenu={handleContextMenu}
      onClick={handleCloseContextMenu}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isYouTube ? (
        <iframe
          src={src}
          width={parseInt(width) || 640}
          height={parseInt(height) || 360} 
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={videoStyle}
          onClick={handleClick}
        />
      ) : (
        <video
          src={src}
          width={parseInt(width) || 640}
          height={parseInt(height) || 360}
          controls={controls}
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
          onClick={handleClick}
          style={videoStyle}
        />
      )}
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

VideoPlayerLayout.craft = {
  displayName: "VideoPlayerLayout",
  props: getVideoPlayerPropertiesDefaults(),
  rules: {
    canDrag: () => true, 
    canDrop: () => true ,
  },
  related: {
    toolbar: VideoPlayerProperties, 
  },
};

