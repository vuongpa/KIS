
import React from "react";
import { useEditor } from "@craftjs/core";

export const UndoRedo: React.FC = () => {
    const { canUndo, canRedo, actions } = useEditor((state, query) => ({
        canUndo: query.history.canUndo(),
        canRedo: query.history.canRedo()
      }));

  const handleUndo = () => {
    if (canUndo) {
      actions.history.undo();
      console.log("Undo action triggered");
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      actions.history.redo();
      console.log("Redo action triggered");
    }
  };

  return (
    <div className="flex gap-2 p-2 bg-gray-800 text-white rounded">
      <button
        onClick={handleUndo}
        disabled={!canUndo}
        className={`px-4 py-2 rounded ${!canUndo ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
      >
        Undo
      </button>
      <button
        onClick={handleRedo}
        disabled={!canRedo}
        className={`px-4 py-2 rounded ${!canRedo ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
      >
        Redo
      </button>
    </div>
  );
};