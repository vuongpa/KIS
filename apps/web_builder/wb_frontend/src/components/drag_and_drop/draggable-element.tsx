import React from "react";
import { useDraggable } from "@dnd-kit/core";

interface DraggableElementProps {
  element: {
    id: string;
    name: string;
    iconUrl: string;
    layoutComponent: string;
    properties: Record<string, any>;
  };
}

export const DraggableElement: React.FC<DraggableElementProps> = ({ element }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: element.id.toString(),
    data: {
      id: element.id,
      name: element.name,
      layoutComponent: element.layoutComponent,
      properties: { ...element.properties },
    },
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDragStart = () => {
    console.log(`🚀 Dragging started for: ${element.name} (ID: ${element.id})`);
    console.log("🔍 Full element data:", element);
  };

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="flex flex-col items-center border border-gray-700 p-2 rounded hover:scale-105 active:scale-95"
      onMouseDown={handleDragStart}
    >
      <img src={element.iconUrl} alt={`${element.name} Icon`} className="w-8 h-8" />
      <span className="text-xs mt-1">{element.name}</span>
    </button>
  );
};
