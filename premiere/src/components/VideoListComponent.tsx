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
import Background from "./Background";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<string>("Nổi bật");
  const [videoData, setVideoData] = useState([]);
  const [numberOfVid, setNumberOfVid] = useState(9); // use for load more video
  const [tagsData, setTagsData] = useState([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const fetchTemplates = async () => {
    try {
      // Fetch tags
      const tagsResponse = await axios.get(`/api/getAllTags`);
      setTagsData(tagsResponse.data.data);

      // Fetch videos based on selected tab and tags
      const params: any = { index: numberOfVid };
      if (selectedTags.length > 0) {
        params.tags = selectedTags;
      }

      let videosResponse;
      
      if (selectedTab === "Nổi bật") {
        videosResponse = await axios.get(`/api/get9VidSortByLiked`, { params });
      } else if (selectedTab === "Mới nhất") {
        videosResponse = await axios.get(`/api/getNext10Vid`, { params });
      }

      setVideoData(videosResponse?.data.data || []);

    } catch (error) {
      console.error("Error fetching templates:", error);
      setVideoData([]); // Reset video data on error
    }
  };

  // fetch video template if there was changes
  useEffect(() => {
    fetchTemplates(); // Load video template
  }, [selectedTab, numberOfVid, selectedTags]);

  const handleClick = (_id: string) => {
    if (selectedTags?.includes(_id)) {
      setSelectedTags(selectedTags.filter((t: string) => t !== _id)); // bỏ tag khỏi danh sách
    } else {
      setSelectedTags([...selectedTags, _id]); // thêm tag vào danh sách
    }
  };

  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
        <Paper
          sx={{
            p: 3,
            transition: "box-shadow 0.3s ease-in-out",
            "&:hover": {
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", // Add shadow on hover
            },
          }}
        >
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
              sx={{
                "& .MuiTab-root": {
                  transition: "color 0.3s ease-in-out, transform 0.3s ease-in-out",
                  "&:hover": {
                    color: "primary.dark", // Change color on hover
                    transform: "scale(1.1)", // Slightly scale up on hover
                  },
                },
              }}
            >
              <Tab value="Nổi bật" label="Nổi bật" />
              <Tab value="Mới nhất" label="Mới nhất" />
            </Tabs>

            <Stack direction="row" spacing={1}>
              {tagsData.length > 0
                ? tagsData.map((tag: { _id: string; tagName: string }) => (
                    <Chip
                      key={tag._id}
                      label={tag.tagName}
                      onClick={() => handleClick(tag._id)}
                      variant={
                        selectedTags?.includes(tag._id) ? "outlined" : "filled"
                      }
                      sx={{
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          backgroundColor: "primary.light", // Change background color on hover
                          color: "white", // Change text color on hover
                          transform: "scale(1.1)", // Slightly scale up on hover
                        },
                      }}
                    />
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
                  <Box
                    key={data._id}
                    sx={{
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)", // Slightly scale up on hover
                      },
                    }}
                  >
                    <Preview key={data._id} data={data} />
                  </Box>
                )
              )
            ) : (
              <Typography variant="h6" color="text.secondary">
                No videos available.
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() => setNumberOfVid(numberOfVid + 9)}
              sx={{
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                  transform: "scale(1.05)", // Slightly scale up on hover
                },
                transition: "all 0.3s ease-in-out",
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