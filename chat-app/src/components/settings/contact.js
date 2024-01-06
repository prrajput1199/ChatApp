// import { useTheme } from '@emotion/react';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
// import Typography from '../../theme/overrides/Typography';
import { Phone, VideoCamera, X } from "phosphor-react";
import { ToggleSidebar } from "../../Redux/slices/app";
import { useDispatch } from "react-redux";
import { faker } from "@faker-js/faker";

const Contact = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <div>
      <Box sx={{ width: "320px", height: "100vh" }}>
        <Stack direction={"column"} sx={{ height: "100%" }}>
          {/* Header */}
          <Box
            sx={{
              boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
              width: "100%",
              backgroundColor:
                theme.palette.mode === "light"
                  ? "#F8FAFF"
                  : theme.palette.background,
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                p: "16px",
              }}
            >
              <Typography variant="subtitle2">Contact</Typography>
              <IconButton
                onClick={() => {
                  dispatch(ToggleSidebar());
                }}
              >
                <X />
              </IconButton>
            </Stack>
          </Box>

          {/* body */}
          
          <Stack
            sx={{
              height: "100%",
            }}
          >
            <Stack
              sx={{
                alignItems: "center",
                justifyContent: "center",
              }}
              direction={"row"}
              p={3}
              spacing={5}
            >
              <Stack>
                <Avatar
                  src={faker.image.avatar()}
                  sx={{
                    width: "64px",
                    height: "64px",
                  }}
                />
              </Stack>

              <Stack
                direction="column"
                sx={{
                  alignItems: "center",
                }}
                spacing={1}
              >
                <Typography variant="article" fontWeight={600}>
                  {faker.name.fullName()}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {"91 8398174713"}
                </Typography>
              </Stack>
            </Stack>

            {/* audiovideo */}
            <Stack direction={"row"} sx={{
              alignItems:"center",
              justifyContent:"center"
            }} spacing={4} p={2}>
              <Stack direction={"column"} sx={{
                alignItems:"center",
              }} spacing={1}>
                <IconButton>
                  <Phone />
                </IconButton>
                <Typography  variant="overline">Audio</Typography>
              </Stack>
              <Stack spacing={1}>
                <IconButton>
                  <VideoCamera />
                </IconButton>
                <Typography variant="overline">Video</Typography>
              </Stack>
            </Stack>

            <Divider/>

            {/* about */}
            
            <Stack direction={"column"} p={3} spacing={2}>
              <Typography variant="article">
                  Hi
              </Typography>
              <Typography variant="body2">
                Hi there ,I am using 
              </Typography>
            </Stack>

            <Divider/>
          </Stack>
          
        </Stack>
      </Box>
    </div>
  );
};

export default Contact;
