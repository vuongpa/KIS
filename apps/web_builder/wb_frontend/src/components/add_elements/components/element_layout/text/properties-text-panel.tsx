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
import { TextDefaultProperties } from "./text-properties";

interface TextPropertiesProps {
  properties: TextDefaultProperties;
  onPropertyChange: (newProperties: Partial<TextDefaultProperties>) => void;
}

export const TextProperties: React.FC<TextPropertiesProps> = ({ properties, onPropertyChange }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleChange = <K extends keyof TextDefaultProperties>(
    key: K,
    value: TextDefaultProperties[K]
  ) => {
    onPropertyChange({ [key]: value });
  };

  const sections = [
    { id: "typography", label: "Typography", details: ["fontSize", "fontWeight", "fontFamily", "textAlign", "lineHeight", "letterSpacing", "textDecoration", "textTransform"] },
    { id: "margin", label: "Margin", details: ["marginTopTypography", "marginRightTypography", "marginBottomTypography", "marginLeftTypography"] },
    { id: "padding", label: "Padding", details: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"] },
    { id: "appearance", label: "Appearance", details: ["backgroundColorAppearance", "textColorAppearance", "boxShadowAppearance", "textShadow", "opacity"] },
  ];

  return (
    <Paper elevation={3} sx={{  bgcolor: "#111827", color: "white", maxHeight: "calc(1  00vh - 200px)", overflowY: "auto" }}>
      <Typography variant="h6" gutterBottom sx={{ borderBottom: "1px solid #424242", pb: 1 }}>
        Text Properties
      </Typography>
      <Box sx={{ mt: 1 }}>
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
                {section.details.includes("fontSize") && (
                  <Box display="flex" alignItems="center" gap={2}>
                    <Typography sx={{ minWidth: 100 }}>Font Size</Typography>
                    <TextField
                      type="number"
                      value={parseInt(String(properties.fontSize) || "16", 10)}
                      onChange={(e) => handleChange("fontSize", `${e.target.value}px`)}
                      variant="standard"
                      sx={{
                        "& .MuiInputBase-input": { color: "white" },
                        "& .MuiInput-underline:before": { borderBottomColor: "white" },
                      }}
                    />
                  </Box>
                )}
                {section.details.includes("fontWeight") && (
                  <Box display="flex" alignItems="center" gap={2}>
                    <Typography sx={{ minWidth: 100 }}>Font Weight</Typography>
                    <RadioGroup
                      row
                      value={properties.fontWeight || "regular"}
                      onChange={(e) => handleChange("fontWeight", e.target.value as TextDefaultProperties["fontWeight"])}
                      sx={{ color: "white" }}
                    >
                      <FormControlLabel value="regular" control={<Radio sx={{ color: "white" }} />} label="Regular" />
                      <FormControlLabel value="medium" control={<Radio sx={{ color: "white" }} />} label="Medium" />
                      <FormControlLabel value="bold" control={<Radio sx={{ color: "white" }} />} label="Bold" />

                    </RadioGroup>
                  </Box>
                )}
                {section.details.includes("fontFamily") && (
                  <Box display="flex" alignItems="center" gap={2}>
                    <Typography sx={{ minWidth: 100 }}>Font Family</Typography>
                    <TextField
                      value={properties.fontFamily || "Arial, sans-serif"}
                      onChange={(e) => handleChange("fontFamily", e.target.value)}
                      variant="standard"
                      sx={{
                        "& .MuiInputBase-input": { color: "white" },
                        "& .MuiInput-underline:before": { borderBottomColor: "white" },
                      }}
                    />
                  </Box>
                )}
                {section.details.includes("textAlign") && (
                  <Box>
                    <Typography>Text Align</Typography>
                    <RadioGroup
                      row
                      value={properties.textAlign || "left"}
                      onChange={(e) => handleChange("textAlign", e.target.value as TextDefaultProperties["textAlign"])}
                    >
                      <FormControlLabel value="left" control={<Radio sx={{ color: "white" }} />} label="Left" />
                      <FormControlLabel value="center" control={<Radio sx={{ color: "white" }} />} label="Center" />
                      <FormControlLabel value="right" control={<Radio sx={{ color: "white" }} />} label="Right" />
                      <FormControlLabel value="justify" control={<Radio sx={{ color: "white" }} />} label="Justify" />
                    </RadioGroup>
                  </Box>
                )}
                {section.details.includes("lineHeight") && (
                  <Box display="flex" alignItems="center" gap={2}>
                    <Typography sx={{ minWidth: 100 }}>Line Height</Typography>
                    <TextField
                      type="number"
                      value={parseFloat(String(properties.lineHeight) || "1.5")}
                      onChange={(e) => handleChange("lineHeight", parseFloat(e.target.value) || 1.5)}
                      variant="standard"
                      sx={{
                        "& .MuiInputBase-input": { color: "white" },
                        "& .MuiInput-underline:before": { borderBottomColor: "white" },
                      }}
                    />
                  </Box>
                )}
                {section.details.includes("letterSpacing") && (
                  <Box display="flex" alignItems="center" gap={2}>
                    <Typography sx={{ minWidth: 100 }}>Letter Spacing</Typography>
                    <TextField
                      type="number"
                      value={parseInt(String(properties.letterSpacing) || "0", 10)}
                      onChange={(e) => handleChange("letterSpacing", `${e.target.value}px`)}
                      variant="standard"
                      sx={{
                        "& .MuiInputBase-input": { color: "white" },
                        "& .MuiInput-underline:before": { borderBottomColor: "white" },
                      }}
                    />
                  </Box>
                )}
                {section.details.includes("textDecoration") && (
                  <Box>
                    <Typography>Text Decoration</Typography>
                    <RadioGroup
                      row
                      value={properties.textDecoration || "none"}
                      onChange={(e) => handleChange("textDecoration", e.target.value as TextDefaultProperties["textDecoration"])}
                    >
                      <FormControlLabel value="none" control={<Radio sx={{ color: "white" }} />} label="None" />
                      <FormControlLabel value="underline" control={<Radio sx={{ color: "white" }} />} label="Underline" />
                      <FormControlLabel value="line-through" control={<Radio sx={{ color: "white" }} />} label="Line Through" />
                      <FormControlLabel value="overline" control={<Radio sx={{ color: "white" }} />} label="Overline" />
                    </RadioGroup>
                  </Box>
                )}
                {section.details.includes("textTransform") && (
                  <Box>
                    <Typography>Text Transform</Typography>
                    <RadioGroup
                      row
                      value={properties.textTransform || "none"}
                      onChange={(e) => handleChange("textTransform", e.target.value as TextDefaultProperties["textTransform"])}
                    >
                      <FormControlLabel value="none" control={<Radio sx={{ color: "white" }} />} label="None" />
                      <FormControlLabel value="uppercase" control={<Radio sx={{ color: "white" }} />} label="Uppercase" />
                      <FormControlLabel value="lowercase" control={<Radio sx={{ color: "white" }} />} label="Lowercase" />
                      <FormControlLabel value="capitalize" control={<Radio sx={{ color: "white" }} />} label="Capitalize" />
                    </RadioGroup>
                  </Box>
                )}

                {/* Margin */}
                {section.details.includes("marginTopTypography") && (
                  <Box>
                    <Typography>Margin</Typography>
                    <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                      {["Top", "Right", "Bottom", "Left"].map((pos) => {
                        const key = `margin${pos}Typography` as keyof TextDefaultProperties;
                        return (
                          <Box key={pos} sx={{ width: "25%" }}>
                            <Typography variant="caption">{pos}</Typography>
                            <Slider
                              value={parseInt(String(properties[key]).replace("px", ""), 10) || 0}
                              onChange={(_, value) => handleChange(key, `${value}px`)}
                              min={0}
                              max={100}
                              valueLabelDisplay="auto"
                              sx={{ mt: 1, color: "white" }}
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
                    <Typography>Padding</Typography>
                    <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                      {["Top", "Right", "Bottom", "Left"].map((pos) => {
                        const key = `padding${pos}` as keyof TextDefaultProperties;
                        return (
                          <Box key={pos} sx={{ width: "25%" }}>
                            <Typography variant="caption">{pos}</Typography>
                            <Slider
                              value={parseInt(String(properties[key] || "0px").replace("px", ""), 10) || 0}
                              onChange={(_, value) => handleChange(key, `${value}px`)}
                              min={0}
                              max={100}
                              valueLabelDisplay="auto"
                              sx={{ mt: 1, color: "white" }}
                            />
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                )}

                {/* Appearance */}
                {section.details.includes("backgroundColorAppearance") && (
                  <Box display="flex" alignItems="center" gap={2}>
                    <Typography sx={{ minWidth: 100 }}>Background</Typography>
                    <TextField
                      value={properties.backgroundColorAppearance || "rgba(255, 255, 255, 1)"}
                      onChange={(e) => handleChange("backgroundColorAppearance", e.target.value)}
                      variant="standard"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <input
                              type="color"
                              value={properties.backgroundColorAppearance || "#ffffff"}
                              onChange={(e) => handleChange("backgroundColorAppearance", e.target.value)}
                              style={{ width: "24px", height: "24px", border: "none", background: "none", cursor: "pointer" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiInputBase-input": { color: "white" },
                        "& .MuiInput-underline:before": { borderBottomColor: "white" },
                      }}
                    />
                  </Box>
                )}
                {section.details.includes("textColorAppearance") && (
                  <Box display="flex" alignItems="center" gap={2}>
                    <Typography sx={{ minWidth: 100 }}>Text Color</Typography>
                    <TextField
                      value={properties.textColorAppearance || "rgba(0, 0, 0, 1)"}
                      onChange={(e) => handleChange("textColorAppearance", e.target.value)}
                      variant="standard"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <input
                              type="color"
                              value={properties.textColorAppearance || "#000000"}
                              onChange={(e) => handleChange("textColorAppearance", e.target.value)}
                              style={{ width: "24px", height: "24px", border: "none", background: "none", cursor: "pointer" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiInputBase-input": { color: "white" },
                        "& .MuiInput-underline:before": { borderBottomColor: "white" },
                      }}
                    />
                  </Box>
                )}
                {section.details.includes("boxShadowAppearance") && (
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography sx={{ minWidth: 100 }}>Box Shadow</Typography>
                      <TextField
                        value={properties.boxShadowAppearance || "0px 4px 10px rgba(0,0,0,0.3)"}
                        onChange={(e) => handleChange("boxShadowAppearance", e.target.value)}
                        variant="standard"
                        sx={{
                          "& .MuiInputBase-input": { color: "white" },
                          "& .MuiInput-underline:before": { borderBottomColor: "white" },
                        }}
                      />
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography sx={{ minWidth: 100 }}>Opacity</Typography>
                      <Slider
                        value={properties.opacity || 1}
                        onChange={(_, value) => handleChange("opacity", value as number)}
                        min={0}
                        max={1}
                        step={0.01}
                        valueLabelDisplay="auto"
                        sx={{ width: 200, color: "white" }}
                      />
                    </Box>
                  </Box>
                )}
                {section.details.includes("textShadow") && (
                  <Box display="flex" alignItems="center" gap={2}>
                    <Typography sx={{ minWidth: 100 }}>Text Shadow</Typography>
                    <TextField
                      value={properties.textShadow || "0px 0px 0px rgba(0,0,0,0)"}
                      onChange={(e) => handleChange("textShadow", e.target.value)}
                      variant="standard"
                      sx={{
                        "& .MuiInputBase-input": { color: "white" },
                        "& .MuiInput-underline:before": { borderBottomColor: "white" },
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