import React from "react";
import { Box, Stack } from "@mui/material";
import DashboardLayout from "../../layouts/dashboard";
import Chats from "./ChatsComponent.js";
import Communication from "../../components/Chat/communication";
import { useTheme } from "@emotion/react";


const GeneralApp = () => {
  const theme=useTheme();
  return (
    <Stack direction={"row"}>
      <Chats/>
      {/* <Box
        sx={{
          height: "100%",
          width: "calc(100vw)",
          // backgroundColor: theme.pallete.mode == "light" ? "white" : theme.pallete.background.default,
        }}
      >
     <Communication/>
      </Box> */}
    </Stack>
  );
};

export default GeneralApp;
