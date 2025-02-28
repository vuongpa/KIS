import React, { useEffect } from "react";
import Swal from "sweetalert2";

interface DeleteProjectModalProps {
  projectId: number | null;
  onConfirmDelete: () => void;
  onCancel: () => void;
}

export const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({ projectId, onConfirmDelete, onCancel }) => {
  useEffect(() => {
    if (!projectId) return;

    Swal.fire({
      title: "Xóa dự án?",
      text: "Bạn có chắc chắn muốn xóa dự án này? Hành động này không thể hoàn tác.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirmDelete();
      } else {
        onCancel();
      }
    });

  }, [projectId]);

  return null;
};