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
import { ChatAllContext } from "../../contexts/ChatAllcontext";


const ChatsAll = ({setChats,chats,user,setUser}) => {
    const [allUser, setAlluser] = useState(null);
    const {Alldata,dispatch} = useContext(ChatAllContext);
    const {currentUser}=useContext(AuthContext);
    const [err, setErr] = useState(false);
    const [chatAlls, setAllChats] = useState({});
    const [list, setList] = useState(null);
    const theme=useTheme();

    const Handleselect = async () => {
        //check whether the group exist(in firebase) ,if not then create
        const q = query(collection(db, "users"), where("displayName", "==", allUser.name));

        const querySnapshot = await getDocs(q);
    
        try {
          querySnapshot.forEach((doc) => {
            setUser(doc.data());
          });
        } catch (error) {
          setErr(true);
        }

        const CombinedId =
          currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid;
    
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
    
        const getalluser = async () => {
          const querySnapshot = await getDocs(collection(db, "users"));
          const userdata = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            userdata.push({ ...doc.data() });
          });
       
          console.log("alluser", "=>", allUser);
        };
        return () => {
          getalluser();
        };
      }, [currentUser.uid]);
    
      const HandleClick = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
      };
    
  return (
    <div>
        <Typography variant="caption" color={"#676767"} spacing={3}>
                    Select a person
                  </Typography>

                  {allUser &&
                    allUser.map((user) => {
                      //chatsection paste here
                      return (
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
                          }}
                          key={user.uid}
                          onClick={Handleselect}

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
                              {/* {online ? (
                              <StyledBadge
                                overlap="circular"
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "right",
                                }}
                                variant="dot"
                                sx={{ marginLeft: "0px" }}
                              >
                                <Avatar
                                  alt="Remy Sharp"
                                  src={faker.image.avatar()}
                                />
                              </StyledBadge>
                            ) : ( */}
                              <Avatar alt="Remy Sharp" src={user.photoURL} />
                              {/* )} */}
                              <Stack direction={"column"}>
                                <Typography variant="subtitle2">
                                  {user.displayName}
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
                              <Badge
                                color="primary"
                                // badgeContent={}
                              ></Badge>
                            </Stack>
                          </Stack>
                        </Box>
                      );
                    })}

    </div>
  )
}

export default ChatsAll;
