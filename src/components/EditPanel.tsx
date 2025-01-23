import { Box, Typography, Slider, TextField  } from "@mui/material"

export default function EditPanel() {
  return (
    <Box sx={{display: 'flex', flexDirection:'column'}}>
      <Typography variant="h3">Edit</Typography>
      <Typography variant="body1">Suc vat bien ©2025</Typography>
      <Slider/>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </Box>
  )
}
