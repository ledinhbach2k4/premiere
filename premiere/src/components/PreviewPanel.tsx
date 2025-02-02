import { Box, Typography, Paper } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import Model from "./../assets/js/cube";

export default function PreviewPanel(props: { _id: string | undefined; vidProps: {} }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: '80vh', height: '75vh', padding: 0.5 }}>
      <Typography variant="h3" sx={{ marginBottom: 2 }}>
        Preview
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
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)" // Shadow for depth
        }}
      >
        <Canvas style={{ width: "100%", height: "100%", backgroundColor: "#000" }}>
          <Model _id={props._id} vidProps={props.vidProps} />
        </Canvas>
      </Paper>
      <Typography variant="body1" sx={{ marginTop: 2, textAlign: "center" }}>
        Suc vat bien ©2025
      </Typography>
    </Box>
  );
}