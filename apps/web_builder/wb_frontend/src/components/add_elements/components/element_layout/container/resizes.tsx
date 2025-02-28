import React, { useRef, useState, useEffect } from "react";
import { useNode, useEditor } from "@craftjs/core";

interface ResizeHandlesProps {
  nodeId: string; 
}
export const ResizeHandles: React.FC<ResizeHandlesProps> = ({ nodeId }) => {
  const { actions } = useEditor();
  const { node } = useNode((node) => ({
    node: node,
  }));

  const [isResizing, setIsResizing] = useState<string | null>(null); 
  const [startPosition, setStartPosition] = useState<{ x: number; y: number } | null>(null);
  const [startSize, setStartSize] = useState<{ width: number; height: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentProps = node.data.props as { width?: string; height?: string };
  const width = parseFloat(currentProps.width || "200") || 200;
  const height = parseFloat(currentProps.height || "100") || 100; 

  const updateSize = (newWidth: number, newHeight: number) => {
    actions.setProp(nodeId, (props: any) => {
      props.width = `${newWidth}px`;
      props.height = `${newHeight}px`;
    });
  };

  const handleMouseDown = (corner: string, event: React.MouseEvent) => {
    event.preventDefault();
    setIsResizing(corner);
    setStartPosition({ x: event.pageX, y: event.pageY });
    setStartSize({ width, height });
  };
  let animationFrameId: number | null = null;
  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizing || !startPosition || !startSize) return;

    const dx = event.pageX - startPosition.x;
    const dy = event.pageY - startPosition.y;
    let newWidth = startSize.width;
    let newHeight = startSize.height;

    switch (isResizing) {
      case "top-left":
        newWidth = Math.max(50, startSize.width - dx); 
        newHeight = Math.max(50, startSize.height - dy);
        break;
      case "top-right":
        newWidth = Math.max(50, startSize.width + dx);
        newHeight = Math.max(50, startSize.height - dy);
        break;
      case "bottom-left":
        newWidth = Math.max(50, startSize.width - dx);
        newHeight = Math.max(50, startSize.height + dy);
        break;
      case "bottom-right":
        newWidth = Math.max(50, startSize.width + dx);
        newHeight = Math.max(50, startSize.height + dy);
        break;
      default:
        return;
    }
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = requestAnimationFrame(() => {
      updateSize(newWidth, newHeight);
    });
  };
  const handleMouseUp = () => {
    setIsResizing(null);
    setStartPosition(null);
    setStartSize(null);
  };
  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div ref={containerRef} className="absolute w-full h-full pointer-events-none">
      <div
        className="absolute w-4 h-4 border-2 border-transparent rounded-full cursor-nwse-resize pointer-events-auto"
        style={{ top: "-2px", left: "-2px" }}
        onMouseDown={(e) => handleMouseDown("top-left", e)}
      />
      <div
        className="absolute w-4 h-4 border-2 border-transparent rounded-full cursor-nesw-resize pointer-events-auto"
        style={{ top: "-2px", right: "-2px" }}
        onMouseDown={(e) => handleMouseDown("top-right", e)}
      />
      <div
        className="absolute w-4 h-4 border-2 border-transparent rounded-full cursor-nesw-resize pointer-events-auto"
        style={{ bottom: "-2px", left: "-2px" }}
        onMouseDown={(e) => handleMouseDown("bottom-left", e)}
      />
      <div
        className="absolute w-4 h-4 border-2 border-transparent rounded-full cursor-nwse-resize pointer-events-auto"
        style={{ bottom: "-2px", right: "-2px" }}
        onMouseDown={(e) => handleMouseDown("bottom-right", e)}
      />
    </div>
  );
};