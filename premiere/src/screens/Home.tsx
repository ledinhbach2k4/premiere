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
import Preview from "../components/Preview";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
  const [selectedTab, setSelectedTab] = useState<string>("Nổi bật");
  const [videoData, setVideoData] = useState([]);
  const [numberOfVid, setNumberOfVid] = useState(9); // use for load more video
  const [tagsData, setTagsData] = useState([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);


  // Fetch videos from the database
  const fetchTemplates = async () => {
    //tab handle
    try {
      if (selectedTab === "Nổi bật") {
        const response = await axios.get(
          `/api/getNext10Vid?index=${numberOfVid}`
        );
        setVideoData(response.data.result || []);
      } else if (selectedTab === "Mới Nhất") {
        const response = await axios.get(
          `/api/get9VidSortByLiked?index=${numberOfVid}`
        );
        setVideoData(response.data.result || []);
      }

      // Chip handle  ( filter )
      const response = await axios.get(`/api/getAllTags`);
      setTagsData(response.data.data);
      console.log(selectedTags);

      
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  // Get next 9 videos from backend
  useEffect(() => {
    fetchTemplates(); // Load video template
  }, [selectedTab, numberOfVid, selectedTags]);

  const handleClick = (tagName: string) => {
    if (selectedTags?.includes(tagName)) {
      setSelectedTags(selectedTags.filter( (t: string) => t !== tagName));
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }


  };

  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" align="center" sx={{ mb: 3 }}>
            View All Video Template
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Tabs
              value={selectedTab}
              onChange={(_e, newValue) => {
                setSelectedTab(newValue);
                setNumberOfVid(9); // Reset index when changing tabs
              }}
              centered
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab value="Nổi bật" label="Nổi bật" />
              <Tab value="Mới nhất" label="Mới nhất" />
            </Tabs>

            <Stack direction="row" spacing={1}>
              {tagsData.length > 0
                ? tagsData.map((tag: { _id: string; tagName: string }) => (
                    <>
                      <Chip
                        key={tag._id}
                        label={tag.tagName}
                        onClick={() => handleClick(tag.tagName)}
                        variant={
                          selectedTags?.includes(tag.tagName)
                            ? "outlined"
                            : "filled"
                        } // Change variant based on selection
                      />
                      
                    </>
                  ))
                : null}
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexWrap: "wrap",
              justifyContent: "center",
              mb: 2,
            }}
          >
            {videoData.length > 0 ? (
              videoData.map(
                (data: {
                  _id: string;
                  title: string;
                  url: string;
                  tags: [string];
                }) => (
                  <Preview key={data._id} data={data} /> // Use data._id as the unique key
                )
              )
            ) : (
              <Typography variant="h6" color="text.secondary">
                No videos available.
              </Typography> // Message when no videos are available
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Center the button horizontally
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() => setNumberOfVid(numberOfVid + 9)} // Add the click handler to load more videos
              sx={{
                bgcolor: "primary.main",
                color: "white",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
                borderRadius: 2,
                padding: "10px 20px",
              }}
            >
              Load More
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
