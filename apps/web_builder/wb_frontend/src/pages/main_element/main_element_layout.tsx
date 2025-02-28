import { Editor, Frame, Element } from "@craftjs/core";
import {
  LeftSideBar,
  AddElementsHeader,
  RightSidebar,
  AddElementsComponent,
  DeviceMockup,
} from "../../components/add_elements";
import { componentMap } from "../../components/add_elements/components/layout_map";
import { useState } from "react";
import { LayerComponent } from "../../components/add_elements/components/layer";

export const AddElementPage: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const handleComponentChange = (component: string | null) => {
    setActiveComponent(component);
  };

  const renderSidebarContent = () => {
    switch (activeComponent) {
      case "add":
        return <AddElementsComponent />;
      case "layers":
        return <LayerComponent />;
      default:
        return null;
    }
  };

  return (
    <Editor resolver={componentMap}>
      <div className="flex flex-col h-screen overflow-hidden">
        <AddElementsHeader />  
        <div className="flex flex-1 overflow-hidden">
          <LeftSideBar onComponentChange={handleComponentChange} />
          {renderSidebarContent ()}
          <div className="flex flex-col flex-grow w-full overflow-y-auto">
            <div className="flex items-center justify-center w-full h-[calc(100vh-4rem)] bg-gray-100">
              <Frame>
                <Element
                  canvas
                  is={DeviceMockup}
                  
                />
              </Frame>
            </div>
          </div>
          <RightSidebar />
        </div>
      </div>
    </Editor>
  );
};