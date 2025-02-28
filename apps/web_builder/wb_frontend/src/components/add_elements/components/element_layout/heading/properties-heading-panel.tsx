import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getHeadingPropertiesDefaults } from "./heading-properties";

interface HeadingPropertiesProps {
  properties: ReturnType<typeof getHeadingPropertiesDefaults>;
  onPropertyChange: (newProperties: Partial<ReturnType<typeof getHeadingPropertiesDefaults>>) => void;
  size?: "small"; // Thêm prop size để giữ nhất quán với RightSidebar
}

export const HeadingProperties: React.FC<HeadingPropertiesProps> = ({ properties, onPropertyChange, size = "small" }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleChange = <K extends keyof ReturnType<typeof getHeadingPropertiesDefaults>>(
    key: K,
    value: ReturnType<typeof getHeadingPropertiesDefaults>[K]
  ) => {
    onPropertyChange({ [key]: value });
  };

  const sections = [
    { id: "typography", label: "Typography", details: ["fontSize", "fontWeight", "textTransform", "textDecoration", "textAlign", "letterSpacing", "lineHeight"] },
    { id: "appearance", label: "Appearance", details: ["color", "textStroke"] },
  ];

  function setShowPicker(arg0: boolean) {
    console.log("Show Picker:", arg0);
  }

  return (
    <Paper elevation={1} sx={{ p: 1, bgcolor: "#111827", color: "white", maxHeight: "calc(100vh - 150px)", overflowY: "auto" }}>
      <Typography variant="subtitle2" gutterBottom sx={{ borderBottom: "1px solid #424242", pb: 0.5, fontSize: "12px" }}>
        Heading Properties
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
                {section.details.includes("fontSize") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Font Size</Typography>
                    <TextField
                      id="font-size"
                      label="Font Size"
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
                {section.details.includes("fontWeight") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Font Weight</Typography>
                    <RadioGroup
                      row
                      value={properties.fontWeight || "700"}
                      onChange={(e) => handleChange("fontWeight", e.target.value as "100" | "400" | "700")}
                      sx={{ color: "white" }}
                    >
                      <FormControlLabel
                        value="100"
                        control={<Radio sx={{ color: "white" }} size="small" />}
                        label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Thin</Typography>}
                      />
                      <FormControlLabel
                        value="400"
                        control={<Radio sx={{ color: "white" }} size="small" />}
                        label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Regular</Typography>}
                      />
                      <FormControlLabel
                        value="700"
                        control={<Radio sx={{ color: "white" }} size="small" />}
                        label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Bold</Typography>}
                      />
                    </RadioGroup>
                  </Box>
                )}
                {section.details.includes("textTransform") && (
                  <Box>
                    <Typography variant="caption" sx={{ color: "white", fontSize: "10px", mb: 0.25 }}>Text Transform</Typography>
                    <RadioGroup
                      row
                      value={properties.textTransform || "capitalize"}
                      onChange={(e) => handleChange("textTransform", e.target.value as "capitalize" | "uppercase" | "lowercase" | "none")}
                      sx={{ color: "white" }}
                    >
                      <FormControlLabel value="capitalize" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Capitalize</Typography>} />
                      <FormControlLabel value="uppercase" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Uppercase</Typography>} />
                      <FormControlLabel value="lowercase" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Lowercase</Typography>} />
                      <FormControlLabel value="none" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>None</Typography>} />
                    </RadioGroup>
                  </Box>
                )}
                {section.details.includes("textDecoration") && (
                  <Box>
                    <Typography variant="caption" sx={{ color: "white", fontSize: "10px", mb: 0.25 }}>Text Decoration</Typography>
                    <RadioGroup
                      row
                      value={properties.textDecoration || "underline"}
                      onChange={(e) => handleChange("textDecoration", e.target.value as "underline" | "overline" | "line-through" | "none")}
                      sx={{ color: "white" }}
                    >
                      <FormControlLabel value="underline" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Underline</Typography>} />
                      <FormControlLabel value="overline" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Overline</Typography>} />
                      <FormControlLabel value="line-through" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Line-through</Typography>} />
                      <FormControlLabel value="none" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>None</Typography>} />
                    </RadioGroup>
                  </Box>
                )}
                {section.details.includes("textAlign") && (
                  <Box>
                    <Typography variant="caption" sx={{ color: "white", fontSize: "10px", mb: 0.25 }}>Text Align</Typography>
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
                {section.details.includes("letterSpacing") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Letter Spacing</Typography>
                    <TextField
                      id="letter-spacing"
                      label="Letter Spacing"
                      type="number"
                      value={parseInt(String(properties.letterSpacing).replace("px", ""), 10)}
                      onChange={(e) => handleChange("letterSpacing", `${e.target.value}px`)}
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
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Line Height</Typography>
                    <TextField
                      id="line-height"
                      label="Line Height"
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
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Text Color</Typography>
                    <TextField
                      id="text-color"
                      label="Text Color"
                      type="text"
                      value={properties.color || "#FF0000"}
                      onChange={(e) => handleChange("color", e.target.value)}
                      variant="standard"
                      size={size}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <input
                              type="color"
                              value={properties.color || "#FF0000"}
                              onChange={(e) => handleChange("color", e.target.value)}
                              style={{ width: "20px", height: "20px", border: "none", background: "none", cursor: "pointer" }}
                              onClick={(e) => { e.stopPropagation(); setShowPicker(true); }}
                              onBlur={() => setShowPicker(false)}
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
                {section.details.includes("textStroke") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Text Stroke</Typography>
                    <TextField
                      id="text-stroke"
                      label="Text Stroke"
                      type="text"
                      value={properties.textStroke || "1px #333"}
                      onChange={(e) => handleChange("textStroke", e.target.value)}
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
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Paper>
  );
};