import React from "react";
import { Box, Stack } from "@mui/material";
import DashboardLayout from "../../layouts/dashboard";
import Chats from "./ChatsComponent.js";
import Communication from "../../components/Chat/communication";
import { useTheme } from "@emotion/react";
import Contact from "../../components/settings/contact";

const GeneralApp = () => {
  const theme = useTheme();
  return (
    <Stack width={"100%"} height={"100%"}>
      <Stack direction={"row"} width={"100%"}>
        <Chats />
        <Box
          sx={{
            height: "100%",
            width: "80%",
            backgroundColor: theme.palette.mode ==="light" ? "#F0F4FA" : theme.palette.background.paper
          }}
        >
          <Communication/>
        </Box>
        <Contact/>
      </Stack>
    </Stack>
  );
};

export default GeneralApp;
