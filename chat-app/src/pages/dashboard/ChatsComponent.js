import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import TextField from "@mui/material/TextField";
import { Archive, MagnifyingGlass } from "phosphor-react";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import styled from "@emotion/styled";
import { faker } from "@faker-js/faker";
import { ChatList } from "../../data";
import { SimpleBarStyle } from "../../components/Scrollbar";
import BasicTextFields from "../../components/Search/Search";
import ChatSection from "../../components/chats/ChatSection";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Chats = () => {
  const theme = useTheme();
  const [username, setUserName] = useState();
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  return (
    <>
      <Box
        sx={{
          width: "400px",
          height: "100vh",
          overflowX: "hidden",
          overflowY: "scroll",
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          px: "15px",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background,
        }}
      >
        <Stack sx={{ height: "100%", width: "100%" }}>
          <Stack padding={3}>
            <Typography variant="h5">Chats</Typography>
          </Stack>
          <Stack spacing={3} overflowX={"hidden"}>
            <BasicTextFields
              username={username}
              err={err}
              user={user}
              setUser={setUser}
              setUserName={setUserName}
              setErr={setErr}
            />
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
              <Archive size={24} />
              <Button>Archives</Button>
            </Stack>
            <Divider />
            <Stack
              sx={{ height: "100%", width: "100%", flexGrow: 1 }}
              spacing={1}
              direction={"column"}
            >
              {/* <Stack direction={"column"} spacing={2}>
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
              </Stack> */}

              <Stack direction={"column"} spacing={2} mt={2}>
                <Typography variant="caption" color={"#676767"} spacing={2}>
                  All Chats
                </Typography>

                <Stack width={"100%"} direction={"column"} spacing={2}>
                  {user && (
                    <Stack width={"100%"} direction={"column"} spacing={2}>
                      {/* used for testing purpose */}
                      <Box
                        sx={{
                          backgroundColor:
                            theme.palette.mode === "Light"
                              ? "white"
                              : theme.palette.background.paper,

                          // width: "100%",
                          height: "57px",
                          borderRadius: "20px",
                        }}
                      >
                        <Stack
                          direction={"row"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          marginTop={"6px"}
                          width={"100%"}
                        >
                          <Stack
                            direction={"row"}
                            width={"80%"}
                            alignItems={"center"}
                            spacing={2}
                            marginTop={"2px"}
                          >
                            <Avatar alt="Remy Sharp" src={user.photoURL} />

                            <Stack direction={"column"}>
                              <Typography variant="subtitle2">
                                {user.name}
                              </Typography>
                              {/* <Typography
                            variant="caption"
                            noWrap
                            sx={{
                              width: "60%",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {msg}
                          </Typography> */}
                            </Stack>
                          </Stack>
                          {/* <Stack
                        direction={"column"}
                        alignItems={"center"}
                        spacing={1.2}
                        marginRight={"15px"}
                      >
                        <Typography variant="caption">{time}</Typography>
                        <Badge color="primary" badgeContent={unread}></Badge>
                      </Stack> */}
                        </Stack>
                      </Box>
                    </Stack>
                  )}
                  {ChatList.filter((Element) => {
                    return !Element.pinned;
                  }).map((Element) => {
                    return <ChatSection {...Element} />;
                  })}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        {/* right */}
        <Stack></Stack>
      </Box>
    </>
  );
};

export default Chats;
