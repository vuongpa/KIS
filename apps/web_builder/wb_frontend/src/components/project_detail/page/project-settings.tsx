import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@mui/material";

export const ProjectSettings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4">Cài đặt dự án</Typography>
      <TextField label="Mô tả" fullWidth multiline rows={3} />
      <Button onClick={() => navigate(-1)}>Hủy</Button>
      <Button variant="contained" onClick={() => navigate(-1)}>Lưu</Button>
    </Container>
  );
};
