import { Box, Typography, Slider, TextField } from "@mui/material";
import { useState } from "react";

export default function EditPanel({props, setProps}) {
  const [scale, setScale] = useState(1);
  const handleChange = (event: Event, newScale: number | number[]) => {
    setScale(newScale as number);
    setProps({ scale: scale });
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h3">Edit</Typography>
      <Typography variant="body1">Suc vat bien ©2025</Typography>
      <Slider value={scale} onChange={handleChange} min={0.1} max={5} step={0.1}
 />
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </Box>
  );
}

