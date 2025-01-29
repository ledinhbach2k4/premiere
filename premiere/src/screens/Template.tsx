
import PreviewPanel from "../components/PreviewPanel";
import EditPanel from "../components/EditPanel";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function Template(
  // props
) {
  const [props, setProps] = useState({});

  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between'}} >
      <PreviewPanel props={props}/>
      <EditPanel props={props} setProps={setProps}/>
    </Box>
  );
}
