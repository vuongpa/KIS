import React from "react";
import {
  DeleteProjectModal,
  DuplicateProjectModal,
  EditProject,
  MoveProject,
  ProjectSettings,
  PublishProject
} from "./page";
import { useParams } from "react-router-dom";

export const ProjectsDetail: React.FC = () => {
  const { action, projectId } = useParams();
  const renderPage = () => {
    switch (action) {
      case "edit":
        return <EditProject />;
      case "publish":
        return <PublishProject />;
      case "duplicate":
        return (
          <DuplicateProjectModal
            projectId={parseInt(projectId || "")}
            onClose={() => console.log("Close Duplicate Project Modal")}
            onDuplicate={(id) => console.log(`Duplicate project with ID: ${id}`)}
          />
        );
      case "move":
        return <MoveProject />;
      case "settings":
        return <ProjectSettings />;
      case "delete":
        return <DeleteProjectModal
        projectId={null}
        onConfirmDelete={() => console.log("Gọi API xóa tại đây")}
        onCancel={() => console.log("Hủy xóa")}
      />;
      default:
        return <h1>404 - Page Not Found</h1>;
    }
  };
  return <div>{renderPage()}</div>;
};