import { useTheme } from "@emotion/react";
import {
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import BasicTextFields from "../../components/Search/Search";
import { Plus } from "phosphor-react";
import { ChatList } from "../../data";
import ChatSection from "../../components/chats/ChatSection";
import Communication from "../../components/Chat/communication";

const Group = () => {
  const theme = useTheme();
 
  return (
    <>
      <Stack direction={"row"} width={"100%"}>
        {/* left */}
        <Box
          sx={{
            height: "100vh",
            overflowX:"hidden",
            overflowY:"scroll",
            width: "400px",
            boxShadow: "0 0 2px rgba(0,0,0,0.25)",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
          }}
        >
          <Stack p={3} spacing={2} direction={"column"} overflowY={"scroll"}>
            <Typography variant="h5">Groups</Typography>
            <BasicTextFields />
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="subtitle2" component={Link}>
                Create new Group
              </Typography>
              <IconButton
                sx={{
                  color: theme.palette.primary.main,
                }}
              >
                <Plus />
              </IconButton>
            </Stack>
            <Divider />
            <Stack
              sx={{
                height: "100%",
                flexGrow: "1",
                width: "100%",
              }}
              spacing={1}
              direction={"column"}
            >
              <Stack direction={"column"} spacing={2}>
                <Typography variant="caption" color={"#676767"}>
                  Pinned
                </Typography>
                <Stack width={"100%"} direction={"column"} spacing={2}>
                  {ChatList.filter((Element) => {
                    return Element.pinned;
                  }).map((Element) => {
                    return <ChatSection {...Element} />;
                  })}
                </Stack>
              </Stack>

              <Stack direction={"column"} spacing={2} mt={2}>
                <Typography variant="caption" color={"#676767"} spacing={2}>
                  All Chats
                </Typography>
                <Stack width={"100%"} direction={"column"} spacing={2}>
                  {ChatList.filter((Element) => {
                    return !Element.pinned;
                  }).map((Element) => {
                    return <ChatSection {...Element} />;
                  })}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Box
          sx={{
            height: "100%",
            width:"100%",
            backgroundColor: theme.palette.mode ==="light" ? "#F0F4FA" : theme.palette.background.paper
          }}
        >
          <Communication/>
        </Box>
      </Stack>
    </>
  );
};

export default Group;
