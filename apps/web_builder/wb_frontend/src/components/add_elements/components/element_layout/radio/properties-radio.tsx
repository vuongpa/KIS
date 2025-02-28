
export const getRadioPropertiesDefaults = () => ({
    label: "Radio",
    name: "radio-group",
    checked: false,
    color: "#000000",
    fontSize: "16px",
    padding: "8px",
    margin: "0px",
    backgroundColor: "transparent",
    border: "1px solid #ccc",
  });
  
  export interface RadioPropertiesDefaults {
    label: string;
    name: string;
    checked: boolean;
    value:string ;
    color: string;
    fontSize: string;
    padding: string;
    margin: string;
    backgroundColor: string;
    border: string;
  }