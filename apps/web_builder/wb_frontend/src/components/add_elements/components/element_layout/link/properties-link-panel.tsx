import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Typography,
  MenuItem,
  Select,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LinkPropertiesDefaults } from "./link-properties";

interface LinkPropertiesProps {
  properties: LinkPropertiesDefaults;
  onPropertyChange: (newProperties: Partial<LinkPropertiesDefaults>) => void;
  size?: "small"; 
}

export const LinkProperties: React.FC<LinkPropertiesProps> = ({ properties, onPropertyChange, size = "small" }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleChange = <K extends keyof LinkPropertiesDefaults>(
    key: K,
    value: LinkPropertiesDefaults[K]
  ) => {
    onPropertyChange({ [key]: value });
  };

  const sections = [
    { id: "link", label: "Link", details: ["url", "text", "target"] },
    { id: "typography", label: "Typography", details: ["color", "fontFamily", "fontSize", "textDecoration"] },
  ];

  return (
    <Paper elevation={1} sx={{ p: 1, bgcolor: "#111827", color: "white", maxHeight: "calc(100vh - 150px)", overflowY: "auto" }}>
      <Typography variant="subtitle2" gutterBottom sx={{ borderBottom: "1px solid #424242", pb: 0.5, fontSize: "12px" }}>
        Link Properties
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
                {section.details.includes("url") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>URL</Typography>
                    <TextField
                      id="url"
                      label=""
                      type="text"
                      value={properties.url}
                      onChange={(e) => handleChange("url", e.target.value)}
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
                {section.details.includes("text") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Text</Typography>
                    <TextField
                      id="text"
                      label=""
                      type="text"
                      value={properties.text}
                      onChange={(e) => handleChange("text", e.target.value)}
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
                {section.details.includes("target") && (
                  <Box>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px", mb: 0.25 }}>Target</Typography>
                    <RadioGroup
                      row
                      value={properties.target || "_self"}
                      onChange={(e) => handleChange("target", e.target.value as "_self" | "_blank")}
                      sx={{ color: "white" }}
                    >
                      <FormControlLabel value="_self" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>Same Tab</Typography>} />
                      <FormControlLabel value="_blank" control={<Radio sx={{ color: "white" }} size="small" />} label={<Typography variant="caption" sx={{ fontSize: "10px" }}>New Tab</Typography>} />
                    </RadioGroup>
                  </Box>
                )}
                {section.details.includes("color") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Color</Typography>
                    <TextField
                      id="color"
                      label=""
                      type="text"
                      value={properties.color}
                      onChange={(e) => handleChange("color", e.target.value)}
                      variant="standard"
                      size={size}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <input
                              type="color"
                              value={properties.color}
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
                {section.details.includes("textDecoration") && (
                  <Box>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px", mb: 0.25 }}>Decoration</Typography>
                    <RadioGroup
                      row
                      value={properties.textDecoration || "underline"}
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
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Paper>
  );
};