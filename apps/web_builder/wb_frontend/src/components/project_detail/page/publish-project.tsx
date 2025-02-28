import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Typography } from "@mui/material";

export const PublishProject: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4">Xuất bản dự án</Typography>
      <Typography>Bạn có chắc muốn xuất bản dự án này không?</Typography>
      <Button onClick={() => navigate(-1)}>Hủy</Button>
      <Button variant="contained" color="primary" onClick={() => navigate(-1)}>Xuất bản</Button>
    </Container>
  );
};
