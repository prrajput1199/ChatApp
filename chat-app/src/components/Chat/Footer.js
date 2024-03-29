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
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ChatContext } from "../../contexts/ChatContext";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AuthContext } from "../../contexts/AuthContext";

const Footer = () => {
  const theme = useTheme();
  const [openPicker, setOpenPicker] = useState(false);
  const [textData, setTextData] = useState("");
  const [img, setImg] = useState(null);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const HandleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid);

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
  };

  const AddDocument = [
    {
      color: "#4da5fe",
      Icon: <Image size={24} />,
      Y: "102",
      title: "photo/video",
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

  // const StyledInput = styled(TextField)(({ theme }) => ({
  //   "& .MuiInputBase-input": {
  //     paddingTop: "12px",
  //     paddingBottom: "12px",
  //   },
  // }));

  const ChatInput = ({ setOpenPicker, textData, setTextData }) => {
    // const [clickActions, setClickActions] = useState(false);

    const handleChange = (e) => {
      setTextData(e.target.value);
    };
    return (
      <>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          placeholder="Write a message"
          // onChange={handleChange}
          // Value={textData}
          InputProps={{
            // disableUnderline: "true",

            startAdornment: (
              <Stack sx={{ width: "max-content" }}>
                <Stack sx={{ position: "relative" }}>
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
                </Stack>
                <InputAdornment>
                  <IconButton>
                    <input
                      type="file"
                      style={{
                        display: "none",
                      }}
                      id="file"
                    >
                      <LinkSimple
                        onClick={() => {
                          setClickActions((prev) => !prev);
                        }}
                      />
                    </input>
                  </IconButton>
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
      </>
    );
  };

  return (
    <div>
      <Box
        p={2}
        sx={{
          height: "100px",
          width: "100%",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        }}
        component="form"
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={2}
        >
          <Stack width={"100%"}>
            <Box
              sx={{
                position: "fixed",
                bottom: "90px",
                right: "95px",
                zIndex: "10",
                display: openPicker ? "inline" : "none",
              }}
            >
              <EmojiPicker Theme={theme.palette.mode} />
            </Box>
            <ChatInput />
          </Stack>

          <Stack>
            <Box
              sx={{
                borderRadius: 1.5,
                height: "100%",
                width: "100%",
              }}
            >
              <Stack
                width={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? theme.palette.primary.main
                      : theme.palette.background.paper,
                }}
              >
                <IconButton onClick={HandleSend}>
                  <PaperPlaneTilt color="white" />
                </IconButton>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default Footer;
