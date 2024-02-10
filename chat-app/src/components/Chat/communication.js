import {
  Box,
  Stack,
  useTheme,
} from "@mui/material";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Messages from "./messages";
import Footer_New from "./Footer(new)";

const Communication = () => {
  const theme = useTheme();

  console.log(theme);

  return (
    <Stack
      height={"100%"}
      maxHeight={"100vh"}
      // width={"100%"}
      justifyContent={"space-between"}
    >
      <Header/>

      <Box sx={{ width: "100%", flexFlow: "8px", height:"100%" , overflowY:"scroll"}}>
        <Messages Menu={true}/>
      </Box>


      <Footer_New />
    </Stack>
  );
};

export default Communication;
