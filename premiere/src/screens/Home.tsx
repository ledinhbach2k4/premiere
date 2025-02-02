import {
  Box,
  Typography,
  Tabs,
  Tab,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import Preview from "../components/Preview";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add"; // "+" icon
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("Nổi bật");
  const [chips, setChips] = useState(["Deletable 1", "Deletable 2"]);
  const [mockData, setMockData] = useState([]);
  const [numberOfVid, setNumberOfVid] = useState(0); // will use to set number of index for loadmore function
  const navigate = useNavigate();


  // get 9 video from database
  const fetchTemplates = async () => {
    try {
      const response = await axios.get(`/api/getNext10Vid?index=${numberOfVid}`);
      setMockData(response.data.result || []);
      /**
       *  append next 9 video
       *  to do
       */

    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  // Get next 9 videos from backend
  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleDelete = (chipToDelete: string) => {
    setChips((chips) => chips.filter((chip) => chip != chipToDelete));
  };
  const handleAddChip = () => {
    if (chips.length >= 5) return;
    setChips((chips) => [...chips, `Deletable ${chips.length + 1}`]); // Add new chip
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          gap: 3,
          px: 13,
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={(_e, newValue) => {
            setSelectedTab(newValue);
          }}
          centered
          textColor="primary"
          indicatorColor="primary"
          sx={{ mb: 3 }}
        >
          <Tab value="Nổi bật" label="Nổi bật" />
          <Tab value="Mới nhất" label="Mới nhất" />
        </Tabs>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={1}>
            {chips.map((chip, index) => (
              <Chip
                key={index}
                label={chip}
                onDelete={() => handleDelete(chip)}
              />
            ))}
          </Stack>
          <IconButton onClick={handleAddChip}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {mockData.length > 0 ? (
          mockData.map((data: { _id: string, title: string, url: string, tags: [string]}) => (
            <Preview key={ data._id } data={ data } /> // Use data._id as the unique key
          ))
        ) : (
          <Typography>No videos available.</Typography> // Message when no videos are available
        )}
      </Box>
    </Box>
  );
}
