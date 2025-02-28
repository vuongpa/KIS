export interface TextDefaultProperties {
  fontSize: string | number;
  fontWeight: "regular" | "medium" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
  fontFamily: string; 
  textAlign: "left" | "center" | "right" | "justify"; 
  marginTopTypography: string | number;
  marginRightTypography: string | number;
  marginBottomTypography: string | number;
  marginLeftTypography: string | number;
  paddingTop?: string | number; 
  paddingRight?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  lineHeight: string | number; 
  letterSpacing: string | number;
  textDecoration: "none" | "underline" | "line-through" | "overline"; 
  textTransform: "none" | "uppercase" | "lowercase" | "capitalize"; 
  backgroundColorAppearance: string;
  boxShadowAppearance: string;
  textColorAppearance: string;
  textShadow?: string; 
  opacity?: number; 
  wordWrap?: "normal" | "break-word" | "break-all"; 
  whiteSpace?: "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line"; 
}

export const getTextDefaultProperties = (): TextDefaultProperties => ({
  fontSize: "16px",
  fontWeight: "regular",
  fontFamily: "Arial, sans-serif", 
  textAlign: "left",
  marginTopTypography: "0px",
  marginRightTypography: "0px",
  marginBottomTypography: "0px",
  marginLeftTypography: "0px",
  paddingTop: "0px",
  paddingRight: "0px",
  paddingBottom: "0px",
  paddingLeft: "0px",
  lineHeight: "1.5",
  letterSpacing: "0px", 
  textDecoration: "none", 
  textTransform: "none",
  backgroundColorAppearance: "rgba(255, 255, 255, 1)",
  boxShadowAppearance: "0px 4px 10px rgba(0,0,0,0.3)",
  textColorAppearance: "rgba(0, 0, 0, 1)",
  textShadow: "0px 0px 0px rgba(0,0,0,0)", 
  opacity: 1, 
  wordWrap: "normal", 
  whiteSpace: "normal", 
});