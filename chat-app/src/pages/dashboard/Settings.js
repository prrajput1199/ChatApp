import { useTheme } from "@emotion/react";
import { faker } from "@faker-js/faker";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import {
  Article,
  Bell,
  CaretLeft,
  ClipboardText,
  Image,
  Key,
  Lock,
  PencilCircle,
  WarningCircle,
} from "phosphor-react";
import React, { useContext, useState } from "react";
import Shortcuts from "../../settings/sections/Shortcuts";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import { Link as RouterLink } from "react-router-dom";
import Theme from "../../settings/sections/Theme";

const Settings = () => {
  const theme = useTheme();

  const [openShortcut, setOpenShortcut] = useState(false);
  const [openTheme , setOpenTheme] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleOpenshortcut = () => {
    setOpenShortcut(true);
  };

  const handleCloseshortcut = () => {
    setOpenShortcut(false);
  };

  const handleopenTheme = () => {
    setOpenTheme(true);
  };

  const handlecloseTheme = () => {
    setOpenTheme(false);
  };

  const SettingsList = [
    {
      key: 0,
      icon: <Bell size={20} />,
      title: "Notification",
      onclick: () => {},
    },
    {
      key: 1,
      icon: <Lock size={20} />,
      title: "Privacy",
      onclick: () => {},
    },
    {
      key: 2,
      icon: <Key size={20} />,
      title: "Security",
      onclick: () => {},
    },
    {
      key: 3,
      icon: <PencilCircle size={20} />,
      title: "Theme",
      onclick: handleopenTheme ,
    },
    {
      key: 4,
      icon: <Image size={20} />,
      title: "Chat wallpaper",
      onclick: () => {},
    },
    {
      key: 5,
      icon: <ClipboardText size={20} />,
      title: "Request account info",
      onclick: () => {},
    },
    {
      key: 6,
      icon: <Article size={20} />,
      title: "Keyboard shortcuts",
      onclick: handleOpenshortcut,
    },
    {
      key: 7,
      icon: <WarningCircle size={20} />,
      title: "Help",
      onclick: () => {},
    },
  ];
  return (
    <>
      <Stack
        direction={"row"}
        width={"100%"}
        height={"100vh"}
        sx={{ overflowY: "scroll" }}
      >
        {/* left */}
        <Box
          sx={{
            width: {
              xs: "100%",
              lg: "350px",
            },
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
            boxShadow: "0 0 2px rgba(0,0,0,0.25)",
          }}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={2} p={3}>
            <Link>
              <IconButton component={RouterLink} to={"/app"}>
                <CaretLeft />
              </IconButton>
            </Link>
            <Typography
              variant="subtitle2"
              fontSize={"24px"}
              fontFamily={"Manrope"}
            >
              Settings
            </Typography>
          </Stack>

          <Stack direction={"row"} alignItems={"center"} spacing={4} px={3}>
            <Avatar
              src={currentUser.photoURL}
              sx={{
                width: "56px",
                height: "56px",
              }}
            />
            <Stack direction={"column"} spacing={"4px"}>
              <Typography variant="subtitle1">
                {currentUser.displayName}
              </Typography>
              {currentUser.About ? (
                <Typography variant="body2">
                  {currentUser.About.about}
                </Typography>
              ) : (
                <Typography variant="body2">
                  Hi,I am {currentUser.displayName}
                </Typography>
              )}
            </Stack>
          </Stack>

          <Stack direction={"column"} py={5} px={3} spacing={3}>
            {SettingsList.map(({ key, icon, title, onclick }) => {
              return (
                <Stack>
                  <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <IconButton onClick={onclick}>{icon}</IconButton>
                    <Typography>{title}</Typography>
                  </Stack>
                  {key != 7 && <Divider />}
                </Stack>
              );
            })}
          </Stack>
          {openShortcut && (
            <Shortcuts
              open={handleOpenshortcut}
              handleClose={handleCloseshortcut}
            />
          )}
           {openTheme && (
            <Theme
              open={handleopenTheme}
              handleClose={handlecloseTheme}
            />
          )}
        </Box>

        {/* Right */}

        <Box
          sx={{
            backgroundColor:
              theme.palette.mode == "light"
                ? "white"
                : theme.palette.background.paper,
            width: "100%",
            display: {
              xs: "none",
              lg: "block",
            },
          }}
        >
          <Stack
            direction={"column"}
            sx={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src="settings.svg" alt="" />
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default Settings;
