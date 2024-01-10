import React from "react";
import { Box, Stack } from "@mui/material";
import DashboardLayout from "../../layouts/dashboard";
import Chats from "./ChatsComponent.js";
import Communication from "../../components/Chat/communication";
import { useTheme } from "@emotion/react";
import Contact from "../../components/settings/contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/settings/SharedMessages.js";
import StarredMessages from "../../components/settings/StarredMessage.js";

const GeneralApp = () => {
  const theme = useTheme();
  const {sidebar}=useSelector((store)=>store.app);
  return (
    <Stack width={"100%"} height={"100%"} sx={{
      overflowY:"hidden"
    }}>
      <Stack direction={"row"} width={"100%"}>
        {/* 1st section */}
        <Chats />
        
        {/* 2nd section */}
        <Box
          sx={{
            height: "100%",
            width: sidebar.open ? "80%":"100%",
            backgroundColor: theme.palette.mode ==="light" ? "#F0F4FA" : theme.palette.background.paper
          }}
        >
          <Communication/>
        </Box>

        {/* last section */}
        {sidebar.open && (()=>{
             switch (sidebar.type) {
              case "CONTACT":
                return <Contact/>;
          
              case "SHARED":
                return <SharedMessages/>;

              case "STARRED":
                return <StarredMessages/>
                
              default:
                break;
             }
        })()}
        {/* {sidebar.open && <Contact/>} */}
      </Stack>
    </Stack>
  );
};

export default GeneralApp;
