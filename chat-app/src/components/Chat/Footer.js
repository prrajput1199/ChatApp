import {
  Avatar,
  Box,
  Stack,
  Badge,
  Typography,
  IconButton,
  Divider,
  TextField,
  backdropClasses,
  InputAdornment,
  useTheme,
  Fab,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
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

const Footer = () => {
  const theme = useTheme();
  const [openPicker, setOpenPicker] = useState(false);

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

  const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBased-input": {
      paddingTop: "12px",
      paddingBottom: "12px",
    },
  }));

  const ChatInput = ({ setOpenPicker }) => {
    const [clickActions , setClickActions]=useState(false);

    return (
      <>
        <StyledInput
          fullWidth
          placeholder="Write a message"
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
                              display: clickActions ? "inline-block" : "none"
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
                    <LinkSimple onClick={()=>{
                      setClickActions((prev)=>!prev)
                    }}/>
                  </IconButton>
                </InputAdornment>
              </Stack>
            ),
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <Smiley
                    onClick={() => {
                      openPicker ? setOpenPicker(false) : setOpenPicker(true);
                    }}
                  />
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
            <ChatInput setOpenPicker={setOpenPicker} />
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
                <IconButton>
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
