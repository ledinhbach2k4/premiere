
import PreviewPanel from "../components/PreviewPanel";
import EditPanel from "../components/EditPanel";
import { Box } from "@mui/material";

export default function Template() {
  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <PreviewPanel/>
      <EditPanel/>
    </Box>
  );
}
