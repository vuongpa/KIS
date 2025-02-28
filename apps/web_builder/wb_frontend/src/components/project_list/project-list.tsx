import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ContextMenu, MenuActions } from "./components";
import { HasData } from "../../react_utils";
import { selectSearchKeyword } from "../../redux_logic";
import { Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { DuplicateProjectModal, DeleteProjectModal } from "../project_detail/page";
import { callDeleteAPI, callGetAPI, callPostAPI } from "../../api_utils";
import Swal from "sweetalert2";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";


export const ProjectList: React.FC<HasData> = ({ }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openDuplicateModal, setOpenDuplicateModal] = useState(false);

  const navigate = useNavigate();
  const keyword = useSelector(selectSearchKeyword);



  useEffect(() => {
    setCurrentPage(1);
  }, [keyword]);

  useEffect(() => {
    const fetchProjects = async () => {
      Swal.fire({
        title: "Loading...",
        text: "Please wait while we fetch your projects.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const endpoint = keyword
          ? `/projects?name=${keyword}&page=${currentPage}&limit=8`
          : `/projects?page=${currentPage}&limit=8`;

        const projectResponse = await callGetAPI(endpoint);

        if (projectResponse.data && projectResponse.data.projects) {
          setProjectsData(projectResponse.data.projects);
          setTotalPages(projectResponse.data.totalPages || 1);
        } else {
          console.error("No projects found in the response.");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        Swal.fire("Error!", "Failed to load projects. Please try again.", "error");
      } finally {
        Swal.close();
      }
    };

    fetchProjects();
  }, [keyword, currentPage]);


  useEffect(() => {
    // Re-fetch projects if the debounced keyword changes
    const fetchFilteredProjects = async () => {
      if (keyword) {
        setLoading(true);
        try {
          const projectResponse = await callGetAPI(`/projects?name=${keyword}&page=${currentPage}&limit=8`);

          if (projectResponse.data && projectResponse.data.projects) {
            setProjectsData(projectResponse.data.projects);
            setTotalPages(projectResponse.data.totalPages || 1);
          } else {
            console.error("No projects found in the response.");
          }
        } catch (error) {
          console.error("Error fetching projects:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFilteredProjects();
  }, [keyword, currentPage]);



  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, projectId: number) => {
    setSelectedProjectId(projectId);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = (menuActions: MenuActions) => {
    if (selectedProjectId === null) return;

    switch (menuActions) {
      case MenuActions.edit:
        navigate(`/project_detail/${selectedProjectId}/edit`);
        break;
      case MenuActions.duplicate:
        setOpenDuplicateModal(true);
        break;
      case MenuActions.delete:
        setOpenDeleteModal(true);
        break;
      default:
        console.log(`Action: ${MenuActions[menuActions]} on Project ID: ${selectedProjectId}`);
        break;
    }
    handleMenuClose();
  };

  const handleCreateNewProject = () => {
    navigate("/create-new-project");
  };

  const handleDuplicateProject = async (projectId: number) => {
    try {
      const duplicateResponse = await callPostAPI(`/projects/${projectId}/duplicate`, {});

      if (duplicateResponse.status === 201) {
        // Gọi lại API danh sách dự án để cập nhật dữ liệu mới nhất
        const updatedProjects = await callGetAPI(`/projects?page=${currentPage}&limit=8`);

        if (updatedProjects.data && updatedProjects.data.projects) {
          setProjectsData(updatedProjects.data.projects);
          setTotalPages(updatedProjects.data.totalPages || 1);
        }

        setOpenDuplicateModal(false);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Project duplicated successfully.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to duplicate the project. Please try again later.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedProjectId) return;

    try {
      await callDeleteAPI(`/projects/${selectedProjectId}`);
      setProjectsData((prevProjects) => prevProjects.filter((p) => p.id !== selectedProjectId));
      Swal.fire("Deleted!", "Project has been successfully deleted.", "success");
    } catch (error) {
      Swal.fire("Error!", "Failed to delete the project, please try again.", "error");
    } finally {
      setOpenDeleteModal(false);
      setSelectedProjectId(null);
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
    setSelectedProjectId(null);
  };

  return (
    <div className="p-5 max-w-full mx-auto pl-16 sm:pl-0 md:pl-0 lg:pl-0">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5" component="h2" className="font-bold">
          List Project
        </Typography>

        <button
          className="
          bg-blue-500
          text-white
          px-4 py-2
          rounded-lg
          hover:bg-blue-600
          transition sm:px-3
          sm:py-1
          sm:text-sm
          "
          onClick={handleCreateNewProject}
        >

          + CREATE NEW PROJECT
        </button>
      </div>

      {loading ? null : (
        <>
          {projectsData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {projectsData.map((project: any) => (
                <div key={project.id} className="relative">
                  <Link to={`/projects/${project.alias}`}>
                    <div>
                      <LazyLoadImage
                        src={project.thumbnail}
                        alt={project.name}
                        className="w-full h-60 object-cover rounded-lg"
                      />
                      <Typography variant="h6" className="text-lg font-semibold mb-2">
                        {project.name}
                      </Typography>
                      <Typography variant="body2" className="text-sm text-gray-500">
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </Typography>
                    </div>
                  </Link>

                  <button
                    onClick={(e) => handleMenuOpen(e, project.id)}
                    className="absolute bottom-2 right-2"
                  >
                    <MoreVertIcon className="text-gray-600 hover:text-gray-800" />
                  </button>
                </div>
              ))}
            </div>
          ) : !loading && (
            <p>No projects found.</p>
          )}
        </>
      )}


      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            variant="outlined"
            shape="rounded"
            onChange={(_event, value) => setCurrentPage(value)}
          />
        </Stack>
      </div>

      <ContextMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        onAction={handleMenuAction}
      />

      {openDuplicateModal && selectedProjectId !== null && (
        <DuplicateProjectModal
          projectId={selectedProjectId}
          onClose={() => setOpenDuplicateModal(false)}
          onDuplicate={handleDuplicateProject}
        />
      )}

      {openDeleteModal && (
        <DeleteProjectModal
          projectId={selectedProjectId}
          onConfirmDelete={handleDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};
