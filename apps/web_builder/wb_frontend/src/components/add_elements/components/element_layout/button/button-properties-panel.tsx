import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  TextField,
  Select,
  MenuItem,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ButtonPropertiesDefaults } from "./button-properties";

interface ButtonPropertiesProps {
  properties: ButtonPropertiesDefaults;
  onPropertyChange: (newProperties: Partial<ButtonPropertiesDefaults>) => void;
  size?: "small";
}

export const ButtonProperties: React.FC<ButtonPropertiesProps> = ({ properties, onPropertyChange, size = "small" }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleChange = <K extends keyof ButtonPropertiesDefaults>(
    key: K,
    value: ButtonPropertiesDefaults[K]
  ) => {
    onPropertyChange({ [key]: value });
  };

  const sections = [
    { id: "typography", label: "Typography", details: ["fontFamily", "fontWeight", "fontSize", "lineHeight", "color", "textAlign", "textDecoration"] },
    { id: "backgrounds", label: "Backgrounds", details: ["backgroundColor"] },
    { id: "borders", label: "Borders", details: ["borderRadius", "borderStyle", "borderWidth", "borderColor"] },
  ];

  return (
    <Paper elevation={1} sx={{ p: 1, bgcolor: "#111827", color: "white", maxHeight: "calc(100vh - 150px)", overflowY: "auto" }}>
      <Typography variant="subtitle2" gutterBottom sx={{ borderBottom: "1px solid #424242", pb: 0.5, fontSize: "12px" }}>
        Button Properties
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
                {section.details.includes("fontFamily") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Font</Typography>
                    <Select
                      value={properties.fontFamily}
                      onChange={(e) => handleChange("fontFamily", e.target.value as string)}
                      variant="standard"
                      size={size}
                      sx={{
                        "& .MuiSelect-select": { color: "white", fontSize: "10px" },
                        "& .MuiSelect-icon": { color: "white", fontSize: "14px" },
                        "& .MuiInput-underline:before": { borderBottomColor: "white" },
                        "& .MuiInput-underline:after": { borderBottomColor: "white" },
                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "white" },
                        height: "24px",
                      }}
                    >
                      <MenuItem value="Arial, sans-serif" sx={{ fontSize: "10px", py: 0.25, px: 0.5 }}>Arial</MenuItem>
                      <MenuItem value="Helvetica, sans-serif" sx={{ fontSize: "10px", py: 0.25, px: 0.5 }}>Helvetica</MenuItem>
                      <MenuItem value="Times New Roman, serif" sx={{ fontSize: "10px", py: 0.25, px: 0.5 }}>Times New Roman</MenuItem>
                    </Select>
                  </Box>
                )}
                {section.details.includes("fontWeight") && (
                  <Box>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px", mb: 0.25 }}>Weight</Typography>
                    <RadioGroup
                      row
                      value={properties.fontWeight || "400"}
                      onChange={(e) => handleChange("fontWeight", e.target.value as "100" | "400" | "700")}
                      sx={{ color: "white" }}
                    >
                      <FormControlLabel value="100" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Thin</Typography>} />
                      <FormControlLabel value="400" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Normal</Typography>} />
                      <FormControlLabel value="700" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Bold</Typography>} />
                    </RadioGroup>
                  </Box>
                )}
                {section.details.includes("fontSize") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Size</Typography>
                    <TextField
                      id="font-size"
                      label=""
                      type="number"
                      value={parseInt(String(properties.fontSize).replace("px", ""), 10)}
                      onChange={(e) => handleChange("fontSize", `${e.target.value}px`)}
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
                      }}
                    />
                  </Box>
                )}
                {section.details.includes("lineHeight") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Height</Typography>
                    <TextField
                      id="line-height"
                      label=""
                      type="number"
                      value={parseInt(String(properties.lineHeight).replace("px", ""), 10)}
                      onChange={(e) => handleChange("lineHeight", `${e.target.value}px`)}
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
                      }}
                    />
                  </Box>
                )}
                {section.details.includes("color") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Color</Typography>
                    <TextField
                      id="text-color"
                      label=""
                      type="text"
                      value={properties.color || "#333"}
                      onChange={(e) => handleChange("color", e.target.value)}
                      variant="standard"
                      size={size}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <input
                              type="color"
                              value={properties.color || "#333"}
                              onChange={(e) => handleChange("color", e.target.value)}
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
                      }}
                    />
                  </Box>
                )}
                {section.details.includes("textAlign") && (
                  <Box>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px", mb: 0.25 }}>Align</Typography>
                    <RadioGroup
                      row
                      value={properties.textAlign || "center"}
                      onChange={(e) => handleChange("textAlign", e.target.value as "left" | "center" | "right")}
                      sx={{ color: "white" }}
                    >
                      <FormControlLabel value="left" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Left</Typography>} />
                      <FormControlLabel value="center" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Center</Typography>} />
                      <FormControlLabel value="right" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Right</Typography>} />
                    </RadioGroup>
                  </Box>
                )}
                {section.details.includes("textDecoration") && (
                  <Box>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px", mb: 0.25 }}>Decor</Typography>
                    <RadioGroup
                      row
                      value={properties.textDecoration || "none"}
                      onChange={(e) => handleChange("textDecoration", e.target.value as "none" | "underline" | "overline" | "line-through")}
                      sx={{ color: "white" }}
                    >
                      <FormControlLabel value="none" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>None</Typography>} />
                      <FormControlLabel value="underline" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Underline</Typography>} />
                      <FormControlLabel value="overline" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Overline</Typography>} />
                      <FormControlLabel value="line-through" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Line-through</Typography>} />
                    </RadioGroup>
                  </Box>
                )}
                {section.details.includes("backgroundColor") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Background</Typography>
                    <TextField
                      id="background-color"
                      label=""
                      type="text"
                      value={properties.backgroundColor || "#3898ec"}
                      onChange={(e) => handleChange("backgroundColor", e.target.value)}
                      variant="standard"
                      size={size}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <input
                              type="color"
                              value={properties.backgroundColor || "#3898ec"}
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
                      }}
                    />
                  </Box>
                )}
                {section.details.includes("borderRadius") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Radius</Typography>
                    <TextField
                      id="border-radius"
                      label=""
                      type="number"
                      value={parseInt(String(properties.borderRadius).replace("px", ""), 10) || 0}
                      onChange={(e) => handleChange("borderRadius", `${e.target.value}px`)}
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
                      }}
                    />
                  </Box>
                )}
                {section.details.includes("borderStyle") && (
                  <Box>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px", mb: 0.25 }}>Style</Typography>
                    <RadioGroup
                      row
                      value={properties.borderStyle || "solid"}
                      onChange={(e) => handleChange("borderStyle", e.target.value as "none" | "solid" | "dashed" | "dotted")}
                      sx={{ color: "white" }}
                    >
                      <FormControlLabel value="none" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>None</Typography>} />
                      <FormControlLabel value="solid" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Solid</Typography>} />
                      <FormControlLabel value="dashed" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Dashed</Typography>} />
                      <FormControlLabel value="dotted" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Dotted</Typography>} />
                    </RadioGroup>
                  </Box>
                )}
                {section.details.includes("borderWidth") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Width</Typography>
                    <TextField
                      id="border-width"
                      label=""
                      type="number"
                      value={parseInt(String(properties.borderWidth).replace("px", ""), 10) || 0}
                      onChange={(e) => handleChange("borderWidth", `${e.target.value}px`)}
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
                      }}
                    />
                  </Box>
                )}
                {section.details.includes("borderColor") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Color</Typography>
                    <TextField
                      id="border-color"
                      label=""
                      type="text"
                      value={properties.borderColor || "black"}
                      onChange={(e) => handleChange("borderColor", e.target.value)}
                      variant="standard"
                      size={size}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <input
                              type="color"
                              value={properties.borderColor || "black"}
                              onChange={(e) => handleChange("borderColor", e.target.value)}
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