import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface DuplicateProjectProps {
  projectId: number;
  onClose: () => void;
  onDuplicate: (projectId: number) => void;
} 

export const DuplicateProjectModal: React.FC<DuplicateProjectProps>
  = ({ projectId, onClose, onDuplicate }) => {

    const handleDuplicate = () => {
      onDuplicate(projectId);
      onClose();
    };

    const handleCancel = () => {
      onClose();
    };

    useEffect(() => {
      MySwal.fire({
        title: 'Duplicate Project',
        html: (
          <>
            <p>
              Do you want to make a copy of this project?
            </p>
          </>
        ),
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Duplicate',
        reverseButtons: true,
        preConfirm: handleDuplicate,
        willClose: handleCancel,
      });
    }, [projectId, onDuplicate, onClose]);

    return null;
  };