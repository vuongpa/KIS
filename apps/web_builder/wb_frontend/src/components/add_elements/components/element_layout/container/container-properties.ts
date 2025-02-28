export interface DefaultContainerProperties {
  id: string;
  backgroundColor: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  borderStyle: "solid" | "dashed" | "dotted" | "none"; // Thêm borderStyle
  paddingTop: string | number;
  paddingBottom: string | number;
  paddingLeft: string | number;
  paddingRight: string | number;
  marginTop: string | number;
  marginRight: string | number;
  marginBottom: string | number;
  marginLeft: string | number;
  width: string;
  height: string;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string; 
  minHeight?: string; 
  flexDirection: "row" | "column";
  fillSpace: "yes" | "no";
  alignItems: "flex-start" | "center" | "flex-end";
  justifyContent: "flex-start" | "center" | "flex-end";
  gap?: string;
  boxShadow: string;
  textColor: string;
  position?: "static" | "relative" | "absolute" | "fixed" | "sticky"; 
  top?: string; 
  left?: string;
  right?: string; 
  bottom?: string; 
  zIndex?: number; 
  display?: "block" | "flex" | "grid" | "inline" | "none"; 
  overflow?: "visible" | "hidden" | "scroll" | "auto";
  opacity?: number; 
}

export const getDefaultContainerProperties = (): DefaultContainerProperties => ({
  id: "default-container",
  width: "180px",
  height: "100px",
  backgroundColor: "rgba(255,255,255,1)",
  textColor: "rgba(0,0,0,1)",
  borderColor: "#CECECE",
  borderWidth: "0px",
  borderRadius: "0px",
  borderStyle: "solid", 
  boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
  paddingTop: "0px",
  paddingBottom: "0px",
  paddingLeft: "0px",
  paddingRight: "0px",
  marginTop: "0px",
  marginRight: "0px",
  marginBottom: "0px",
  marginLeft: "0px",
  flexDirection: "column",
  fillSpace: "no",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  position: "relative", 
  display: "flex", 
  overflow: "visible", 
  opacity: 1, 
  zIndex: 0, 
  gap: "0px", 
});