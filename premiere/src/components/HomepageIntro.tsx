import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Paper,
  Chip,
  Stack,
} from "@mui/material";
import VideoListComponent from "../components/VideoListComponent";

export default function Home() {
  // Dummy data for YouTubers list
  const youtubers = [
    { name: "YouTuber 1", image: "https://yt3.googleusercontent.com/fNJvy_Nxdo0O2nzV_Ubd2x2HP30FUexMxWwIWnGKQTSuy5r7nRMSfl8fC-m0dK6TANdkZRnXug=s160-c-k-c0x00ffffff-no-rj" },
    { name: "YouTuber 2", image: "https://yt3.googleusercontent.com/fNJvy_Nxdo0O2nzV_Ubd2x2HP30FUexMxWwIWnGKQTSuy5r7nRMSfl8fC-m0dK6TANdkZRnXug=s160-c-k-c0x00ffffff-no-rj" },
    { name: "YouTuber 3", image: "https://yt3.googleusercontent.com/fNJvy_Nxdo0O2nzV_Ubd2x2HP30FUexMxWwIWnGKQTSuy5r7nRMSfl8fC-m0dK6TANdkZRnXug=s160-c-k-c0x00ffffff-no-rj" },
    { name: "YouTuber 4", image: "https://yt3.googleusercontent.com/fNJvy_Nxdo0O2nzV_Ubd2x2HP30FUexMxWwIWnGKQTSuy5r7nRMSfl8fC-m0dK6TANdkZRnXug=s160-c-k-c0x00ffffff-no-rj" },
    { name: "YouTuber 5", image: "https://yt3.googleusercontent.com/fNJvy_Nxdo0O2nzV_Ubd2x2HP30FUexMxWwIWnGKQTSuy5r7nRMSfl8fC-m0dK6TANdkZRnXug=s160-c-k-c0x00ffffff-no-rj" },
  ];

  return (
    <>
      <Box sx={{ textAlign: "center", my: 4 }}>
        {/* Banner */}
        <Box
          sx={{
            position: "relative",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
            mb: 4,
            overflow: "hidden",
            opacity: "0.4",
            '&:hover': {
              opacity: 1,
              transition: 'opacity 0.5s ease-in-out',
            },
          }}
        >
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src="/1200X400.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
        

        <Box
          sx={{
            position: "relative",
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
            mb: 4,
            overflow: "hidden",
            '&:hover': {
              transform: 'scale(1.02)',
              transition: 'transform 0.3s ease-in-out',
            },
          }}
        >

          {/* Text Content */}
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              zIndex: 1,
              '&:hover': {
                color: '#FFD700',
                transition: 'color 0.3s ease-in-out',
              },
            }}
          >
            Easily Enhance Your Editing
          </Typography>
        </Box>

        

        {/* List of YouTubers */}
        <Box sx={{ overflowX: "auto", whiteSpace: "nowrap", py: 2 }}>
          <Stack direction="row" spacing={2}>
            {youtubers.map((youtuber, index) => (
              <Chip
                key={index}
                avatar={<img src={youtuber.image} alt={youtuber.name} />}
                label={youtuber.name}
                variant="outlined"
                sx={{ 
                  px: 2, 
                  py: 3, 
                  fontSize: "1.2rem",
                  '&:hover': {
                    backgroundColor: '#FFD700',
                    color: '#000',
                    transform: 'scale(1.1)',
                    transition: 'all 0.3s ease-in-out',
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
}