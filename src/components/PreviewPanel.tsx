import { Box, Typography } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Model from "./../assets/js/cube";
import { Environment } from '@react-three/drei'
import { AmbientLight } from "three";


export default function PreviewPanel() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h3">Preview</Typography>
      <Canvas>
        <Suspense fallback={null}>
          {/* Ambient Light for overall illumination */}
          <ambientLight intensity={0.5} />
          
          {/* Directional Light for casting shadows and highlights */}
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1} 
            castShadow 
            shadow-mapSize-width={1024} 
            shadow-mapSize-height={1024} 
          />
          
          {/* Point Light for localized lighting */}
          <pointLight 
            position={[-5, 5, 5]} 
            intensity={0.8} 
            decay={2} 
            distance={10} 
          />
        <Model />
      </Suspense>
      </Canvas>
      
      <Typography variant="body1">Suc vat bien ©2025</Typography>
    </Box>
  );
}
