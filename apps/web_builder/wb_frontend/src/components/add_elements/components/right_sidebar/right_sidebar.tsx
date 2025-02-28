import { ButtonGroup, Box, Button, Select, MenuItem, TextField, Divider, InputLabel, FormControl } from "@mui/material";
import { useEditor } from "@craftjs/core";
import { ContainerProperties } from "../element_layout/container/properties-container-panel";
import { ContainerLayout } from "../element_layout/container/container-layout";
import { DefaultContainerProperties } from "../element_layout/container/container-properties";
import { TextLayout } from "../element_layout/text/text-layout";
import { TextProperties } from "../element_layout/text/properties-text-panel";
import { TextDefaultProperties } from "../element_layout/text/text-properties";
import { HeadingLayout } from "../element_layout/heading/heading-layout";
import { HeadingProperties } from "../element_layout/heading/properties-heading-panel";
import { HeadingPropertiesDefaults } from "../element_layout/heading/heading-properties";
import { ButtonLayout } from "../element_layout/button/button-layout";
import { ButtonProperties } from "../element_layout/button/button-properties-panel";
import { ButtonPropertiesDefaults } from "../element_layout/button/button-properties";
import { LinkProperties } from "../element_layout/link/properties-link-panel";
import { ImageLayout, LinkLayout, ListLayout, RadioLayout, RowLayout, TabsLayout, VideoPlayerLayout } from "../element_layout";
import { LinkPropertiesDefaults } from "../element_layout/link/link-properties";
import { GridLayout } from "../element_layout/grid/grid-layout";
import { GridProperties } from "../element_layout/grid/properties-grid-panel";
import { GridPropertiesDefaults } from "../element_layout/grid/properties-grid";
import { ImagePropertiesDefaults } from "../element_layout/image/image-properties";
import { ImageProperties } from "../element_layout/image/properties-image-panel";
import { RadioPropertiesDefaults } from "../element_layout/radio/properties-radio";
import { RadioProperties } from "../element_layout/radio/radio-properties-panel";
import { CheckboxLayout } from "../element_layout/checkbox/checkbox-layout";
import { CheckboxProperties } from "../element_layout/checkbox/properties-checkbox-panel";
import { CheckboxPropertiesDefaults } from "../element_layout/checkbox/checkbox-properties";
import { ListProperties } from "../element_layout/list/properties-list-panel";
import { ListPropertiesDefaults } from "../element_layout/list/list-properties";
import { TabsProperties } from "../element_layout/tabs/properties-tabs-panel";
import { TabsPropertiesDefaults } from "../element_layout/tabs/tabs-properties";
import { VideoPlayerProperties } from "../element_layout/videoplayer/properties-videoplayer-pannel";
import { VideoPlayerPropertiesDefaults } from "../element_layout/videoplayer/videoplayer-properties";
import { RowProperties } from "../element_layout/row/properties-row-panel";
import { RowPropertiesDefaults } from "../element_layout/row/row-properties";

