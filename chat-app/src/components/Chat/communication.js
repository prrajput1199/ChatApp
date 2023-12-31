import {
  Box,
  Stack,
  useTheme,
} from "@mui/material";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Messages from "./messages";

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
        <Messages/>
      </Box>

      <Footer />
    </Stack>
  );
};

export default Communication;
