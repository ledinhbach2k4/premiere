import PreviewPanel from "../components/PreviewPanel";
import EditPanel from "../components/EditPanel";
import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Template() {
  const { _id } = useParams<string>(); // id có thể là undefine nhưng không biết sửa sao cho hết đỏ

  const safe_id = _id?.replace(":", ""); // xoá dấu : ở param _id

  const [vidProps, setVidProps] = useState<{}>({});

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          flex: 1, 
          marginRight: 2, 
          padding: 2, 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center" 
        }}
      >
        <Typography variant="h6" gutterBottom>
          Preview Panel
        </Typography>
        <PreviewPanel _id={safe_id} vidProps={vidProps} />
      </Paper>
      <Paper 
        elevation={3} 
        sx={{ 
          flex: 1, 
          padding: 2, 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center" ,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)" // Shadow for depth
        }}
      >
        <Typography variant="h6" gutterBottom>
          Edit Panel
        </Typography>
        <EditPanel props={_id} setProps={setVidProps} />
      </Paper>
    </Box>
  );
}