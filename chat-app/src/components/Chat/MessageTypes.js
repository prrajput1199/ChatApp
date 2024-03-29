import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import {
  DotsThreeCircleVertical,
  DownloadSimple,
  Image,
  Trash,
} from "phosphor-react";
import { element } from "prop-types";
import React, { useContext, useEffect, useRef } from "react";
import { Message_options } from "../../data";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const DocMsg = ({ element }) => {
  const theme = useTheme();
  return (
    <div>
      <Stack
        direction={"row"}
        justifyContent={element.incoming ? "start" : "end"}
        spacing={1}
      >
        <Box
          p={1.5}
          sx={{
            // backgroundColor: element.incoming
            //   ? theme.palette.background.default
            //   : theme.palette.primary.main,
            borderRadius: 1.5,
            width: "max-content",
          }}
        >
          <Stack spacing={2}>
            <Stack
              direction={"row"}
              p={2}
              spacing={3}
              alignItems={"center"}
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 1,
              }}
            >
              <Image size={48} />
              <Typography variant="caption">Abstract.msg</Typography>
              <IconButton>
                <DownloadSimple />
              </IconButton>
            </Stack>
            <Typography
              variant="body2"
              sx={{ color: element.incoming ? theme.palette.text : "#fff" }}
            >
              {element.message}
            </Typography>
          </Stack>
        </Box>
        <MessagesMenu />
      </Stack>
    </div>
  );
};

const LinkMsg = ({ element, Menu }) => {
  const theme = useTheme();
  return (
    <div>
      <Stack
        direction={"row"}
        justifyContent={element.incoming ? "start" : "end"}
        spacing={1}
      >
        <Box
          p={1.5}
          sx={{
            backgroundColor: element.incoming
              ? theme.palette.background.default
              : theme.palette.primary.main,
            borderRadius: 1.5,
            width: "max-content",
          }}
        >
          <Stack spacing={2}>
            <Stack
              p={2}
              direction={"column"}
              spacing={3}
              alignItems={"start"}
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 1,
              }}
            >
              <img
                src={element.preview}
                alt={element.message}
                style={{ maxHeight: 210, borderRadius: "10px" }}
              ></img>
              <Stack spacing={2}>
                <Typography variant="subtitle2" color={theme.palette.text}>
                  Creating Chat App
                </Typography>
                <Typography
                  variant="subtitle2"
                  component={Link}
                  sx={{ color: theme.palette.primary.main }}
                  to="//https://www.youtube.com/"
                >
                  WWW.Youtube.com
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                color={element.incoming ? theme.palette.text : "#fff"}
              >
                {element.message}
              </Typography>
            </Stack>
          </Stack>
        </Box>
        {Menu && <MessagesMenu />}
      </Stack>
    </div>
  );
};

const ReplyMsg = ({ element, Menu }) => {
  const theme = useTheme();
  return (
    <div>
      <Stack
        direction={"row"}
        justifyContent={element.incoming ? "start" : "end"}
        spacing={1}
      >
        <Box
          p={1.5}
          sx={{
            backgroundColor: element.incoming
              ? theme.palette.background.default
              : theme.palette.primary.main,
            borderRadius: 1.5,
            width: "max-content",
          }}
        >
          <Stack spacing={2}>
            <Stack
              p={2}
              direction={"column"}
              spacing={3}
              alignItems={"center"}
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 1,
              }}
            >
              <Typography variant="body" color={theme.palette.text}>
                {element.message}
              </Typography>
            </Stack>
            <Typography
              variant="body"
              color={element.incoming ? theme.palette.text : "white"}
            >
              {element.reply}
            </Typography>
          </Stack>
        </Box>
        {Menu && <MessagesMenu />}
      </Stack>
    </div>
  );
};

const MediaMsg = ({ element, Menu }) => {
  const theme = useTheme();
  return (
    <div>
      <Stack
        direction={"row"}
        justifyContent={element.incoming ? "start" : "end"}
        spacing={1}
      >
        <Box
          p={1.5}
          sx={{
            backgroundColor: element.incoming
              ? theme.palette.background.default
              : theme.palette.primary.main,
            borderRadius: 1.5,
            width: "max-content",
          }}
        >
          <Stack>
            <img
              src={element.img}
              alt={element.message}
              style={{ maxHeight: "210px", borderRadius: "10px" }}
            ></img>
            <Typography
              variant="body"
              color={element.incoming ? theme.palette.text : "white"}
            >
              {element.message}
            </Typography>
          </Stack>
        </Box>
        {Menu && <MessagesMenu />}
      </Stack>
    </div>
  );
};

const TextMsg = ({ message, Menu ,setMessages,messages}) => {
  const theme = useTheme();
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({
      behaviour: "smooth",
    });
  }, [message]);
  

 const deleteMessage = async (messageId) => {
  const messageRef = doc(db, 'chats', data.chatId);
  const objectToRemove = messages.find(item => item.id === messageId);

  try {
    await updateDoc( messageRef, {
      messages: arrayRemove( objectToRemove) // Replace with the message object if needed
    });
    // You can also update the UI to reflect the deletion
  } catch (error) {
    console.error('Error deleting message:', error);
    // Handle deletion errors (e.g., display an error message to the user)
  }
};

  const HandleDelete = (messageId) => {
    deleteMessage(messageId);
    // const updatedList = messages.filter((element)=>{
    //   return element.id != messageId;
    // })
    // setMessages(updatedList);
  };
  return (
    <div>
      <Stack
        direction={"row"}
        justifyContent={message.senderId == currentUser.uid ? "start" : "end"}
        spacing={1}
        ref={ref}
      >
        <Box
          p={1.5}
          sx={{
            backgroundColor:
              message.senderId == currentUser.uid
                ? theme.palette.background.default
                : theme.palette.primary.main,
            borderRadius: 1.5,
            width: "max-content",
          }}
        >
          <Stack direction={"column"} spacing={3} alignItems={"center"}>
            <IconButton sx={{}} onClick={() => HandleDelete(message.id)}>
              <Trash size={32} />
            </IconButton>

            {message.img && (
              <img
                src={message.img}
                style={{
                  width: "200px",
                }}
              ></img>
            )}
            {message.video && (
              <video
                src={message.video}
                style={{
                  width: "250px",
                }}
                controls
              ></video>
            )}
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
              <Avatar
                src={
                  message.senderId === currentUser.uid
                    ? currentUser.photoURL
                    : data.user.photoURL
                }
              />
              {message.textData && (
                <Typography
                  variant="body"
                  color={
                    message.senderId == currentUser.uid
                      ? theme.palette.text
                      : "white"
                  }
                >
                  {message.textData}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Box>
        {Menu && <MessagesMenu />}
      </Stack>
    </div>
  );
};

const Timeline = ({ element }) => {
  const theme = useTheme();
  return (
    <div>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Divider width="46%" />
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text,
          }}
        >
          {element.text}
        </Typography>
        <Divider width="46%" />
      </Stack>
    </div>
  );
};

const MessagesMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <DotsThreeCircleVertical
        size={20}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack direction={"column"} spacing={1}>
          {Message_options.map((element) => {
            return (
              <>
                <MenuItem onClick={() => handleClick}>{element.title}</MenuItem>
              </>
            );
          })}
        </Stack>
      </Menu>
    </>
  );
};

export { Timeline, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg, MessagesMenu };
