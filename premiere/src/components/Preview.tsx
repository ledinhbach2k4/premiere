import React from "react";
import { Paper, Skeleton, Typography, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Preview(props: { key: string, data: { _id: string, title: string, url: string, tags: [string]} }) {

  const [liked, setLiked] = useState(false);
  const toggleLike = () => {
    setLiked(!liked); // Toggle like state
  };

  //define the vid model
  const { _id, title, url, tags } = props.data;

  const navigate = useNavigate();
  return (
    <>
      
      <Paper
        sx={{
          width: 300,
          height: 268.75,
          p: 2,
          m: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          position: "relative",
          overflow: "hidden", // Ensures content doesn't overflow
        }}
        onClick={() => {
          navigate(`/template/:${ _id }`);
        }}
      >
        
        <Skeleton variant="rectangular" height={"100%"} />
        <img 
        src={`/vidPreview/${_id}.gif`} 
        alt={title} 
        style={{ 
          width: '300px', 
          height: '170px',
          objectFit: 'cover', 
        }} 
      />
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{tags}</Typography>
        <IconButton
          onClick={toggleLike}
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            opacity: liked ? 1 : 0.5,
            transition: "opacity 0.3s ease",
          }}
        >
          <FavoriteIcon color={liked ? "error" : "disabled"} />
        </IconButton>
      </Paper>
    </>
  );
}
