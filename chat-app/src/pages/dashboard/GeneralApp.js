import React, { useContext } from "react";
import { Box, Stack } from "@mui/material";
import DashboardLayout from "../../layouts/dashboard";
import Chats from "./ChatsComponent.js";
import Communication from "../../components/Chat/communication";
import { useTheme } from "@emotion/react";
import Contact from "../../components/settings/contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/settings/SharedMessages.js";
import StarredMessages from "../../components/settings/StarredMessage.js";
import { Outlet } from "react-router-dom";
import { ChatContext } from "../../contexts/ChatContext";
const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar } = useSelector((store) => store.app);
  const { data } = useContext(ChatContext);
  return (
    <Stack
      width={"100%"}
      height={"100vh"}
      sx={{
        overflowY: "hidden",
      }}
    >
      <Stack sx={{
        height:"100%"
      }}
      direction={"row"}
      >
        {/* 1st section */}

        <Chats />

        {/* 2nd section */}
        <Box
          sx={{
            height: "100%",
            width: sidebar.open ? "80%" : "100%",
            // backgroundColor: theme.palette.mode ==="light" ? "#F0F4FA" : theme.palette.background.paper
            display: { xs: "none", md: "block" },
          }}
        >
          <Communication />
        </Box>

        {/* last section */}
        {sidebar.open &&
          (() => {
            switch (sidebar.type) {
              case "CONTACT":
                return <Contact />;

              case "SHARED":
                return <SharedMessages />;

              case "STARRED":
                return <StarredMessages />;

              default:
                break;
            }
          })()}
      </Stack>
    </Stack>
  );
};

export default GeneralApp;
