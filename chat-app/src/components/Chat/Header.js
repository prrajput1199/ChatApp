import {
  Avatar,
  Box,
  Stack,
  Badge,
  Typography,
  IconButton,
  Divider,
  useTheme,
} from "@mui/material";
import React from "react";
import { faker } from "@faker-js/faker";
import styled from "@emotion/styled";
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from "phosphor-react";
import { ToggleSidebar } from "../../Redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../Redux/store";

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

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
    <div>
      <Box
        sx={{
          // height: "100px",
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
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ width: "100%", height: "100%" }}
          spacing={"16px"}
        >
          <Stack
            direction={"row"}
            spacing={2}
            alignItems={"center"}
            onClick={() => {
              dispatch(ToggleSidebar());
            }}
          >
            <Box padding={2}>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                sx={{ marginLeft: "0px" }}
              >
                <Avatar src={faker.image.avatar()} alt={faker.name.fullName} />
              </StyledBadge>
            </Box>
            <Stack direction={"column"}>
              <Typography variant="subtitle2">
                {faker.name.fullName()}
              </Typography>
              <Typography variant="caption">Online</Typography>
            </Stack>
          </Stack>
          <Stack direction={"row"} spacing={1}>
            <IconButton>
              <VideoCamera />
            </IconButton>
            <IconButton>
              <Phone />
            </IconButton>
            <IconButton>
              <MagnifyingGlass />
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <IconButton>
              <CaretDown />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default Header;
