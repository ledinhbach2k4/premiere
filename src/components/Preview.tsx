import React from "react";
import { Paper, Skeleton, Typography, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";

export default function Preview(props) {
  const [liked, setLiked] = useState(false);
  const toggleLike = () => {
    setLiked(!liked); // Toggle like state
  };

  return (
    <>
      <Paper
        sx={{
          width: 300,
          height: 250,
          p: 2,
          m: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          position: "relative",
        }}
      >
        <Skeleton variant="rectangular" height={"100%"} />
        <Typography variant="h5">{props.heading}</Typography>
        <Typography variant="body2">{props.body}</Typography>
        <IconButton
          onClick={toggleLike}
          sx={{ position: "absolute", bottom: 8, right: 8, opacity: liked ? 1 : 0.5, transition: "opacity 0.3s ease" }}
        >
          <FavoriteIcon color={liked ? "error" : "disabled"} />
        </IconButton>
      </Paper>
    </>
  );
}
