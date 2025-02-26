import { Button, Box, Typography, Input } from "@mui/material";
import { PostAdd } from "@mui/icons-material";
import { useState } from "react";
import Dropzone from "react-dropzone";
import api from "../../api/axios";

export default function Admin() {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
    console.log(acceptedFiles);
    // upload file to backend
  };
  const handleUpload = () => {
    const formData = new FormData();
    formData.append('thumbnail', files[0]);
    formData.append('title', title);
    formData.append('likeNum', '0');
    api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    .then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    }
    );


  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <Box {...getRootProps()} sx={{ mt: 2, textAlign: "center" }}>
            <input {...getInputProps()} />
            <Button variant="contained" color="primary" size="large">
              Tải File
            </Button>
          </Box>
        )}
      </Dropzone>
      <Box
        sx={{
          // flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "500px",
          height: "400px",
        }}
      >
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed",
                borderColor: "primary.main",
                borderRadius: 2,
                p: 3,
                mt: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                cursor: "pointer",
                flex: 1,
              }}
            >
              <input {...getInputProps()} />
              <PostAdd fontSize="large" color="primary" />
              <Typography variant="body2" color="textSecondary">
                Hoặc kéo thả file vào đây
              </Typography>
            </Box>
          )}
        </Dropzone>
      </Box>
      <Input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <Button variant="outlined" onClick={handleUpload}>SEND</Button>
    </Box>
  );
}
