import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { faker } from "@faker-js/faker";
import { Avatar, Badge, Box, Stack, Typography } from "@mui/material";
import React from "react";

const ChatSection = ({ id, img, name, msg, time, unread, pinned, online }) => {
  const theme = useTheme();
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
  return (
    <Box
      sx={{
        backgroundColor:
          theme.palette.mode === "Light"
            ? "white"
            : theme.palette.background.paper,

        width: "100%",
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
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              sx={{ marginLeft: "0px" }}
            >
              <Avatar alt="Remy Sharp" src={faker.image.avatar()} />
            </StyledBadge>
          ) : (
            <Avatar alt="Remy Sharp" src={faker.image.avatar()} />
          )}
          <Stack direction={"column"}>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography
              variant="caption"
              noWrap
              sx={{
                width: "60%",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {msg}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction={"column"}
          alignItems={"center"}
          spacing={1.2}
          marginRight={"15px"}
        >
          <Typography variant="caption">{time}</Typography>
          <Badge color="primary" badgeContent={unread}></Badge>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChatSection;
