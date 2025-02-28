import React from "react";
import { useEditor } from "@craftjs/core";
import { ExportFileJson } from "../export_file/export-file-json";
import { DeviceMockup } from "../main_element";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import TabletIcon from "@mui/icons-material/Tablet";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ErrorIcon from "@mui/icons-material/Error";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import AndroidIcon from "@mui/icons-material/Android";
import { IconButton } from "@mui/material";

export const AddElementsHeader: React.FC = React.memo(() => {
  const { actions, query } = useEditor();
  const { deviceName, deviceSize } = useEditor((state) => {
    let width = "100%";
    let height = "100vh";
    let name = "📱 Smartphone";
    const nodes = state.nodes;
    for (const node of Object.values(nodes)) {
      if (node.data.type === DeviceMockup) {
        width = node.data.props.width || "100%";
        height = node.data.props.height || "100vh";
        name = node.data.props.name || "📱 Smartphone";
        break;
      }
    }
    const widthNum = parseInt(width.replace(/[^\d]/g, ""), 10) || 375;
    if (widthNum >= 600 && widthNum < 1024) {
      name = "📱 Tablet";
    } else if (widthNum >= 1024) {
      name = "💻 Desktop";
    }

    return {
      deviceName: name,
      deviceSize: `${width} x ${height}`,
    };
  });

  const updateDeviceSize = (width: string, height: string, name: string) => {
    const nodes = query.getNodes();
    for (const [id, node] of Object.entries(nodes)) {
      if (node.data.type === DeviceMockup) {
        actions.setProp(id, (props) => {
          props.width = width;
          props.height = height;
          props.name = name;
        });
        break;
      }
    }
  };

  const handleDeviceClick = (device: "smartphone" | "tablet" | "desktop") => {
    switch (device) {
      case "smartphone":
        updateDeviceSize("475px", "612px", "📱 Smartphone");
        break;
      case "tablet":
        updateDeviceSize("468px", "624px", "📱 Tablet");
        break;
      case "desktop":
        updateDeviceSize("840px", "500px", "💻 Desktop");
        break;
      default:
        break;
    }
  };

  const { canUndo, canRedo } = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  const handleUndo = () => {
    if (canUndo) {
      actions.history.undo();
      console.log("Undo action triggered");
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      actions.history.redo();
      console.log("Redo action triggered");
    }
  };

  const isSmartphone = deviceName.includes("Smartphone");
  const isTablet = deviceName.includes("Tablet");
  const isDesktop = deviceName.includes("Desktop");

  return (
    <header className="border border-gray-700 bg-slate-900 min-h-[3rem] flex flex-wrap items-center justify-between px-2 sm:px-4 md:px-6 text-white shadow-md">
      <div className="flex items-center space-x-2 flex-shrink-0">
        <span className="text-sm sm:text-base md:text-lg font-medium">Project Name</span>
        <IconButton className="hover:text-white" sx={{ color: "white", "&:hover": { backgroundColor: "#2a4365" }, padding: "4px" }}>
          <EditIcon fontSize="small" />
        </IconButton>
      </div>
      <div className="flex items-center space-x-4 sm:space-x-6 flex-wrap justify-center flex-grow">
        <span className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400">{`${deviceName.replace(/^\W+/, '')} - ${deviceSize}`}</span>
        <div className="flex items-center space-x-2">
          <IconButton
            onClick={() => handleDeviceClick("smartphone")}
            sx={{
              color: isSmartphone ? "white" : "#9ca3af",
              "&:hover": { backgroundColor: "#2a4365" },
              padding: "4px",
            }}
            aria-label="Smartphone"
          >
            <SmartphoneIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => handleDeviceClick("tablet")}
            sx={{
              color: isTablet ? "white" : "#9ca3af",
              "&:hover": { backgroundColor: "#2a4365" },
              padding: "4px",
            }}
            aria-label="Tablet"
          >
            <TabletIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => handleDeviceClick("desktop")}
            sx={{
              color: isDesktop ? "white" : "#9ca3af",
              "&:hover": { backgroundColor: "#2a4365" },
              padding: "4px",
            }}
            aria-label="Desktop"
          >
            <DesktopWindowsIcon fontSize="small" />
          </IconButton>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm sm:text-base md:text-lg">Grids</span>
          <IconButton className="hover:text-white" sx={{ color: "white", "&:hover": { backgroundColor: "#2a4365" }, padding: "4px" }}>
            <KeyboardArrowDownIcon fontSize="small" />
          </IconButton>
        </div>
        <div className="flex items-center space-x-2">
          <IconButton
            onClick={handleUndo}
            disabled={!canUndo}
            sx={{
              color: "white",
              "&:hover": { backgroundColor: "#2a4365" },
              "&.Mui-disabled": { color: "#6b7280" },
              padding: "4px",
            }}
            aria-label="Undo"
          >
            <UndoIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={handleRedo}
            disabled={!canRedo}
            sx={{
              color: "white",
              "&:hover": { backgroundColor: "#2a4365" },
              "&.Mui-disabled": { color: "#6b7280" },
              padding: "4px",
            }}
            aria-label="Redo"
          >
            <RedoIcon fontSize="small" />
          </IconButton>
          <IconButton className="hover:text-white" sx={{ color: "white", "&:hover": { backgroundColor: "#2a4365" }, padding: "4px" }}>
            <ErrorIcon fontSize="small" />
          </IconButton>
          <IconButton className="hover:text-white" sx={{ color: "white", "&:hover": { backgroundColor: "#2a4365" }, padding: "4px" }}>
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      <div className="flex items-center space-x-2 flex-shrink-0">
        <IconButton className="hover:text-white" sx={{ color: "white", "&:hover": { backgroundColor: "#2a4365" }, padding: "4px" }}>
          <SearchIcon fontSize="small" />
        </IconButton>
        <IconButton className="hover:text-white" sx={{ color: "white", "&:hover": { backgroundColor: "#2a4365" }, padding: "4px" }}>
          <AndroidIcon fontSize="small" />
        </IconButton>
        <ExportFileJson />
      </div>
    </header>
  );
});
