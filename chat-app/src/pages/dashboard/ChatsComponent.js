import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import TextField from "@mui/material/TextField";
import { Archive, List, MagnifyingGlass } from "phosphor-react";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import styled from "@emotion/styled";
import { faker } from "@faker-js/faker";
import { ChatList } from "../../data";
import { SimpleBarStyle } from "../../components/Scrollbar";
import BasicTextFields from "../../components/Search/Search";
import ChatSection from "../../components/chats/ChatSection";
import {
  collection,
  query,
  where,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import ChatsAll from "./chatsAll";
import Communication from "../../components/Chat/communication";

const Chats = () => {
  const theme = useTheme();
  const [username, setUserName] = useState();
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [chats, setChats] = useState({});

  // paste here
  const { currentUser } = useContext(AuthContext);
  const { data, dispatch } = useContext(ChatContext);
  const [showCommunication, setshowCommunication] = useState(false);



  console.log(currentUser);

  //styledbadge

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  const Handleselect = async () => {
    //check whether the group exist(in firebase) ,if not then create
    const CombinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + "-" + user.uid
        : user.uid + "-" + currentUser.uid;
     
    console.log("CombinedId =>",CombinedId)
    try {
      const res = await getDoc(doc(db, "chats", CombinedId));

      if (!res.exists()) {
        //create chat in chats collection
        await setDoc(doc(db, "chats", CombinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [CombinedId + ".userinfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [CombinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [CombinedId + ".userinfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [CombinedId + ".date"]: serverTimestamp(),
        });
      }

      setUserName("");
      // setAlluser();
    } catch (error) {
      setErr(true);
    }
  };

  useEffect(() => {
    const getchatdata = () => {
      const getRes = onSnapshot(
        doc(db, "userChats", currentUser.uid),
        (doc) => {
          setChats(doc.data());
          setUser(null);
        }
      );

      return () => {
        getRes();
      };
    };
    currentUser.uid && getchatdata();
  }, [currentUser.uid]);

  const HandleClick = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <>
      <Box
        sx={{
          width: {
            xs: "100%",
            md: "50vw",
            lg:"400px"
          },
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
              <Stack direction={"column"} spacing={2} mt={2}>
                <Stack width={"100%"} direction={"column"} spacing={2}>
                  {user && (
                
                    <Stack
                      width={"100%"}
                      sx={{
                        cursor: "pointer",
                      }}
                      direction={"column"}
                      spacing={2}
                      onClick={Handleselect}
                    >
                      {/* used for testing purpose */}
                      <Typography variant="caption" color={"#676767"}>Add the user in your chatlist and start chatting</Typography>
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
                                {user.displayName}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Box>
                    </Stack>
                  )}

                  {user && <Divider />}

                  {chats && (
                    <Typography variant="caption" color={"#676767"} spacing={2}>
                      Chat List
                    </Typography>
                  )}

                  {chats &&
                    Object.entries(chats)
                      .sort((a, b) => b[1].date - a[1].date)
                      .map((chat) => {
                        //chatsection paste here
                        return (
                          <>
                            <Box
                              sx={{
                                backgroundColor:
                                  theme.palette.mode === "Light"
                                    ? "white"
                                    : theme.palette.background.paper,

                                // width: "100%",
                                height: "57px",
                                borderRadius: "20px",
                                cursor: "pointer",
                                m: "16px",
                              }}
                              key={chat[0]}
                              onClick={() => {
                                HandleClick(chat[1].userinfo);
                                setshowCommunication(!showCommunication);
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
                                  <Avatar
                                    alt="Remy Sharp"
                                    src={chat[1].userinfo.photoURL}
                                  />
                                  {/* )} */}
                                  <Stack direction={"column"}>
                                    <Typography variant="subtitle2">
                                      {chat[1].userinfo.displayName}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      noWrap
                                      sx={{
                                        width: "60%",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                      }}
                                    >
                                      {chat[1].LastMessage?.textData}
                                    </Typography>
                                  </Stack>
                                </Stack>
                                <Stack
                                  direction={"column"}
                                  alignItems={"center"}
                                  spacing={1.2}
                                  marginRight={"15px"}
                                >
                                  <Typography variant="caption">{}</Typography>
                                  <Badge color="primary"></Badge>
                                </Stack>
                              </Stack>
                            </Box>
                          </>
                        );
                      })}

                  <Divider />

                  <ChatsAll
                    chat={chats}
                    setChats={setChats}
                    user={user}
                    setuser={setUser}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <div className="communication">
          <Box
            sx={{
              height: "100%",
              width: {
                xs:"100%",
                sm:""
              },
              position:"fixed",
              top:0,
              right:0,
              zIndex:{
                xs:1
              },
              // backgroundColor: theme.palette.mode ==="light" ? "#F0F4FA" : theme.palette.background.paper
              display: { xs: showCommunication ? "block" : "none" },
            }}
          >
            <Communication  setshowCommunication={setshowCommunication}/>
          </Box>
        </div>
      </Box>
    </>
  );
};

export default Chats;
