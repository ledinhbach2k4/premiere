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
  Dialog,
  IconButton,
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
import { FFmpeg } from '@ffmpeg/ffmpeg';



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

  // SIÊU XUẤT
  const ffmpeg = new FFmpeg();

  const exportVideo = async () => {
    try {
      console.log("Bắt đầu export video...");
      
      if (!ffmpeg.load()) {
        console.log("Đang tải FFmpeg...");
        await ffmpeg.load();
        console.log("FFmpeg đã sẵn sàng.");
      }
  
      const canvas = document.getElementById("canvas")?.children[0].children[0] as HTMLCanvasElement;
      
      console.log(canvas);  

      if (!canvas) {
        console.error("Canvas không tìm thấy!");
        return;
      }
  
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Không thể lấy context của canvas!");
        return;
      }
  
      const frameRate = 30; // FPS mong muốn
      const duration = 5; // Ghi trong 5 giây (có thể thay đổi)
      const totalFrames = frameRate * duration;
      const frames: string[] = [];
  
      console.log(`Bắt đầu ghi ${totalFrames} frames...`);
  
      // Chụp từng frame
      for (let i = 0; i < totalFrames; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000 / frameRate));
  
        const dataURL = canvas.toDataURL("image/png");
        const blob = await (await fetch(dataURL)).blob();
        const file = new File([blob], `frame_${i.toString().padStart(4, "0")}.png`);
  
        console.log(`Đã chụp frame ${i}: ${file.name}`);
  
        try {
          ffmpeg.FS("writeFile", file.name, await fetchFile(file));
          frames.push(file.name);
        } catch (error) {
          console.error(`Lỗi khi ghi file ${file.name} vào FFmpeg:`, error);
        }
      }
  
      console.log("Hoàn tất ghi frames. Tổng số frames:", frames.length);
  
      // Ghi danh sách ảnh vào file text (để dùng với FFmpeg)
      const fileList = frames.map((f) => `file '${f}'`).join("\n");
      ffmpeg.FS("writeFile", "frames.txt", new TextEncoder().encode(fileList));
  
      console.log("Đã tạo file danh sách frames.txt");
  
      // Chuyển đổi PNG → MP4 bằng FFmpeg
      console.log("Bắt đầu chuyển đổi ảnh thành video...");
      await ffmpeg.run(
        "-r", `${frameRate}`,
        "-f", "concat",
        "-safe", "0",
        "-i", "frames.txt",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-crf", "18",
        "output.mp4"
      );
  
      console.log("FFmpeg đã tạo xong video!");
  
      // Xuất file
      const data = ffmpeg.FS("readFile", "output.mp4");
      const url = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }));
  
      console.log("Tạo link tải video:", url);
  
      // Tạo link tải về
      const a = document.createElement("a");
      a.href = url;
      a.download = "exported_video.mp4";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
      console.log("Xuất video thành công!");
    } catch (error) {
      console.error("Lỗi trong quá trình export video:", error);
    }
  };
  
  
  return (
    <>
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
            <Slider min={0} max={duration} step={0.01} value={time} disabled />
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
            <b>leftclick:</b> move around <br></br>
            <b>rightclick:</b> move camera
          </Typography>
        </Popover>
      </Box>
    </>
  );
}
