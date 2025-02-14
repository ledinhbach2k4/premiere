import {
  Box,
  Typography,
  Slider,
  TextField,
  Tabs,
  Tab,
  Skeleton,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ObjectMap } from "@react-three/fiber";
import WallpaperSharpIcon from "@mui/icons-material/WallpaperSharp";

export default function EditPanel(props: {
  model: GLTF & ObjectMap;
  setModel: React.Dispatch<React.SetStateAction<GLTF & ObjectMap>>;
}) {
  // không biết ép kiểu cho function
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState<number[]>([0, 0, 0]);
  const [tabValue, setTabValue] = useState<string>("object");
  const gltf = props.model;

  // thay đổi kích thước
  function scaleChangeHandle(key: string) {
    return (_event: Event, value: number | number[], _activeThumb: number) => {
      const newValue = value as number;
      setScale(newValue);
      props.model.nodes[key].scale.set(newValue, newValue, newValue);
    };
  }

  // thay đổi vị trí object
  /**
   * index
   *  0: thay đổi x
   *  1: thay đổi y
   *  2: thay đổi z
   *
   */
  function positionChangeHandle(key: string, index: number) {
    return (_event: Event, value: number | number[], _activeThumb: number) => {
      const newValue = value as number;
      const newPosition = [...position];
      newPosition[index] = newValue;
      setPosition(newPosition);

      gltf.nodes[key].position.set(
        newPosition[0],
        newPosition[1],
        newPosition[2],
      );
    };
  }

  // thay đổi tab
  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {gltf ? (
        <>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="icon label"
          >
            {Object.keys(gltf.nodes)
              .filter((key) => key.startsWith("object") || key.startsWith("bg"))
              .map((key) => (
                <Tab
                  key={key}
                  icon={
                    key.startsWith("object") ? (
                      <ViewInArIcon />
                    ) : (
                      <WallpaperSharpIcon />
                    )
                  }
                  label={key}
                  value={key}
                />
              ))}
          </Tabs>
        </>
      ) : (
        <Skeleton variant="rectangular" width={210} height={60} />
      )}

      {/* TabPanel tương ứng với từng tab */}
      {Object.keys(gltf.nodes)
        .filter((key) => key.startsWith("object") || key.startsWith("bg"))
        .map((key) => (
          <Box
            key={key}
            hidden={tabValue !== key}
            sx={{ p: 2, display: tabValue === key ? "block" : "none" }}
          >
            {/* scale */}
            <Typography> scale </Typography>
            <Slider
              value={scale}
              onChange={scaleChangeHandle(key)}
              defaultValue={1}
              min={1}
              max={100}
            />

            {/* position */}
            <Typography> position </Typography>
            <Box display={"flex"} alignItems="center" marginBottom={"10px"}>
              <Slider
                value={position[0]}
                onChange={positionChangeHandle(key, 0)}
                defaultValue={0}
                min={-10}
                max={10}
              />
              <TextField
                type="number"
                value={position[0]}
                sx={{ ml: 2, width: "10ch" }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">x: </InputAdornment>
                    ),
                  },
                }}
                variant="standard"
              />
            </Box>

            <Box display={"flex"} alignItems="center" marginBottom={"10px"}>
              <Slider
                value={position[1]}
                onChange={positionChangeHandle(key, 1)}
                defaultValue={0}
                min={-10}
                max={10}
              />
              <TextField
                type="number"
                value={position[1]}
                sx={{ ml: 2, width: "10ch" }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">y: </InputAdornment>
                    ),
                  },
                }}
                variant="standard"
              />
            </Box>
            <Box display={"flex"} alignItems="center" marginBottom={"10px"}>
              <Slider
                value={position[2]}
                onChange={positionChangeHandle(key, 2)}
                defaultValue={0}
                min={-10}
                max={10}
              />
              <TextField
                type="number"
                value={position[2]}
                sx={{ ml: 2, width: "10ch" }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">z: </InputAdornment>
                    ),
                  },
                }}
                variant="standard"
              />
            </Box>
          </Box>
        ))}
    </Box>
  );
}
