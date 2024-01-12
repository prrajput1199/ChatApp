import { useTheme } from "@emotion/react";
import { Box, Stack } from "@mui/material";
import React from "react";

const Settings = () => {
  const theme = useTheme();
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
            width: "320px",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
            boxShadow: "0 0 2px rgba(0,0,0,0.25)",
          }}
        ></Box>

        
        {/* Right */}
      </Stack>
    </>
  );
};

export default Settings;
