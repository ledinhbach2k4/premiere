import { Box, Typography } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Model from "./../assets/js/cube";
import { Environment } from '@react-three/drei'
import { AmbientLight } from "three";


export default function PreviewPanel(props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: '50vh', height: '50vh' }}>
      <Typography variant="h3">Preview</Typography>
      <Canvas >
        <Model props={props.props}/>
      </Canvas>
      <Typography variant="body1">Suc vat bien ©2025</Typography>
    </Box>
  );
}
// size 