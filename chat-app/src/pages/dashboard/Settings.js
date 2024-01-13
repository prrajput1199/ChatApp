import { useTheme } from "@emotion/react";
import { faker } from "@faker-js/faker";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
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
import React from "react";
import Shortcuts from "../../settings/sections/Shortcuts";

const Settings = () => {
  const theme = useTheme();



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
      onclick: () => {},
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
      onclick: () => {},
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
            width: "310px",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
            boxShadow: "0 0 2px rgba(0,0,0,0.25)",
          }}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={2} p={3}>
            <IconButton>
              <CaretLeft />
            </IconButton>
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
              src={faker.image.avatar()}
              sx={{
                width: "56px",
                height: "56px",
              }}
            />
            <Stack direction={"column"} spacing={"4px"}>
              <Typography variant="subtitle1">
                {faker.name.fullName()}
              </Typography>
              <Typography variant="body2">Exploring</Typography>
            </Stack>
          </Stack>

          <Stack direction={"column"} py={5} px={3} spacing={3}>
            {SettingsList.map(({ key, icon, title, onclick }) => {
              return (
                <Stack>
                  <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <IconButton>{icon}</IconButton>
                    <Typography>{title}</Typography>
                  </Stack>
                  {key != 7 && <Divider />}
                </Stack>
              );
            })}
          </Stack>
          <Shortcuts open={true} handle={()=>{}}/>
        </Box>

        {/* Right */}
      </Stack>
    </>
  );
};

export default Settings;
