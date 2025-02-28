
export const getImagePropertiesDefaults = () => ({
    src: "https://via.placeholder.com/300x200",
    alt: "Image description",
    width: "300px", 
    height: "200px", 
    padding: "10px",
    margin: "0px",
    border: "1px solid #ccc", 
    backgroundColor: "transparent", 
  });
  
export  interface ImagePropertiesDefaults {
    src: string;
    alt: string;
    width: string;
    height: string;
    padding: string;
    margin: string;
    border: string;
    backgroundColor: string;
  }