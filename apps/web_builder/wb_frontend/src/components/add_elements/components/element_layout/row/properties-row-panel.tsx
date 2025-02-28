// properties-row-panel.tsx
import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  TextField,
  Paper,
  Typography,
  Select,
  MenuItem,
  Slider,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { RowPropertiesDefaults } from "./row-properties";

interface RowPropertiesProps {
  properties: RowPropertiesDefaults;
  onPropertyChange: (newProperties: Partial<RowPropertiesDefaults>) => void;
}

export const RowProperties: React.FC<RowPropertiesProps> = ({ properties, onPropertyChange }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>("layout");

  const handleChange = <K extends keyof RowPropertiesDefaults>(
    key: K,
    value: RowPropertiesDefaults[K]
  ) => {
    onPropertyChange({ [key]: value });
  };

  const sections = [
    { id: "layout", label: "Layout", details: ["width", "align", "justify", "gap"] },
    { id: "spacing", label: "Spacing", details: ["padding", "margin"] },
    { id: "appearance", label: "Appearance", details: ["backgroundColor", "border"] },
  ];


  const alignOptions = ["stretch", "flex-start", "flex-end", "center", "baseline"];
  const justifyOptions = ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"];

  const getNumericValue = (value: string | undefined, defaultValue: string = "0px"): number => {
    if (!value) return 0;
    const numeric = parseInt(value.replace("px", "") || defaultValue.replace("px", ""), 10);
    return isNaN(numeric) ? 0 : numeric;
  };

  return (
    <Paper elevation={2} sx={{ p: 1, bgcolor: "#111827", color: "white", maxHeight: "calc(300vh - 200px)", overflowY: "auto" }}>
      <Typography variant="h6" gutterBottom sx={{ borderBottom: "1px solid #424242", pb: 1 }}>
        Row Properties
      </Typography>
      <Box sx={{ mt: 2 }}>
        {sections.map((section) => (
          <Accordion
            key={section.id}
            expanded={expandedSection === section.id}
            onChange={(_, expanded) => setExpandedSection(expanded ? section.id : null)}
            sx={{ bgcolor: "#111827", color: "white", mb: 1 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}>
              <Typography>{section.label}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: "#1f2937", color: "white" }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {section.details.includes("width") && (
                  <Box display="flex" alignItems="center" gap={2}>
                    <Typography sx={{ minWidth: 100, color: "white" }}>Width</Typography>
                    <Select
                      value={properties.width || "100%"} // Mặc định "100%" nếu undefined
                      onChange={(e) => handleChange("width", e.target.value as string)}
                      variant="standard"
                      sx={{
                        "& .MuiSelect-select": { color: "white" },
                        "& .MuiInputLabel-root": { color: "white" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                        "& .MuiSvgIcon-root": { color: "white" },
                      }}
                    >
                      <MenuItem value="100%">100%</MenuItem>
                      <MenuItem value="50%">50%</MenuItem>
                      <MenuItem value="auto">Auto</MenuItem>
                    </Select>
                  </Box>
                )}
                {section.details.includes("align") && (
                  <Box display="flex" alignItems="center" gap={2}>
                    <Typography sx={{ minWidth: 100, color: "white" }}>Align</Typography>
                    <Select
                      value={properties.align || "stretch"} // Mặc định "stretch" nếu undefined
                      onChange={(e) => handleChange("align", e.target.value as string)}
                      variant="standard"
                      sx={{
                        "& .MuiSelect-select": { color: "white" },
                        "& .MuiInputLabel-root": { color: "white" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                        "& .MuiSvgIcon-root": { color: "white" },
                      }}
                    >
                      {alignOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                )}
                {section.details.includes("justify") && (
                  <Box display="flex" alignItems="center" gap={2}>
                    <Typography sx={{ minWidth: 100, color: "white" }}>Justify</Typography>
                    <Select
                      value={properties.justify || "flex-start"} // Mặc định "flex-start" nếu undefined
                      onChange={(e) => handleChange("justify", e.target.value as string)}
                      variant="standard"
                      sx={{
                        "& .MuiSelect-select": { color: "white" },
                        "& .MuiInputLabel-root": { color: "white" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                        "& .MuiSvgIcon-root": { color: "white" },
                      }}
                    >
                      {justifyOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                )}
                {section.details.includes("gap") && (
                  <Box display="flex" alignItems="center" gap={2}>
                    <Typography sx={{ minWidth: 100, color: "white" }}>Gap</Typography>
                    <Slider
                      value={getNumericValue(properties.gap)} // Sử dụng hàm xử lý giá trị
                      onChange={(_, value) => handleChange("gap", `${value}px`)}
                      min={0}
                      max={50}
                      step={1}
                      valueLabelDisplay="auto"
                      sx={{
                        color: "white",
                        "& .MuiSlider-thumb": { bgcolor: "white" },
                        "& .MuiSlider-track": { bgcolor: "white" },
                        "& .MuiSlider-rail": { bgcolor: "#4a5568" }, // gray-700
                      }}
                    />
                  </Box>
                )}
                {section.details.includes("padding") && (
                  <Box display="flex" alignItems="center" gap={2}>
                    <Typography sx={{ minWidth: 100, color: "white" }}>Padding</Typography>
                    <Slider
                      value={getNumericValue(properties.padding)} // Sử dụng hàm xử lý giá trị
                      onChange={(_, value) => handleChange("padding", `${value}px`)}
                      min={0}
                      max={50}
                      step={1}
                      valueLabelDisplay="auto"
                      sx={{
                        color: "white",
                        "& .MuiSlider-thumb": { bgcolor: "white" },
                        "& .MuiSlider-track": { bgcolor: "white" },
                        "& .MuiSlider-rail": { bgcolor: "#4a5568" }, // gray-700
                      }}
                    />
                  </Box>
                )}
                {section.details.includes("margin") && (
                  <Box display="flex" alignItems="center" gap={2}>
                    <Typography sx={{ minWidth: 100, color: "white" }}>Margin</Typography>
                    <Slider
                      value={getNumericValue(properties.margin)} // Sử dụng hàm xử lý giá trị
                      onChange={(_, value) => handleChange("margin", `${value}px`)}
                      min={0}
                      max={50}
                      step={1}
                      valueLabelDisplay="auto"
                      sx={{
                        color: "white",
                        "& .MuiSlider-thumb": { bgcolor: "white" },
                        "& .MuiSlider-track": { bgcolor: "white" },
                        "& .MuiSlider-rail": { bgcolor: "#4a5568" }, // gray-700
                      }}
                    />
                  </Box>
                )}
                {section.details.includes("backgroundColor") && (
                  <Box display="flex" alignItems="center" gap={2}>
                    <Typography sx={{ minWidth: 100, color: "white" }}>Background</Typography>
                    <TextField
                      id="background-color"
                      label=""
                      type="text"
                      value={properties.backgroundColor || "#ffffff"} // Mặc định "#ffffff" nếu undefined
                      onChange={(e) => handleChange("backgroundColor", e.target.value)}
                      variant="standard"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <input
                              type="color"
                              value={properties.backgroundColor || "#ffffff"}
                              onChange={(e) => handleChange("backgroundColor", e.target.value)}
                              style={{ width: "24px", height: "24px", border: "none", background: "none", cursor: "pointer" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiInputBase-input": { color: "white" },
                        "& .MuiInputLabel-root": { color: "white" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                        "& .MuiInput-underline:before": { borderBottomColor: "white" },
                        "& .MuiInput-underline:after": { borderBottomColor: "white" },
                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "white" },
                      }}
                    />
                  </Box>
                )}
                {section.details.includes("border") && (
                  <Box display="flex" alignItems="center" gap={2}>
                    <Typography sx={{ minWidth: 100, color: "white" }}>Border</Typography>
                    <TextField
                      id="border"
                      label=""
                      type="text"
                      value={properties.border || "1px solid #ccc"} // Mặc định "1px solid #ccc" nếu undefined
                      onChange={(e) => handleChange("border", e.target.value)}
                      variant="standard"
                      sx={{
                        "& .MuiInputBase-input": { color: "white" },
                        "& .MuiInputLabel-root": { color: "white" },
                        "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                        "& .MuiInput-underline:before": { borderBottomColor: "white" },
                        "& .MuiInput-underline:after": { borderBottomColor: "white" },
                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "white" },
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