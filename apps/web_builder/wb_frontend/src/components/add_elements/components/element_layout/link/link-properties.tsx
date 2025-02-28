
export const getLinkPropertiesDefaults = () => ({
    url: "https://example.com",
    text: "Click here", 
    target: "_self", 
    color: "#000000", 
    fontFamily: "Arial, sans-serif",
    fontSize: "16px", 
    textDecoration: "underline",
  });
  
  export interface LinkPropertiesDefaults {
    url: string;
    text: string;
    target: "_self" | "_blank";
    color: string;
    fontFamily: string;
    fontSize: string;
    textDecoration: "none" | "underline" | "overline" | "line-through";
  }