import {
  Box,
  Typography,
  Paper,
  Slider,
  Skeleton,
  Button,
} from "@mui/material";
import { Canvas, ObjectMap } from "@react-three/fiber";
import Model from "../assets/js/Model";
import { useState } from "react";
import { IVideo } from "../interface/type";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import { GLTF } from "three/examples/jsm/Addons.js";

export default function PreviewPanel(props: {
  _id: string | undefined;
  vidData: IVideo | undefined;
  model: GLTF & ObjectMap;
}) {
  const [time, setTime] = useState(0);
  const [isPlay, setIsPlay] = useState(true);
  const [duration, setDuration] = useState(100); // Giá trị max cho Slider

  const playHandler = () => {
    setIsPlay(!isPlay);
  };

  const timelineHandler = (_event: Event, newValue: number | number[]) => {
    setTime(newValue as number);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100vh",
          height: "56.25vh",
          padding: 0.5,
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: 2 }}>
          {props.vidData?.title}
        </Typography>
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1e1e1e",
            borderRadius: 2,
            overflow: "hidden", // Ensures the canvas fits within the Paper
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)", // Shadow for depth
          }}
        >
          {props.vidData ? (
            <Canvas
              style={{ width: "100%", height: "100%", backgroundColor: "#000" }}
            >
              <Model
                _id={props.vidData?._id}
                model={props.model}
                isPlay={isPlay}
                time={time}
                setTime={setTime}
                setDuration={setDuration}
              />
            </Canvas>
          ) : (
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={1920}
              height={1920}
            />
          )}
        </Paper>

        <Typography variant="body1" sx={{ marginTop: 2, textAlign: "center" }}>
          Suc vat bien ©2025
        </Typography>
      </Box>

      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: " 40vh " }}>
          {isPlay ? (
            <Slider
              min={0}
              max={duration}
              step={0.01}
              value={time}
              onChange={timelineHandler}
              disabled
            />
          ) : (
            <Slider
              min={0}
              max={duration}
              step={0.01}
              value={time}
              onChange={timelineHandler}
            />
          )}
        </Box>

        <Box>
          <KeyboardDoubleArrowLeftRoundedIcon />
          <Button onClick={playHandler}>
            {isPlay ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
          </Button>
          <KeyboardDoubleArrowRightRoundedIcon />
        </Box>
      </Box>
    </>
  );
}
