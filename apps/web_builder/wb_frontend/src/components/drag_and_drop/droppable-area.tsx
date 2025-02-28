import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableAreaProps {
  id: string;
  children?: React.ReactNode;
  onDrop?: (droppedData: any) => void;
}

export const DroppableArea: React.FC<DroppableAreaProps> = ({ id, children, onDrop }) => {
  const { setNodeRef, isOver, active } = useDroppable({ id });
  const [droppedItems, setDroppedItems] = useState<any[]>([]);

  const handleDrop = () => {
    console.log("🔥 handleDrop called");

    if (!active?.data?.current) {
      console.warn("⚠ No active data during drop.");
      return;
    }

    const droppedData = active.data.current;
    console.log("🏁 Dropped data:", droppedData);

    setDroppedItems((prev) => {
      if (prev.some((item) => item.id === droppedData.id)) {
        console.warn(`⚠ Item with ID ${droppedData.id} already exists.`);
        return prev;
      }
      console.log("✅ Adding dropped item:", droppedData);
      return [...prev, droppedData];
    });

    if (onDrop) {
      console.log("📩 Calling onDrop with:", droppedData);
      onDrop(droppedData);
    }
  };

  return (
    <div
      ref={setNodeRef}
      onDragOver={(e) => e.preventDefault()} // Cho phép thả
      onDrop={handleDrop} // Thực hiện handleDrop khi thả
      className={`p-0 border rounded transition-colors ${isOver ? "bg-blue-200" : "bg-white"}`}
    >
      {children}
      {droppedItems.map((item, index) => (
        <div key={index} className="p-2 border mt-2 bg-gray-100 rounded">
          <span className="text-sm font-semibold">{item.name}</span>
        </div>
      ))}
    </div>
  );
};
