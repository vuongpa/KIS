export const getTabsPropertiesDefaults = () => ({
    tabs: [
      { title: "Tab 1", content: "Content for Tab 1" },
      { title: "Tab 2", content: "Content for Tab 2" },
    ], 
    activeTab: 0, 
    color: "#000000",
    backgroundColor: "#f0f0f0", 
    activeBackgroundColor: "#ffffff", 
    fontSize: "16px", 
    padding: "10px", 
    margin: "0px", 
    border: "1px solid #ccc", 
  });
  
 export interface Tab {
    title: string;
    content: string;
  }
  
 export interface TabsPropertiesDefaults {
    tabs: Tab[];
    activeTab: number;
    color: string;
    backgroundColor: string;
    activeBackgroundColor: string;
    fontSize: string;
    padding: string;
    margin: string;
    border: string;
  }