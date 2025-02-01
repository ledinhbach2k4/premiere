import { Box, Typography } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import Model from "./../assets/js/cube";

export default function PreviewPanel(props: { _id: string, vidProps: {} }) {
  
  return (
    <>
    <Box sx={{ display: "flex", flexDirection: "column", width: '50vh', height: '50vh' }}>
      <Typography variant="h3">Preview</Typography>
      <Canvas >
        <Model _id = { props._id } vidProps={ props.vidProps }/>
      </Canvas>
      <Typography variant="body1">Suc vat bien ©2025</Typography>
    </Box>
    </>
  );
}
// size 