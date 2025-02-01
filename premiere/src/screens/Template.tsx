
import PreviewPanel from "../components/PreviewPanel";
import EditPanel from "../components/EditPanel";
import { Box } from "@mui/material";
import { useState } from "react";
import { useParams } from 'react-router-dom';

export default function Template() {

  const { _id } = useParams<string>(); // id có thể là undefine nhưng không biết sửa sao cho hết đỏ

  const safe_id = _id?.replace(":",""); // xoá dấu : ở _id

  const [vidProps, setVidProps] = useState< {} >({});


  return (
    <>
    <Box sx={{display: 'flex', justifyContent: 'space-between'}} >
      <PreviewPanel _id = { safe_id }  vidProps = { vidProps }/>
      {/* <EditPanel props={ _id } setProps={ setVidProps }/> */}
    </Box>
    </>
  );
}
