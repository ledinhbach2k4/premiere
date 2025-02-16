import {
  Box,
  Typography,
  Paper,
  Slider,
  Skeleton,
  Button,
  Checkbox,
  FormControlLabel,
  Popover,
} from "@mui/material";
import { Canvas, ObjectMap } from "@react-three/fiber";
import Model from "./Model";
import { useCallback, useState } from "react";
import { IVideo } from "../interface/type";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import { GLTF } from "three/examples/jsm/Addons.js";
import MouseOutlinedIcon from "@mui/icons-material/MouseOutlined";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

export default function PreviewPanel(props: {
  _id: string | undefined;
  vidData: IVideo | undefined;
  model: GLTF & ObjectMap;
}) {
  const [time, setTime] = useState(0);
  const [isPlay, setIsPlay] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [isOrbitControl, setOrbitControl] = useState<boolean>(false);

  // nút play
  const playHandler = () => {
    setIsPlay(!isPlay);
  };

  // xử lí timeline
  const timelineHandler = (_event: Event, newValue: number | number[]) => {
    setTime(newValue as number);
  };

  //format thời gian
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const decreaseTime = useCallback(() => {
    setTime((prevTime) => Math.max(prevTime - 0.05, 0)); // Đảm bảo không âm
  }, []);

  const increaseTime = useCallback(() => {
    setTime((prevTime) => prevTime + 0.05);
  }, []);

  //PopOver của checkbox
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  // SIÊU XUẤT - Supa cum
  const ffmpeg = new FFmpeg();

  // log ffmpeg
  ffmpeg.on("log", (e) => {
    console.log(e);
  });

  const loadFFmpeg = async () => {
    if (!ffmpeg.loaded) {
      await ffmpeg.load();
      console.log("FFmpeg loaded successfully");
    }
  };

  const exportVideo = async () => {
    try {
      await loadFFmpeg();

      // đảm bảo load được canvas
      const canvas = document.querySelector("canvas");
      if (!canvas) {
        console.error("Canvas không tìm thấy!");
        return;
      }

      const frameRate = 60; // FPS
      const totalFrames = frameRate * duration;
      const frames: string[] = [];

      for (let i = 0; i <= totalFrames; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000 / frameRate));

        const dataURL = canvas.toDataURL("image/png");
        const blob = await (await fetch(dataURL)).blob();
        const fileName = `frame_${i.toString().padStart(4, "0")}.png`;

        try {
          await ffmpeg.writeFile(fileName, await fetchFile(blob));
          frames.push(fileName);
        } catch (error) {
          console.error(`Lỗi khi ghi file ${fileName}:`, error);
        }
      }

      try {
        // Chuyển đổi png → MP4
        await ffmpeg.exec([
          "-framerate",
          `${frameRate}`, // Thiết lập tốc độ khung hình (FPS)
          "-i",
          "frame_%04d.png", // Định dạng tên file đầu vào
          "-c:v",
          "libx264", // Sử dụng codec H.264
          "-pix_fmt",
          "yuv420p", // Định dạng pixel
          "-crf",
          "1", // Chất lượng video
          "output.mp4", // Tên file video đầu ra
        ]);
      } catch (error) {
        console.error("Lỗi khi chạy FFmpeg exec:", error);
      }

      // Đọc dữ liệu video
      const data = await ffmpeg.readFile("output.mp4");
      const buffer = data as Uint8Array;

      // Tạo Object URL để tải về
      const url = URL.createObjectURL(
        new Blob([buffer], { type: "video/mp4" })
      );

      // Tạo link tải về
      const a = document.createElement("a");
      a.href = url;
      a.download = "output.mp4";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Lỗi trong quá trình export video:", error);
    }
  };

  return (
    <>
      {/* <div
        id="previewContainer"
        style={{ display: "flex", flexWrap: "wrap" }}
      ></div> */}

      <Button onClick={exportVideo}>export</Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100vh",
          height: "56.25vh",
          padding: 0.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <Typography variant="h5">{props.vidData?.title}</Typography>
          <FormControlLabel
            label="Orbit contol"
            control={
              <Checkbox
                onChange={() => setOrbitControl((prev) => !prev)}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              />
            }
          />
        </Box>

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
            <>
              <Canvas
                id="canvas"
                gl={{ preserveDrawingBuffer: true }}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#000",
                }}
              >
                <Model
                  _id={props.vidData?._id}
                  model={props.model}
                  isPlay={isPlay}
                  time={time}
                  setTime={setTime}
                  setDuration={setDuration}
                  isOrbitControl={isOrbitControl}
                />
              </Canvas>
            </>
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
        <Box sx={{ width: " 60vh ", display: "flex", alignItems: "center" }}>
          <Typography marginRight={2}>{formatTime(0)}</Typography>
          {isPlay ? (
            <Slider min={0} max={duration} step={0.01} value={time} />
          ) : (
            <Slider
              min={0}
              max={duration}
              step={0.01}
              value={time} // Nếu đang kéo, hiển thị seekTime; nếu không thì time
              onChange={timelineHandler}
            />
          )}
          <Typography marginLeft={2}> {formatTime(duration)} </Typography>
        </Box>

        <Box>
          <Button onClick={decreaseTime}>
            <KeyboardDoubleArrowLeftRoundedIcon />
          </Button>
          <Button onClick={playHandler}>
            {isPlay ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
          </Button>
          <Button onClick={increaseTime}>
            <KeyboardDoubleArrowRightRoundedIcon />
          </Button>
        </Box>
        <Popover
          id="mouse-over-popover"
          sx={{ pointerEvents: "none" }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>
            <MouseOutlinedIcon /> HOLD <br></br>
            <b>leftclick:</b> change perspective <br></br>
            <b>rightclick:</b> move camera
          </Typography>
        </Popover>
      </Box>
    </>
  );
}
