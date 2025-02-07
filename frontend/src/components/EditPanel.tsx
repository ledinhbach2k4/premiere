import { Box, Typography, Slider, TextField } from "@mui/material";
import { useState } from "react";

export default function EditPanel({ model, setModel }) { // không biết ép kiểu cho function
  const [scale, setScale] = useState(0.01);


  const scaleChangeHandle = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setScale(newValue);
    }

    model.nodes["object"].scale.set(newValue, newValue, newValue);

    setModel(model);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h3">Edit</Typography>
      <Typography variant="body1">Suc vat bien ©2025</Typography>
      <Slider
        value={scale}
        onChange={scaleChangeHandle}
        defaultValue={1}
        min={1}
        max={100}
      />
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </Box>
  );
}
