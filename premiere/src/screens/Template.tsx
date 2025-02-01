import PreviewPanel from "../components/PreviewPanel";
import EditPanel from "../components/EditPanel";
import { Box, Paper } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Template() {
  const { _id } = useParams<string>(); // id có thể là undefine nhưng không biết sửa sao cho hết đỏ

  const safe_id = _id?.replace(":", ""); // xoá dấu : ở param _id

  const [vidProps, setVidProps] = useState<{}>({});

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Paper >
          <PreviewPanel _id={safe_id} vidProps={vidProps} />
        </Paper>
        <Paper>
          <EditPanel props={_id} setProps={setVidProps} />
        </Paper>
      </Box>
    </>
  );
}
