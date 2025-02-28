// src/pages/create_projects/CreateProjectsPage.tsx
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DefaultFcProps, HasClasses } from "../../react_utils";
import { CreateProjectForm } from "../../components/create_project_form";

// Tạo QueryClient để dùng trong toàn bộ component
const queryClient = new QueryClient();

export const CreateProjectsPage: React.FC<DefaultFcProps & HasClasses> = ({ classes }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={classes.pageWrapper}>
        <CreateProjectForm onClose={() => console.log("Form closed")} />
      </div>
    </QueryClientProvider>
  );
};
