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
import { RadioPropertiesDefaults } from "./properties-radio";

interface RadioPropertiesProps {
  properties: RadioPropertiesDefaults;
  onPropertyChange: (newProperties: Partial<RadioPropertiesDefaults>) => void;
  size?: "small"; 
}

export const RadioProperties: React.FC<RadioPropertiesProps> = ({ properties, onPropertyChange, size = "small" }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleChange = <K extends keyof RadioPropertiesDefaults>(
    key: K,
    value: RadioPropertiesDefaults[K]
  ) => {
    onPropertyChange({ [key]: value });
  };

  const sections = [
    { id: "radio", label: "Radio", details: ["label", "value", "name", "checked"] },
    { id: "appearance", label: "Appearance", details: ["color", "fontSize", "padding", "margin", "backgroundColor", "border"] },
  ];

  return (
    <Paper elevation={1} sx={{ p: 1, bgcolor: "#111827", color: "white", maxHeight: "calc(100vh - 150px)", overflowY: "auto" }}>
      <Typography variant="subtitle2" gutterBottom sx={{ borderBottom: "1px solid #424242", pb: 0.5, fontSize: "12px" }}>
        Radio Properties
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
                {section.details.includes("label") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Label</Typography>
                    <TextField
                      id="label"
                      label=""
                      type="text"
                      value={properties.label}
                      onChange={(e) => handleChange("label", e.target.value)}
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
                {section.details.includes("value") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Value</Typography>
                    <TextField
                      id="value"
                      label=""
                      type="text"
                      value={properties.value}
                      onChange={(e) => handleChange("value", e.target.value)}
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
                {section.details.includes("name") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Name</Typography>
                    <TextField
                      id="name"
                      label=""
                      type="text"
                      value={properties.name}
                      onChange={(e) => handleChange("name", e.target.value)}
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
                {section.details.includes("checked") && (
                  <Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={properties.checked}
                          onChange={(e) => handleChange("checked", e.target.checked)}
                          sx={{ color: "white" }}
                          size="small" // Giảm kích thước Checkbox
                        />
                      }
                      label={<Typography variant="caption" sx={{ color: "white", fontSize: "10px" }}>Checked</Typography>}
                    />
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
                {section.details.includes("fontSize") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Font Size</Typography>
                    <TextField
                      id="font-size"
                      label=""
                      type="text"
                      value={properties.fontSize}
                      onChange={(e) => handleChange("fontSize", e.target.value)}
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