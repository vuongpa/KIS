import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Select, MenuItem, Button, Typography } from "@mui/material";

export const MoveProject: React.FC = () => {
  const navigate = useNavigate();
  const [folder, setFolder] = useState<string>("");

  return (
    <Container>
      <Typography variant="h4">Di chuyển vào thư mục</Typography>
      <Select fullWidth value={folder} onChange={(e) => setFolder(e.target.value)}>
        <MenuItem value="Folder1">Thư mục 1</MenuItem>
        <MenuItem value="Folder2">Thư mục 2</MenuItem>
        <MenuItem value="Folder3">Thư mục 3</MenuItem>
      </Select>
      <Button onClick={() => navigate(-1)}>Hủy</Button>
      <Button variant="contained" onClick={() => navigate(-1)}>Di chuyển</Button>
    </Container>
  );
};
