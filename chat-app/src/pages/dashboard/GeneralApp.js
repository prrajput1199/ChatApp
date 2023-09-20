import React from "react";
import { Box, Stack } from "@mui/material";
import DashboardLayout from "../../layouts/dashboard";
import Chats from "./ChatsComponent.js";
import Communication from "../../components/Chat/communication";


const GeneralApp = () => {
  return (
    <Stack direction={"row"}>
      <Chats/>
      <Box
        sx={{
          height: "100%",
          width: "calc(100vw)",
          // backgroundColor:"black"
        }}
      >
     <Communication/>
      </Box>
    </Stack>
  );
};

export default GeneralApp;
