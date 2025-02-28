import React from "react";
import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";

export const ProjectActions: React.FC = () => {

  return (
    <Stack spacing={2}>
      <Link to="/edit"><Button variant="contained" >Chỉnh sửa</Button></Link>
      <Link to="/publish"><Button variant="contained">Xuất bản</Button></Link>
      <Link to="/move"><Button variant="contained">Di chuyển</Button></Link>
      <Link to="/settings"><Button variant="contained">Cài đặt</Button></Link>
      <Link to="/delete"><Button variant="contained">Xóa</Button></Link>
    </Stack>
  );
};
