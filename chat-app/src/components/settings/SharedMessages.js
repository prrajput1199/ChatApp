import { useTheme } from "@emotion/react";
import { Box, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "../../Redux/store";
import { CaretLeft} from "phosphor-react";
import { UpdateSidebarType } from "../../Redux/slices/app";

const SharedMessages = () => {
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
              <Typography variant="subtitle2">Shared Messages</Typography>
            </Stack>
          </Box>

          <Tabs
            sx={{
              px:1,
              pt:1
            }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Item One"  />
            <Tab label="Item Two" />
            <Tab label="Item Three"  />
          </Tabs>
          {/* body */}
        </Stack>
      </Box>
    </div>
  );
};

export default SharedMessages;
