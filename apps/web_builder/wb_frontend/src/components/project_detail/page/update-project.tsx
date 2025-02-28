import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { callGetAPI, callPutAPI } from "../../../api_utils";

export const EditProject: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState<string>("");
  const [projectAlias, setProjectAlias] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");

  useEffect(() => {
    if (!projectId) {
      toast.error("Không có ID dự án.");
      navigate("/projects");
      return;
    }

    const fetchProjectData = async () => {
      try {
        const response = await callGetAPI(`/project-detail/${projectId}`);

        if (!response.data) {
          throw new Error("Dữ liệu không tồn tại.");
        }

        const { name, alias, description, thumbnail } = response.data.project || {};
        setProjectName(name || "");
        setProjectAlias(alias || "");
        setProjectDescription(description || "");
        setThumbnail(thumbnail || "");
      } catch (error) {
        console.error("Error fetching project data:", error);
        toast.error("Không thể tải thông tin dự án.");
        navigate("/projects");
      }
    };

    fetchProjectData();
  }, [projectId, navigate]);

  const mutation = useMutation({
    mutationFn: async (
      updatedProject: 
      { 
        name: string,
        alias: string,
        description: string,
        thumbnail: string 
      }) => {
      const response = await callPutAPI(
        `/project-detail/${projectId}`,
        updatedProject,
      );
      return response.data.project;
    },
    onSuccess: () => {
      toast.success("Dự án đã được cập nhật thành công!");
      navigate("/projects");
    },
    onError: (error: any) => {
      console.error("Error saving project:", error.response || error.message);
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Có lỗi xảy ra khi lưu dự án. Vui lòng thử lại.");
      }
    },
  });

  const handleSave = () => {
    if (!projectId) {
      toast.error("Không có ID dự án. Không thể lưu.");
      return;
    }

    const updatedProject = {
      name: projectName,
      alias: projectAlias,
      description: projectDescription,
      thumbnail: thumbnail,
    };

    mutation.mutate(updatedProject);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>Chỉnh sửa dự án</Typography>

      <TextField
        label="Tên dự án"
        fullWidth
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        sx={{ my: 2 }}
      />

      <TextField
        label="Alias"
        fullWidth
        value={projectAlias}
        onChange={(e) => setProjectAlias(e.target.value)}
        sx={{ my: 2 }}
      />

      <TextField
        label="Mô tả"
        fullWidth
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
        sx={{ my: 2 }}
        multiline
        rows={4}
      />

      <TextField
        label="Thumbnail URL"
        fullWidth
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
        sx={{ my: 2 }}
      />

      {thumbnail && (
        <Box sx={{ my: 2 }}>
          <img 
            src={thumbnail} 
            alt="Thumbnail"
            style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover' }}
          />
        </Box>
      )}

      <Button onClick={() => navigate(-1)} sx={{ my: 2 }}>
        Hủy
      </Button>

      <Button variant="contained" onClick={handleSave} sx={{ my: 2 }}>
        Lưu
      </Button>
    </Container>
  );
};
