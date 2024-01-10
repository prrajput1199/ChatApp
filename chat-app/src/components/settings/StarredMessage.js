import { useTheme } from "@emotion/react";
import { Box, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "../../Redux/store";
import { CaretLeft } from "phosphor-react";
import Grid from "@mui/material/Grid";
import { UpdateSidebarType } from "../../Redux/slices/app";
import { faker } from "@faker-js/faker";
import { Shared_docs, Shared_links } from "../../data";
import { DocMsg, LinkMsg } from "../Chat/MessageTypes";
import { element } from "prop-types";
import Messages from "../Chat/messages";

const StarredMessages = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: "310px", height: "100vh" }}>
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
                <CaretLeft />
              </IconButton>
              <Typography variant="subtitle2">Starred Messages</Typography>
            </Stack>
          </Box>

    
          {/* body */}

          <Stack
            sx={{
              height: "100vh",
              position: "relative",
              flexGrow: 1,
              overflowY: "scroll",
              p: 2,
            }}
          >
            {
                <Messages/>
            }
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default StarredMessages;
