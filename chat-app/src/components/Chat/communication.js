import { Avatar, Box, Stack, Badge, Typography } from "@mui/material";
import React from "react";
import { faker } from "@faker-js/faker";
import styled from "@emotion/styled";

const Communication = () => {
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
    <Stack
      height={"100%"}
      maxHeight={"100vh"}
      width={"auto"}
      justifyContent={"space-between"}
    >
      <Box
        sx={{
          height: "100px",
          width: "100%",
          backgroundColor: "#F8FAFF",
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
          <Stack direction={"row"} spacing={2}>
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
              <Typography variant="subtitle2">{faker.name.fullName()}</Typography>
              <Typography variant="caption">Online</Typography>
          </Stack>
          </Stack>
        
        </Stack>
      </Box>

      <Box sx={{ width: "100%", flexFlow: "8px" }}></Box>

      <Box
        sx={{
          height: "100px",
          width: "100%",
          backgroundColor: "#F8FAFF",
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        }}
      ></Box>
    </Stack>
  );
};

export default Communication;
