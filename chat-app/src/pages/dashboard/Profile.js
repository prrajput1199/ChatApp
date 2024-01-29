import { useTheme } from "@emotion/react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import React from "react";
import ProfileForm from "../../components/settings/ProfileForm";

const Profile = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          width: "320px",
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
          sx={{ height: "100%", width: "100%" }}
          p={4}
          spacing={5}
          direction={"column"}
        >

         {/* Header */}
          <Stack direction={"row"} alignItems={"center"} spacing={3}>
            <IconButton>
              <CaretLeft />
            </IconButton>
            <Typography variant="h5">Profile</Typography>
          </Stack>

          <ProfileForm/>
        </Stack>
      </Box>
    </>
  );
};

export default Profile;