export const RightSidebar: React.FC = () => {

  const { selectedNode, actions} = useEditor((state) => {
    const selectedId = state.events.selected.size > 0 ? state.events.selected.values().next().value : null;
    return {
      selectedNode: selectedId ? state.nodes[selectedId] : null,
    };
  });
  const handlePropertyChange = (
    newProperties: Partial<
      DefaultContainerProperties | TextDefaultProperties | HeadingPropertiesDefaults | ButtonPropertiesDefaults | RowPropertiesDefaults // Thêm RowPropertiesDefaults
    >
  ) => {
    if (selectedNode) {
      actions.setProp(selectedNode.id, (props: any) => {
        const filteredProps = {};
        Object.keys(newProperties).forEach((key) => {
          if (key in (props as any)) {
            (filteredProps as any)[key] = (newProperties as any)[key];
          }
        });
        Object.assign(props, filteredProps);
      });
    }
  };

  return (
    <Box className="p-3 w-[350px] h-screen bg-gray-900 text-white border-l border-gray-700 overflow-y-auto" sx={{ maxHeight: "calc(100vh - 64px)" }}>
      <ButtonGroup className="mb-1" variant="outlined" aria-label="Basic button group">
        <Button
          size="small"
          sx={{
            fontSize: "10px",
            padding: "2px 6px",
            color: "white",
            borderColor: "white",
            "&:hover": {
              backgroundColor: "#2a4365",
              borderColor: "white"
            }
          }}
        >
          Style
        </Button>
        <Button
          size="small"
          sx={{
            fontSize: "10px",
            padding: "2px 6px",
            color: "white",
            borderColor: "white",
            "&:hover": {
              backgroundColor: "#2a4365",
              borderColor: "white"
            }
          }}
        >
          Interactions
        </Button>
        <Button
          size="small"
          sx={{
            fontSize: "10px",
            padding: "2px 6px",
            color: "white",
            borderColor: "white",
            "&:hover": {
              backgroundColor: "#2a4365",
              borderColor: "white"
            }
          }}
        >
          Inspector
        </Button>
      </ButtonGroup>
      <Divider sx={{ bgcolor: "#444" }} />
      <Box mt={0.5}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" sx={{ fontSize: "12px", color: "white" }}>Page</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Page"
            size="small"
            sx={{
              "& .MuiSelect-select": { color: "white", fontSize: "12px" },
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiInputLabel-root.Mui-focused": { color: "white" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },


              height: "48px",
            }}
          >
            <MenuItem sx={{ fontSize: "12px", py: 0.5, px: 0.75 }}>Login</MenuItem>
            <MenuItem sx={{ fontSize: "12px", py: 0.5, px: 0.75 }}>HomePage</MenuItem>
            <MenuItem sx={{ fontSize: "12px", py: 0.5, px: 0.75 }}>Settings</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Divider sx={{ bgcolor: "#444", my: 2 }} />
      <div className="flex gap-2 items-center">
        <TextField
          id="standard-number"
          label="Width"
          type="number"
          value={100}
          variant="standard"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          sx={{
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiInputLabel-root.Mui-focused": { color: "white" },
            "& .MuiInput-underline:before": { borderBottomColor: "white" },
            "& .MuiInput-underline:after": { borderBottomColor: "white" },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "white" },
          }}
        />
        <TextField
          id="standard-number"
          label="Height"
          type="number"
          value={100}
          variant="standard"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          sx={{
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiInputLabel-root.Mui-focused": { color: "white" },
            "& .MuiInput-underline:before": { borderBottomColor: "white" },
            "& .MuiInput-underline:after": { borderBottomColor: "white" },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "white" },
          }}
        />
      </div>
      <Divider sx={{ bgcolor: "#444", my: 2 }} />

      {selectedNode && selectedNode.data && (
        <Box mt={4} sx={{ overflowY: "auto", maxHeight: "calc(100vh - 400px)" }}>
          {selectedNode.data.type === ContainerLayout && (
            <Box>
              <ContainerProperties
                properties={selectedNode.data.props as DefaultContainerProperties}
                onPropertyChange={handlePropertyChange}
              />
            </Box>
          )}
          {selectedNode.data.type === TextLayout && (
            <Box>
              <TextProperties
                properties={selectedNode.data.props as TextDefaultProperties}
                onPropertyChange={handlePropertyChange}
              />
            </Box>
          )}
          {selectedNode.data.type === HeadingLayout && (
            <Box>
              <HeadingProperties
                properties={selectedNode.data.props as HeadingPropertiesDefaults}
                onPropertyChange={handlePropertyChange}
              />
            </Box>
          )}
          {selectedNode.data.type === ButtonLayout && (
            <Box>
              <ButtonProperties
                properties={selectedNode.data.props as ButtonPropertiesDefaults}
                onPropertyChange={handlePropertyChange}
              />
            </Box>
          )}
          {selectedNode.data.type === LinkLayout && (
            <Box>
              <LinkProperties
                properties={selectedNode.data.props as LinkPropertiesDefaults}
                onPropertyChange={handlePropertyChange}
              />
            </Box>
          )}
          {selectedNode.data.type === GridLayout && (
            <Box>
              <GridProperties
                properties={selectedNode.data.props as GridPropertiesDefaults}
                onPropertyChange={handlePropertyChange}
              />
            </Box>
          )}
          {selectedNode.data.type === ImageLayout && (
            <Box>
              <ImageProperties
                properties={selectedNode.data.props as ImagePropertiesDefaults}
                onPropertyChange={handlePropertyChange}
              />
            </Box>
          )}
          {selectedNode.data.type === RadioLayout && (
            <Box>
              <RadioProperties
                properties={selectedNode.data.props as RadioPropertiesDefaults}
                onPropertyChange={handlePropertyChange}
              />
            </Box>
          )}
          {selectedNode.data.type === CheckboxLayout && (
            <Box>
              <CheckboxProperties
                properties={selectedNode.data.props as CheckboxPropertiesDefaults}
                onPropertyChange={handlePropertyChange}
              />
            </Box>
          )}
          {selectedNode.data.type === ListLayout && (
            <Box>
              <ListProperties
                properties={selectedNode.data.props as ListPropertiesDefaults}
                onPropertyChange={handlePropertyChange}
              />
            </Box>
          )}
          {selectedNode.data.type === TabsLayout && (
            <Box>
              <TabsProperties
                properties={selectedNode.data.props as TabsPropertiesDefaults}
                onPropertyChange={handlePropertyChange}
                size="small"
              />
            </Box>
          )}
          {selectedNode.data.type === VideoPlayerLayout && (
            <Box>
              <VideoPlayerProperties
                properties={selectedNode.data.props as VideoPlayerPropertiesDefaults}
                onPropertyChange={handlePropertyChange}
              />
            </Box>
          )}
          {selectedNode.data.type === RowLayout && (
            <Box>
              <RowProperties
                properties={selectedNode.data.props as RowPropertiesDefaults}
                onPropertyChange={handlePropertyChange}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};