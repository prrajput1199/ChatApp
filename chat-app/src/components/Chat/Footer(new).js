import {
  Avatar,
  Box,
  Stack,
  Badge,
  Typography,
  IconButton,
  Divider,
  backdropClasses,
  InputAdornment,
  useTheme,
  Fab,
  Tooltip,
  FormControl,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useContext, useState } from "react";
import { faker } from "@faker-js/faker";
import styled from "@emotion/styled";
import {
  Camera,
  File,
  Image,
  LinkSimple,
  PaperPlaneTilt,
  Smiley,
  Sticker,
  User,
} from "phosphor-react";
import EmojiPicker from "emoji-picker-react";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ChatContext } from "../../contexts/ChatContext";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AuthContext } from "../../contexts/AuthContext";

export function BasicTextFields({ setOpenPicker, openPicker }) {
  const [textData, setTextData] = useState("");
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [clickActions, setClickActions] = useState(false);

  const theme = useTheme();
  const AddDocument = [
    {
      color: "#4da5fe",
      Icon: <Image size={24} />,
      Y: "102",
      title: "photo/video",
      onclick: () => {},
    },
    {
      color: "#4da5fe",
      Icon: <Sticker size={24} />,
      Y: "172",
      title: "Stickers",
    },
    {
      color: "#4da5fe",
      Icon: <Camera size={24} />,
      Y: "242",
      title: "image",
    },
    {
      color: "#4da5fe",
      Icon: <File size={24} />,
      Y: "312",
      title: "document",
    },
    {
      color: "#4da5fe",
      Icon: <User size={24} />,
      Y: "382",
      title: "contact",
    },
  ];

  const HandleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        "state_changed",
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                textData: textData,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else if (video) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, video);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                textData: textData,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                video: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          textData: textData,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".LastMessage"]: {
        textData,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".LastMessage"]: {
        textData,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setTextData("");
    setImg(null);
  };

  const HandleSendfiles = (e) => {
    if (
      e.target.files[0].type == "image/png" ||
      e.target.files[0].type == "image/jpeg"
    ) {
      setImg(e.target.files[0]);
    } else if (e.target.files[0].type == "video/mp4") {
      setVideo(e.target.files[0]);
    }
  };
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "90%", borderRadius: 2 },
        backgroundColor:
          theme.palette.mode === "Light"
            ? "white"
            : theme.palette.background.default,
      }}
      noValidate
      autoComplete="off"
      width={"100%"}
    >
      <FormControl>
        <Stack
          direction={"row"}
          width={"100%"}
          alignItems={"center"}
          spacing={5}
        >
          <TextField
            fullWidth
            onChange={(e) => setTextData(e.target.value)}
            value={textData}
            InputProps={{
              startAdornment: (
                <Stack sx={{ width: "max-content" }}>
                  {/* <Stack sx={{ position: "relative" }}>
                    {AddDocument.map((Element) => {
                      return (
                        <>
                          <Tooltip title={Element.title} placement="right">
                            <Fab
                              sx={{
                                position: "absolute",
                                top: -Element.Y,
                                backgroundColor: Element.color,

                                display: clickActions ? "inline-block" : "none",
                              }}
                            >
                              {Element.Icon}
                            </Fab>
                          </Tooltip>
                        </>
                      );
                    })}
                  </Stack> */}
                  <InputAdornment>
                    <Stack>
                      <input
                        type="file"
                        id="file"
                        onChange={(e) => {
                          console.log(e);
                          HandleSendfiles(e);
                        }}
                        src={img ? img : video}
                        // style={{
                        //   display: "none",
                        // }}
                      />
                      <label htmlFor="file">
                        <LinkSimple
                          // onClick={() => {
                          //   setClickActions((prev) => !prev);
                          // }}
                          size={25}
                        />
                      </label>
                 
                    </Stack>
                  </InputAdornment>
                </Stack>
              ),

              endAdornment: (
                <InputAdornment>
                  <IconButton
                    onClick={() => {
                      openPicker ? setOpenPicker(false) : setOpenPicker(true);
                    }}
                  >
                    <Smiley />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              borderRadius: 1.5,
              height: "100%",
              width: "5%",
            }}
          >
            <Stack
              width={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{
                backgroundColor:
                  theme.palette.mode === "Light"
                    ? theme.palette.background.paper
                    : theme.palette.background.paper,
              }}
            >
              <IconButton onClick={HandleSend}>
                <PaperPlaneTilt
                  color={theme.palette.mode === "light" ? "black" : "white"}
                />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
      </FormControl>
    </Box>
  );
}

const Footer_New = () => {
  const [openPicker, setOpenPicker] = useState(false);
  const theme = useTheme();
  return (
    <>
      <Stack width={"100%"}>
        <Box
          sx={{
            position: "fixed",
            bottom: "90px",
            right: "95px",
            zIndex: "10",
            display: openPicker ? "inline" : "none",
            backgroundColor:
              theme.palette.mode === "Light"
                ? "white"
                : theme.palette.background.default,
          }}
        >
          <EmojiPicker
            Theme={theme.palette.mode}
            setOpenPicker={setOpenPicker}
            openPicker={openPicker}
          />
        </Box>
        <BasicTextFields />
      </Stack>
    </>
  );
};

export default Footer_New;
