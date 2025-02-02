import { Box, Typography, Tabs, Tab, Button } from "@mui/material";
import Preview from "../components/Preview";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<string>("Nổi bật");
  const [mockData, setMockData] = useState([]);
  const [numberOfVid, setNumberOfVid] = useState(9); // will use to set number of index for load more function
  const navigate = useNavigate();

  // Fetch videos from the database
  const fetchTemplates = async () => {
    try {
      const response = await axios.get(
        selectedTab === "Nổi bật"
          ? `/api/getNext10Vid?index=${numberOfVid}`
          : `/api/get9VidSortByLiked?index=${numberOfVid}`
      );
      setMockData(response.data.result || response.data.data || []);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  // Get next 9 videos from backend
  useEffect(() => {
    fetchTemplates(); // Load video template
  }, [selectedTab, numberOfVid]);

  return (
    <Box sx={{ p: 3, minHeight: "100vh" }}>
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
          sx={{ bgcolor: "white", borderRadius: 1, boxShadow: 1 }}
        >
          <Tab value="Nổi bật" label="Nổi bật" />
          <Tab value="Mới nhất" label="Mới nhất" />
        </Tabs>
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
        {mockData.length > 0 ? (
          mockData.map(
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
    </Box>
  );
}
