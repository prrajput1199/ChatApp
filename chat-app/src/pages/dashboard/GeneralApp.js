import React, { useContext, useState } from "react";
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
import chatapp from "../../Images/chatapp.jpeg";
import "./GeneralApp.css";

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar } = useSelector((store) => store.app);
  const { data } = useContext(ChatContext);
  const [userData, setUserData] = useState(null);
  const [showChats, setShowChats] = useState(false);

  return (
    <Stack
      width={"100%"}
      height={"100vh"}
      sx={{
        overflowY: "hidden",
      }}
    >
      <Stack
        sx={{
          height: "100%",
        }}
        direction={"row"}
      >
        {/* 1st section */}

        <Chats
          userData={userData}
          setUserData={setUserData}
          showChats={showChats}
          setShowChats={setShowChats}
        />

        {/* 2nd section */}
        {showChats ? (
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
        ) : (
          <Stack
            sx={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <img
              src={chatapp}
              alt=""
              style={{
                width: "400px",
                height: "auto",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </Stack>
        )}

        {/* last section */}
        {sidebar.open &&
          (() => {
            switch (sidebar.type) {
              case "CONTACT":
                return <Contact userData={userData} setUserData={setUserData} />;

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
