import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { VideoPlayerPropertiesDefaults } from "./videoplayer-properties";

interface VideoPlayerPropertiesProps {
  properties: VideoPlayerPropertiesDefaults;
  onPropertyChange: (newProperties: Partial<VideoPlayerPropertiesDefaults>) => void;
  size?: "small"; 
}

export const VideoPlayerProperties: React.FC<VideoPlayerPropertiesProps> = ({ properties, onPropertyChange, size = "small" }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleChange = <K extends keyof VideoPlayerPropertiesDefaults>(
    key: K,
    value: VideoPlayerPropertiesDefaults[K]
  ) => {
    onPropertyChange({ [key]: value });
  };

  const isYouTube = properties.src.includes("youtube.com/embed") || properties.src.includes("youtu.be");

  const sections = [
    { id: "video", label: "Video", details: ["src", "width", "height", ...(isYouTube ? [] : ["controls", "autoplay", "loop", "muted"])] },
    { id: "appearance", label: "Appearance", details: ["padding", "margin", "backgroundColor", "border"] },
  ];

  return (
    <Paper elevation={1} sx={{ p: 1, bgcolor: "#111827", color: "white", maxHeight: "calc(100vh - 150px)", overflowY: "auto" }}>
      <Typography variant="subtitle2" gutterBottom sx={{ borderBottom: "1px solid #424242", pb: 0.5, fontSize: "12px" }}>
        Video Player Properties
      </Typography>
      <Box sx={{ mt: 0.5 }}>
        {sections.map((section) => (
          <Accordion
            key={section.id}
            expanded={expandedSection === section.id}
            onChange={(_, expanded) => setExpandedSection(expanded ? section.id : null)}
            sx={{ bgcolor: "#111827", color: "white", mb: 0.5 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white", fontSize: "16px" }} />}>
              <Typography variant="caption" className="text-xs">{section.label}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: "#1f2937", color: "white", p: 0.5 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                {section.details.includes("src") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Src</Typography>
                    <TextField
                      id="src"
                      label=""
                      type="text"
                      value={properties.src}
                      onChange={(e) => handleChange("src", e.target.value)}
                      variant="standard"
                      size={size}
                      sx={{
                        "& .MuiInputBase-input": { color: "white", fontSize: "10px" },
                        "& .MuiInputLabel-root": { color: "white", fontSize: "10px" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "white", fontSize: "10px" },
                        "& .MuiInput-underline:before": { borderBottomColor: "white" },
                        "& .MuiInput-underline:after": { borderBottomColor: "white" },
                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "white" },
                        height: "24px",
                        width: "180px",
                      }}
                    />
                  </Box>
                )}
                {section.details.includes("width") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Width</Typography>
                    <TextField
                      id="width"
                      label=""
                      type="text"
                      value={properties.width}
                      onChange={(e) => handleChange("width", e.target.value)}
                      variant="standard"
                      size={size}
                      sx={{
                        "& .MuiInputBase-input": { color: "white", fontSize: "10px" },
                        "& .MuiInputLabel-root": { color: "white", fontSize: "10px" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "white", fontSize: "10px" },
                        "& .MuiInput-underline:before": { borderBottomColor: "white" },
                        "& .MuiInput-underline:after": { borderBottomColor: "white" },
                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "white" },
                        height: "24px",
                        width: "120px", 
                      }}
                    />
                  </Box>
                )}
                {section.details.includes("height") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Height</Typography>
                    <TextField
                      id="height"
                      label=""
                      type="text"
                      value={properties.height}
                      onChange={(e) => handleChange("height", e.target.value)}
                      variant="standard"
                      size={size}
                      sx={{
                        "& .MuiInputBase-input": { color: "white", fontSize: "10px" },
                        "& .MuiInputLabel-root": { color: "white", fontSize: "10px" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "white", fontSize: "10px" },
                        "& .MuiInput-underline:before": { borderBottomColor: "white" },
                        "& .MuiInput-underline:after": { borderBottomColor: "white" },
                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "white" },
                        height: "24px",
                        width: "120px",
                      }}
                    />
                  </Box>
                )}
                {!isYouTube && section.details.includes("controls") && (
                  <Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={properties.controls}
                          onChange={(e) => handleChange("controls", e.target.checked)}
                          sx={{ color: "white" }}
                          size="small" 
                        />
                      }
                      label={<Typography variant="caption" sx={{ color: "white", fontSize: "10px" }}>Controls</Typography>}
                    />
                  </Box>
                )}
                {!isYouTube && section.details.includes("autoplay") && (
                  <Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={properties.autoplay}
                          onChange={(e) => handleChange("autoplay", e.target.checked)}
                          sx={{ color: "white" }}
                          size="small" 
                        />
                      }
                      label={<Typography variant="caption" sx={{ color: "white", fontSize: "10px" }}>Autoplay</Typography>}
                    />
                  </Box>
                )}
                {!isYouTube && section.details.includes("loop") && (
                  <Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={properties.loop}
                          onChange={(e) => handleChange("loop", e.target.checked)}
                          sx={{ color: "white" }}
                          size="small"
                        />
                      }
                      label={<Typography variant="caption" sx={{ color: "white", fontSize: "10px" }}>Loop</Typography>}
                    />
                  </Box>
                )}
                {!isYouTube && section.details.includes("muted") && (
                  <Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={properties.muted}
                          onChange={(e) => handleChange("muted", e.target.checked)}
                          sx={{ color: "white" }}
                          size="small" 
                        />
                      }
                      label={<Typography variant="caption" sx={{ color: "white", fontSize: "10px" }}>Muted</Typography>}
                    />
                  </Box>
                )}
                {section.details.includes("padding") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Padding</Typography>
                    <TextField
                      id="padding"
                      label=""
                      type="text"
                      value={properties.padding}
                      onChange={(e) => handleChange("padding", e.target.value)}
                      variant="standard"
                      size={size}
                      sx={{
                        "& .MuiInputBase-input": { color: "white", fontSize: "10px" },
                        "& .MuiInputLabel-root": { color: "white", fontSize: "10px" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "white", fontSize: "10px" },
                        "& .MuiInput-underline:before": { borderBottomColor: "white" },
                        "& .MuiInput-underline:after": { borderBottomColor: "white" },
                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "white" },
                        height: "24px",
                        width: "120px", 
                      }}
                    />
                  </Box>
                )}
                {section.details.includes("margin") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Margin</Typography>
                    <TextField
                      id="margin"
                      label=""
                      type="text"
                      value={properties.margin}
                      onChange={(e) => handleChange("margin", e.target.value)}
                      variant="standard"
                      size={size}
                      sx={{
                        "& .MuiInputBase-input": { color: "white", fontSize: "10px" },
                        "& .MuiInputLabel-root": { color: "white", fontSize: "10px" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "white", fontSize: "10px" },
                        "& .MuiInput-underline:before": { borderBottomColor: "white" },
                        "& .MuiInput-underline:after": { borderBottomColor: "white" },
                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "white" },
                        height: "24px",
                        width: "120px",
                      }}
                    />
                  </Box>
                )}
                {section.details.includes("backgroundColor") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Background</Typography>
                    <TextField
                      id="background-color"
                      label=""
                      type="text"
                      value={properties.backgroundColor}
                      onChange={(e) => handleChange("backgroundColor", e.target.value)}
                      variant="standard"
                      size={size}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <input
                              type="color"
                              value={properties.backgroundColor}
                              onChange={(e) => handleChange("backgroundColor", e.target.value)}
                              style={{ width: "20px", height: "20px", border: "none", background: "none", cursor: "pointer" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiInputBase-input": { color: "white", fontSize: "10px" },
                        "& .MuiInputLabel-root": { color: "white", fontSize: "10px" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "white", fontSize: "10px" },
                        "& .MuiInput-underline:before": { borderBottomColor: "white" },
                        "& .MuiInput-underline:after": { borderBottomColor: "white" },
                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "white" },
                        height: "24px",
                        width: "120px", 
                      }}
                    />
                  </Box>
                )}
                {section.details.includes("border") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Border</Typography>
                    <TextField
                      id="border"
                      label=""
                      type="text"
                      value={properties.border}
                      onChange={(e) => handleChange("border", e.target.value)}
                      variant="standard"
                      size={size}
                      sx={{
                        "& .MuiInputBase-input": { color: "white", fontSize: "10px" },
                        "& .MuiInputLabel-root": { color: "white", fontSize: "10px" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "white", fontSize: "10px" },
                        "& .MuiInput-underline:before": { borderBottomColor: "white" },
                        "& .MuiInput-underline:after": { borderBottomColor: "white" },
                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "white" },
                        height: "24px",
                        width: "120px", 
                      }}
                    />
                  </Box>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Paper>
  );
};