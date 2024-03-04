import { useTheme } from "@emotion/react";
import { Box, IconButton, Link, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import React from "react";
import ProfileForm from "../../components/settings/ProfileForm";
import { Link as RouterLink } from "react-router-dom";
import Communication from "../../components/Chat/communication";
const Profile = () => {
  const theme = useTheme();
  return (
    <>
      <Stack direction={"row"} width={"100%"}>
        <Box
          sx={{
            width: {
              xs:"100%",
              sm:"400px"
            },
            height: "100vh",
            overflowX: "hidden",
            overflowY: "scroll",
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
            px: "15px",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
          }}
        >
          <Stack
            sx={{ height: "100%", width: "100%"}}
            p={4}
            spacing={5}
            direction={"column"}

          >
            {/* Header */}
            <Stack direction={"row"} alignItems={"center"} spacing={3} sx={{
              justifyContent:{
                xs:"center"
              }
            }}>
              <Link>
                <IconButton component={RouterLink} to={"/app"}>
                  <CaretLeft />
                </IconButton>
              </Link>
              <Typography variant="h5">Profile</Typography>
            </Stack>
            
            <Stack sx={{ height: "100%", width: "100%",overflowX:"hidden"}}>
            <ProfileForm />
            </Stack>
           
          </Stack>
        </Box>
        <Box
          sx={{
            display:{
              xs:"none",
              sm:"block"
            },
         
            height: "100%",
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F0F4FA"
                : theme.palette.background.paper,
          }}
        >
          <Communication />
        </Box>
      </Stack>
    </>
  );
};

export default Profile;
