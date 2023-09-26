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
} from "@mui/material";
import React from "react";
import { faker } from "@faker-js/faker";
import styled from "@emotion/styled";
import {
  CaretDown,
  LinkSimple,
  MagnifyingGlass,
  PaperPlaneTilt,
  Phone,
  Smiley,
  VideoCamera,
} from "phosphor-react";


const Communication = () => {
  const theme = useTheme();

  console.log(theme);

  const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBased-input": {
      paddingTop: "12px",
      paddingBottom: "12px",
    },
  }));

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
          // height: "100px",
          width: "100%",
          backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
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
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
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

      <Box sx={{ width: "100%", flexFlow: "8px" }}></Box>

      <Box
        p={2}
        sx={{
          height: "100px",
          width: "100%",
          backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        }}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <StyledInput
            fullWidth
            placeholder="Write a message"
            InputProps={{
              // disableUnderline: "true",
              startAdornment: (
                <InputAdornment>
                  <IconButton>
                    <LinkSimple />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <Smiley />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              
              borderRadius: 1.5 ,
            }}
          >
            <IconButton>
              <PaperPlaneTilt color="white"/>
            </IconButton>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Communication;
