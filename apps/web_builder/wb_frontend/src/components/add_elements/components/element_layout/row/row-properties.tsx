
export const getRowPropertiesDefaults = () => ({
    width: "100%", 
    align: "stretch",
    justify: "flex-start",
    gap: "10px", 
    padding: "10px", 
    margin: "0px", 
    backgroundColor: "#ffffff", 
    border: "1px solid #ccc", 
  });
  
  export interface RowPropertiesDefaults {
    width: string;
    align: string;
    justify: string;
    gap: string;
    padding: string;
    margin: string;
    backgroundColor: string;
    border: string;
  }