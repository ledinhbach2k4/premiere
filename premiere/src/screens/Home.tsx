import {
  Box,
  Typography,
  Tabs,
  Tab,
  Chip,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import Preview from "../components/Preview";
import Card from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add"; // "+" icon
import { Navigate } from "react-router-dom";

const mockData = [
  {
    heading: "Heading 1",
    body: "Body 1",
  },
  {
    heading: "Heading 2",
    body: "Body 2",
  },
  {
    heading: "Heading 3",
    body: "Body 3",
  },
  {
    heading: "Heading 4",
    body: "Body 4",
  },
  {
    heading: "Heading 5",
    body: "Body 5",
  },
  {
    heading: "Heading 6",
    body: "Body 6",
  },
  {
    heading: "Heading 7",
    body: "Body 7",
  },
  {
    heading: "Heading 8",
    body: "Body 8",
  },
  {
    heading: "Heading 9",
    body: "Body 9",
  },
  {
    heading: "Heading 10",
    body: "Body 10",
  },
];
export default function Home() {
  const [value, setValue] = useState(0);
  const [selectedTab, setSelectedTab] = useState("Nổi bật");
  const [chips, setChips] = useState(["Deletable 1", "Deletable 2"]);

  const handleDelete = (chipToDelete) => {
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
          onChange={(e, newValue) => {
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
        onClick={() => Navigate("/product")}
      >
        {mockData.map((data, index) => (
          <Preview key={index} heading={data.heading} body={data.body} />
        ))}
      </Box>
    </Box>
  );
}
