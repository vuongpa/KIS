import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  IconButton,
  Divider,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<Props> = ({ open, onClose }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText("https://ranoar.app/233rgq3g-q24gqwdvq-q2eg");
    alert("Link copied to clipboard!");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle
        sx={{
          textAlign: "left",
          fontSize: "20px",
          backgroundColor: "#121212", // Black background for the title
          color: "white", // White text color
        }}
      >
        Share Project
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "#121212", // Black background for the content
          color: "white", // White text color
          minHeight: "300px", // Optional: To ensure consistent height
        }}
      >
        <Divider
          sx={{
            width: "100%", // Ensure it spans the entire width
            backgroundColor: "#4F4F4F", // Custom background color
            height: "2px", // Set thickness of the divider
            marginY: 2, // Vertical spacing
          }}
        />
        {/* Link Sharing Section */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="subtitle2" sx={{ marginBottom: 1, color: "white" }}>
            Share link
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              fullWidth
              value="https://ranoar.app/233rgq3g-q24gqwdvq-q2eg"
              InputProps={{
                readOnly: true,
                sx: {
                  color: "white", // White text color
                  borderRadius: "2px", // Border-radius
                  border: "1px solid var(--Gray-3, #828282)", // Custom border
                  backgroundColor: "transparent", // Optional: transparent background
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none", // Remove default MUI border
                  },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "2px", // Add border-radius for the container
                  border: "1px solid var(--Gray-3, #828282)", // Custom border
                },
                "& .MuiOutlinedInput-input": {
                  color: "white", // White text for input
                },
              }}
            />
            <IconButton
              onClick={copyToClipboard}
              sx={{
                marginLeft: 1,
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#1565c0" },
                color: "white",
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>
        </Box>


        {/* Add People Section */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="subtitle2" sx={{ marginBottom: 1, color: "white" }}>
            Add people (email)
          </Typography>
          <TextField
            fullWidth
            placeholder="geisa@gmail.com"
            variant="outlined" // Use outlined variant for proper border handling
            InputProps={{
              sx: {
                color: "white", // White text color
                backgroundColor: "transparent", // Ensure transparent background
                borderRadius: "2px", // Add border-radius
                border: "1px solid var(--Gray-3, #828282)", // Add custom border
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none", // Remove the default MUI border
                },
              },
            }}
          />
        </Box>


        {/* Access Control Section */}
        <Box
          sx={{
            display: "flex", // Align in a row
            alignItems: "center", // Vertically center the items
            justifyContent: "space-between", // Space between label and dropdown
            marginBottom: 3,
          }}
        >
          <Typography variant="subtitle2" sx={{ color: "white" }}>
            Access
          </Typography>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              defaultValue="Editor"
              size="small"
              sx={{
                color: "white",
                "& .MuiSvgIcon-root": { color: "white" },
              }}
            >
              <MenuItem value="Owner">Owner</MenuItem>
              <MenuItem value="Editor">Editor</MenuItem>
              <MenuItem value="Viewer">Viewer</MenuItem>
            </Select>
          </FormControl>
        </Box>


        {/* Password Protection */}
        <Box
          sx={{
            display: "flex", // Align items in a row
            justifyContent: "space-between", // Space between the text and the checkbox
            alignItems: "center", // Center vertically
            marginBottom: 3, // Add spacing below
          }}
        >
          {/* Password Label */}
          <Typography sx={{ color: "white" }}>Password</Typography>

          {/* Checkbox with Yes */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox sx={{ color: "white", padding: "0 8px 0 0" }} />
            <Typography sx={{ color: "white" }}>Yes</Typography>
          </Box>
        </Box>

        {/* Divider */}
        <Divider
          sx={{
            width: "100%", // Ensure it spans the entire width
            backgroundColor: "#4F4F4F", // Custom background color
            height: "2px", // Set thickness of the divider
            marginY: 2, // Vertical spacing
          }}
        />

        {/* Project Settings */}
        <Box
          sx={{
            display: "flex", // Align items in a row
            justifyContent: "space-between", // Space between the title and description
            alignItems: "center", // Center items vertically
            marginBottom: 2, // Add spacing below
          }}
        >
          {/* Project Setting Title */}
          <Typography variant="subtitle2" sx={{ color: "white", fontWeight: "bold" }}>
            Project Setting
          </Typography>

          {/* Only People Invited Description */}
          <Typography sx={{ color: "white", fontSize: "14px" }}>
            Only People Invited Can Access
          </Typography>
        </Box>

        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 1,
            }}
          >
            <Typography sx={{ color: "white" }}>Nasrulloh</Typography>
            <Select
              defaultValue="Owner"
              size="small"
              sx={{
                color: "white",
                "& .MuiSvgIcon-root": { color: "white" },
              }}
            >
              <MenuItem value="Owner">Owner</MenuItem>
              <MenuItem value="Editor">Editor</MenuItem>
              <MenuItem value="Viewer">Viewer</MenuItem>
            </Select>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 1,
            }}
          >
            <Typography sx={{ color: "white" }}>Andy Mas</Typography>
            <Select
              defaultValue="Editor"
              size="small"
              sx={{
                color: "white",
                "& .MuiSvgIcon-root": { color: "white" },
              }}
            >
              <MenuItem value="Owner">Owner</MenuItem>
              <MenuItem value="Editor">Editor</MenuItem>
              <MenuItem value="Viewer">Viewer</MenuItem>
            </Select>
          </Box>
        </Box>

        {/* Footer Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: 3,
            padding: "16px", // Add padding for spacing inside the footer
            backgroundColor: "#1c1c1c", // Light black background color
            borderRadius: "8px", // Optional: Add rounded corners
          }}
        >
          <Button onClick={onClose} sx={{ color: "white" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              marginLeft: 1,
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            Share
          </Button>
        </Box>


      </DialogContent>
    </Dialog>
  );
};

