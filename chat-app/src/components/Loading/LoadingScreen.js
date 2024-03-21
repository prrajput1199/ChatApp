import React from "react";
import "./Loading.css";
import { Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const LoadingScreen = () => {
  const theme = useTheme();
  return (
    <>
      <Stack width={"100%"} sx={{
        justifyContent:"center",
        alignItems:"center"
      }}>
        <div className="loader"></div>
        <Typography
          sx={{
            color: theme.palette.background.paper,
          }}
        >
          Fetching Data
        </Typography>
      </Stack>
    </>
  );
};

export default LoadingScreen;
