
export const getVideoPlayerPropertiesDefaults = () => ({
    src: "https://www.example.com/sample-video.mp4", 
    width: "640px", 
    height: "360px",
    controls: true, 
    autoplay: false, 
    loop: false, 
    muted: false,
    padding: "10px", 
    margin: "0px",
    backgroundColor: "transparent", 
    border: "1px solid #ccc", 
  });
  
 export interface VideoPlayerPropertiesDefaults {
    src: string;
    width: string;
    height: string;
    controls: boolean;
    autoplay: boolean;
    loop: boolean;
    muted: boolean;
    padding: string;
    margin: string;
    backgroundColor: string;
    border: string;
  }