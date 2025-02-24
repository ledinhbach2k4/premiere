import { Button, Box, Typography } from "@mui/material";
import { PostAdd } from "@mui/icons-material";
import { useState } from "react";
import Dropzone from "react-dropzone";
export default function Admin() {
  const [files, setFiles] = useState([]);
  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
    console.log(acceptedFiles);
    // upload file to backend

  };
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: "500px",
          minHeight: "400px",
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
    </Box>
  );
}
