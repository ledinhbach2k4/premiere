import React from "react";
import { Paper, Skeleton, Typography } from "@mui/material";

export default function Tabs(props) {
  return (
    <>
      <Paper
        sx={{
          width: 300,
          height: 200,
          p: 2,
          m: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography variant="h5">
          {props.heading}
        </Typography>
        <Typography variant="body2">
          {props.body}
        </Typography>
        <Skeleton variant="rectangular" height={100} />
      </Paper>
    </>
  );
}
