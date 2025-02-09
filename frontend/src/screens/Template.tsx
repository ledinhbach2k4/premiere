import PreviewPanel from "../components/PreviewPanel";
import EditPanel from "../components/EditPanel";
import { Box, Paper, Typography, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { IVideo } from "../interface/type";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

export default function Template() {
  const { _id } = useParams<string>();
  const [vidData, setVidData] = useState<IVideo>();

  const safe_id = _id?.replace(":", ""); // xoá dấu : ở param _id

  const getvideoData = async (_id: string) => {
    try {
      const response = await axios.get("/api/getVidById", { params: { _id } });
      console.log(response.data.data);
      setVidData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch video data", error);
    }
  };

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (safe_id) {
      getvideoData(safe_id);
    }
  }, [safe_id]);

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
      >
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            marginRight: 2,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <PreviewPanel _id={vidData?._id} vidData={vidData} />
        </Paper>
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)", // Shadow for depth
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Panel
          </Typography>
          {/* need to adjust */}
          <EditPanel props={_id} setProps={vidData} />
        </Paper>
      </Box>
      <Typography align="center" variant="h3">
        {" "}
        View More Template{" "}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          if (user) return <Navigate to="/template" />;
        }}
      >
        XUẤT
      </Button>
    </>
  );
}
