import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  TextField,
  Slider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DefaultContainerProperties } from "./container-properties";

interface ContainerPropertiesProps {
  properties: DefaultContainerProperties;
  onPropertyChange: (newProperties: Partial<DefaultContainerProperties>) => void;
  size?: "small";
}

export const ContainerProperties: React.FC<ContainerPropertiesProps> = ({ properties, onPropertyChange, size = "small" }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleChange = (key: keyof DefaultContainerProperties, value: any) => {
    onPropertyChange({ [key]: value });
  };

  const sections = [
    { id: "dimensions", label: "Dimensions", details: ["width", "height", "maxWidth", "maxHeight", "minWidth", "minHeight"] },
    { id: "colors", label: "Colors", details: ["backgroundColor", "textColor", "opacity"] },
    { id: "margin", label: "Margin", details: ["marginTop", "marginRight", "marginBottom", "marginLeft"] },
    { id: "padding", label: "Padding", details: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"] },
    { id: "decoration", label: "Decoration", details: ["borderColor", "borderWidth", "borderRadius", "borderStyle", "boxShadow"] },
    { id: "overflow", label: "Overflow", details: ["overflow"] },
  ];

  return (
    <Paper elevation={1} sx={{ p: 1, bgcolor: "#111827", color: "white", maxHeight: "calc(100vh - 150px)", overflowY: "auto" }}>
      <Typography variant="subtitle2" gutterBottom sx={{ borderBottom: "1px solid #424242", pb: 0.5, fontSize: "12px" }}>
        Container Properties
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
                {/* Dimensions */}
                {section.details.includes("width") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Width</Typography>
                    <TextField
                      type="number"
                      value={parseInt(properties.width || "0", 10)}
                      onChange={(e) => handleChange("width", `${e.target.value}px`)}
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
                {section.details.includes("height") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Height</Typography>
                    <TextField
                      type="number"
                      value={parseInt(properties.height || "0", 10)}
                      onChange={(e) => handleChange("height", `${e.target.value}px`)}
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

                {section.details.includes("backgroundColor") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Background</Typography>
                    <TextField
                      value={properties.backgroundColor || "#ffffff"}
                      onChange={(e) => handleChange("backgroundColor", e.target.value)}
                      variant="standard"
                      size={size}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <input
                              type="color"
                              value={properties.backgroundColor || "#ffffff"}
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
                {section.details.includes("textColor") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Text Color</Typography>
                    <TextField
                      value={properties.textColor || "#000000"}
                      onChange={(e) => handleChange("textColor", e.target.value)}
                      variant="standard"
                      size={size}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <input
                              type="color"
                              value={properties.textColor || "#000000"}
                              onChange={(e) => handleChange("textColor", e.target.value)}
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
                {section.details.includes("opacity") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Opacity</Typography>
                    <Slider
                      value={properties.opacity || 1}
                      onChange={(_, value) => handleChange("opacity", value as number)}
                      min={0}
                      max={1}
                      step={0.01}
                      valueLabelDisplay="auto"
                      size={size}
                      sx={{
                        color: "white",
                        "& .MuiSlider-thumb": { bgcolor: "white", width: 12, height: 12 },
                        "& .MuiSlider-track": { bgcolor: "white", height: 4 },
                        "& .MuiSlider-rail": { bgcolor: "#4a5568", height: 4 }, // gray-700
                        "& .MuiSlider-valueLabel": { fontSize: "10px" },
                        width: 150,
                      }}
                    />
                  </Box>
                )}

                {/* Margin */}
                {section.details.includes("marginTop") && (
                  <Box>
                    <Typography variant="caption" sx={{ color: "white", fontSize: "10px", mb: 0.25 }}>Margin</Typography>
                    <Box sx={{ display: "flex", gap: 0.5, mt: 0.25 }}>
                      {["Top", "Right", "Bottom", "Left"].map((pos) => {
                        const key = `margin${pos}` as keyof DefaultContainerProperties;
                        return (
                          <Box key={pos} sx={{ width: "25%" }}>
                            <Typography variant="caption" sx={{ fontSize: "10px", color: "white" }}>{pos}</Typography>
                            <Slider
                              value={parseInt(String(properties[key] || "0px").replace("px", ""), 10) || 0}
                              onChange={(_, value) => handleChange(key, `${value}px`)}
                              min={0}
                              max={100}
                              valueLabelDisplay="auto"
                              size={size}
                              sx={{
                                color: "white",
                                "& .MuiSlider-thumb": { bgcolor: "white", width: 12, height: 12 },
                                "& .MuiSlider-track": { bgcolor: "white", height: 4 },
                                "& .MuiSlider-rail": { bgcolor: "#4a5568", height: 4 }, // gray-700
                                "& .MuiSlider-valueLabel": { fontSize: "10px" },
                              }}
                            />
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                )}

                {/* Padding */}
                {section.details.includes("paddingTop") && (
                  <Box>
                    <Typography variant="caption" sx={{ color: "white", fontSize: "10px", mb: 0.25 }}>Padding</Typography>
                    <Box sx={{ display: "flex", gap: 0.5, mt: 0.25 }}>
                      {["Top", "Right", "Bottom", "Left"].map((pos) => {
                        const key = `padding${pos}` as keyof DefaultContainerProperties;
                        return (
                          <Box key={pos} sx={{ width: "25%" }}>
                            <Typography variant="caption" sx={{ fontSize: "10px", color: "white" }}>{pos}</Typography>
                            <Slider
                              value={parseInt(String(properties[key] || "0px").replace("px", ""), 10) || 0}
                              onChange={(_, value) => handleChange(key, `${value}px`)}
                              min={0}
                              max={100}
                              valueLabelDisplay="auto"
                              size={size}
                              sx={{
                                color: "white",
                                "& .MuiSlider-thumb": { bgcolor: "white", width: 12, height: 12 },
                                "& .MuiSlider-track": { bgcolor: "white", height: 4 },
                                "& .MuiSlider-rail": { bgcolor: "#4a5568", height: 4 }, // gray-700
                                "& .MuiSlider-valueLabel": { fontSize: "10px" },
                              }}
                            />
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                )}

                {/* Decoration */}
                {section.details.includes("borderColor") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Border Color</Typography>
                    <TextField
                      value={properties.borderColor || "#000000"}
                      onChange={(e) => handleChange("borderColor", e.target.value)}
                      variant="standard"
                      size={size}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <input
                              type="color"
                              value={properties.borderColor || "#000000"}
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
                {section.details.includes("borderWidth") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Border Width</Typography>
                    <TextField
                      type="number"
                      value={parseInt(properties.borderWidth || "0", 10)}
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
                {section.details.includes("borderRadius") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Border Radius</Typography>
                    <TextField
                      type="number"
                      value={parseInt(properties.borderRadius || "0", 10)}
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
                    <Typography variant="caption" sx={{ color: "white", fontSize: "10px", mb: 0.25 }}>Border Style</Typography>
                    <RadioGroup
                      row
                      value={properties.borderStyle || "solid"}
                      onChange={(e) => handleChange("borderStyle", e.target.value)}
                      sx={{ color: "white" }}
                    >
                      <FormControlLabel value="solid" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Solid</Typography>} />
                      <FormControlLabel value="dashed" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Dashed</Typography>} />
                      <FormControlLabel value="dotted" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Dotted</Typography>} />
                      <FormControlLabel value="none" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>None</Typography>} />
                    </RadioGroup>
                  </Box>
                )}
                {section.details.includes("boxShadow") && (
                  <Box display="flex" flexDirection="column" gap={0.5}>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Box Shadow</Typography>
                      <TextField
                        value={properties.boxShadow || ""}
                        onChange={(e) => handleChange("boxShadow", e.target.value)}
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
                  </Box>
                )}

                {section.details.includes("overflow") && (
                  <Box>
                    <Typography variant="caption" sx={{ color: "white", fontSize: "10px", mb: 0.25 }}>Overflow</Typography>
                    <RadioGroup
                      row
                      value={properties.overflow || "visible"}
                      onChange={(e) => handleChange("overflow", e.target.value)}
                      sx={{ color: "white" }}
                    >
                      <FormControlLabel value="visible" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Visible</Typography>} />
                      <FormControlLabel value="hidden" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Hidden</Typography>} />
                      <FormControlLabel value="scroll" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Scroll</Typography>} />
                      <FormControlLabel value="auto" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Auto</Typography>} />
                    </RadioGroup>
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