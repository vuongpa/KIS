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
  Typography,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TabsPropertiesDefaults, Tab } from "./tabs-properties";

interface TabsPropertiesProps {
  properties: TabsPropertiesDefaults;
  onPropertyChange: (newProperties: Partial<TabsPropertiesDefaults>) => void;
  size?: "small"; 
}

export const TabsProperties: React.FC<TabsPropertiesProps> = ({ properties, onPropertyChange, size = "small" }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleChange = <K extends keyof TabsPropertiesDefaults>(
    key: K,
    value: TabsPropertiesDefaults[K]
  ) => {
    onPropertyChange({ [key]: value });
  };

  const handleTabsChange = (newTabs: Tab[]) => {
    onPropertyChange({ tabs: newTabs });
  };

  const sections = [
    { id: "tabs", label: "Tabs", details: ["tabs", "activeTab"] },
    { id: "appearance", label: "Appearance", details: ["color", "backgroundColor", "activeBackgroundColor", "fontSize", "padding", "margin", "border"] },
  ];

  return (
    <Paper elevation={1} sx={{ p: 1, bgcolor: "#111827", color: "white", maxHeight: "calc(100vh - 150px)", overflowY: "auto" }}>
      <Typography variant="subtitle2" gutterBottom sx={{ borderBottom: "1px solid #424242", pb: 0.5, fontSize: "12px" }}>
        Tabs Properties
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
                {section.details.includes("tabs") && (
                  <Box>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px", mb: 0.25 }}>Tabs</Typography>
                    {properties.tabs.map((tab, index) => (
                      <Box key={index} display="flex" alignItems="center" gap={0.5} mb={0.5} sx={{ flexWrap: "wrap" }}>
                        <TextField
                          id={`tab-title-${index}`}
                          label="Title"
                          type="text"
                          value={tab.title}
                          onChange={(e) => {
                            const newTabs = [...properties.tabs];
                            newTabs[index].title = e.target.value;
                            handleTabsChange(newTabs);
                          }}
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
                        <TextField
                          id={`tab-content-${index}`}
                          label="Content"
                          type="text"
                          value={tab.content}
                          onChange={(e) => {
                            const newTabs = [...properties.tabs];
                            newTabs[index].content = e.target.value;
                            handleTabsChange(newTabs);
                          }}
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
                    ))}
                  </Box>
                )}
                {section.details.includes("activeTab") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Active Tab</Typography>
                    <Select
                      value={properties.activeTab}
                      onChange={(e) => handleChange("activeTab", parseInt(e.target.value as string, 10))}
                      variant="standard"
                      size={size}
                      sx={{
                        "& .MuiSelect-select": { color: "white", fontSize: "10px" },
                        "& .MuiSelect-icon": { color: "white", fontSize: "14px" },
                        "& .MuiInput-underline:before": { borderBottomColor: "white" },
                        "& .MuiInput-underline:after": { borderBottomColor: "white" },
                        "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "white" },
                        height: "24px",
                        width: "100px",
                      }}
                    >
                      {properties.tabs.map((_, index) => (
                        <MenuItem key={index} value={index} sx={{ fontSize: "10px", py: 0.25, px: 0.5 }}>{`Tab ${index + 1}`}</MenuItem>
                      ))}
                    </Select>
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
                {section.details.includes("activeBackgroundColor") && (
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="caption" sx={{ minWidth: 80, color: "white", fontSize: "10px" }}>Active Background</Typography>
                    <TextField
                      id="active-background-color"
                      label=""
                      type="text"
                      value={properties.activeBackgroundColor}
                      onChange={(e) => handleChange("activeBackgroundColor", e.target.value)}
                      variant="standard"
                      size={size}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <input
                              type="color"
                              value={properties.activeBackgroundColor}
                              onChange={(e) => handleChange("activeBackgroundColor", e.target.value)}
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
                        width: "120px", 
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