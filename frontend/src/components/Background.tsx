import { Box } from "@mui/material";
import "./../css/ctr.css";

export default function Background() {
  return (
    <Box>
      {/* Box floating in background */}
      <div className="container">
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>

      {/* CTR */}
      <div className="scanline"></div>
      <div className="scanline1"></div>
      <div className="cristal"></div>
    </Box>
  );
}
