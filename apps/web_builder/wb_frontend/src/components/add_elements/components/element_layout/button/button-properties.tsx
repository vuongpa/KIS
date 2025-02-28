 export interface ButtonPropertiesDefaults {
    fontFamily: string;
    fontWeight: string | number;
    fontSize: string;
    lineHeight: string;
    color: string;
    textAlign: "left" | "center" | "right";
    textDecoration: "none" | "underline" | "overline" | "line-through";
    backgroundColor: string;
    borderRadius: string;
    borderStyle: "none" | "solid" | "dashed" | "dotted";
    borderWidth: string;
    borderColor: string;
  }
export const getButtonPropertiesDefaults = (): ButtonPropertiesDefaults=> ({
    fontFamily: "Arial, sans-serif",
    fontWeight: "100",
    fontSize: "14px",
    lineHeight: "20px",
    color: "#333",
    textAlign: "center",
    textDecoration: "none",
    backgroundColor: "#3898ec",
    borderRadius: "0px",
    borderStyle: "solid",
    borderWidth: "0px",
    borderColor: "black",
  });
  
