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
import HomepageIntro from "../components/HomepageIntro";

export default function Home() {
 

  return (
    <>
      
      <HomepageIntro />
      <VideoListComponent />
    </>
  );
}
