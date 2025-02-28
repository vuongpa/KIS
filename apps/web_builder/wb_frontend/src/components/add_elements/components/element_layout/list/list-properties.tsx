export const getListPropertiesDefaults = () => ({
    type: "ul", 
    items: ["Item 1", "Item 2", "Item 3"], 
    color: "#000000", 
    fontSize: "16px",
    padding: "10px", 
    margin: "0px",
    backgroundColor: "transparent", 
    border: "1px solid #ccc",
  });
  
  export interface ListPropertiesDefaults {
    type: "ul" | "ol";
    items: string[];
    color: string;
    fontSize: string;
    padding: string;
    margin: string;
    backgroundColor: string;
    border: string;
  }