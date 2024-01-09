import { useTheme } from "@emotion/react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "../../Redux/store";
import { CaretLeft } from "phosphor-react";
import { UpdateSidebarType } from "../../Redux/slices/app";

const SharedMessages = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
  return (
    <div>
      <Box sx={{ width: "310px", height: "100vh"}}>
        <Stack direction={"column"} sx={{ height: "100%" }}>
         
         {/* header */}
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
                alignItems: "center",
                p: "16px",
              }}
            > 
              <IconButton
                onClick={() => {
                  dispatch(UpdateSidebarType("CONTACT"));
                }}
              >
                <CaretLeft/>
              </IconButton>
              <Typography variant="subtitle2">Shared Messages</Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
      
    </div>
  );
};

export default SharedMessages;
