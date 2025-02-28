
export const getGridPropertiesDefaults = () => ({
    columns: 3, 
    rows: 2, 
    gap: "10px",
    padding: "10px", 
    margin: "0px", 
    backgroundColor: "#ffffff", 
    border: "1px solid #ccc", 
  });
  
  export interface GridPropertiesDefaults {
    columns: number;
    rows: number;
    gap: string;
    padding: string;
    margin: string;
    backgroundColor: string;
    border: string;
  }