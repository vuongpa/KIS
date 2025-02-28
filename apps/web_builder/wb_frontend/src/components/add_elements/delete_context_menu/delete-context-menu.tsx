import React, { useEffect } from "react";
import { useEditor } from "@craftjs/core";

interface DeleteContextMenuProps {
    nodeId: string;
    onClose: () => void;
    position: { x: number; y: number } | null;
    onDelete: () => void;
}
export const DeleteContextMenu: React.FC<DeleteContextMenuProps> = ({
    nodeId,
    onClose,
    position,
    onDelete,
}) => {
    const { actions } = useEditor();
    const handleDelete = () => {
        actions.delete(nodeId);
        onClose();
        if (onDelete) {
            onDelete();
        }
    };
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (position) {
                const menuElement = document.querySelector(".delete-context-menu"); 
                if (menuElement && !menuElement.contains(event.target as Node)) {
                    onClose();
                }
            }
        };

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEsc);
        };
    }, [position, onClose]);

    if (!position) return null;

    return (
        <div
            className="delete-context-menu absolute bg-gray-800 text-white shadow-lg rounded p-2 z-50"
            style={{
                top: position.y,
                left: position.x,
                minWidth: "120px",
                position: "fixed",
            }}
            onClick={(e) => {
                e.stopPropagation();
                onClose();
            }}
        >
            <ul className="list-none m-0 p-0">
                <li
                    className="cursor-pointer p-2 hover:bg-gray-700"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                    }}
                >
                    Delete
                </li>
            </ul>
        </div>
    );
};