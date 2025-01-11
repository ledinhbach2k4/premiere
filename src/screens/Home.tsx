import { Box, Typography } from "@mui/material";
import Tabs from "../components/Tabs";
import Card from "@mui/material";

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
];
export default function Home() {
  return (
    <Box >
      <Typography variant="h3">Nổi bật</Typography>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {mockData.map((data, index) => (
          <Tabs key={index} heading={data.heading} body={data.body} />
        ))}
      </Box>
      <Box>
        <Typography variant="h3">Mới nhất</Typography>
        <Box sx={{ display: "flex", gap: 2}}>
          {mockData.map((data, index) => (
            <Tabs key={index} heading={data.heading} body={data.body} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
