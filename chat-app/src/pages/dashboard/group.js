import { useTheme } from "@emotion/react";
import { Box, IconButton, Link, Stack, Typography } from "@mui/material";
import React from "react";
import BasicTextFields from "../../components/Search/Search";
import { Plus } from "phosphor-react";

const Group = () => {
  const theme = useTheme();
  return (
    <>
      <Stack direction={"row"} width={"100%"}>
        {/* left */}
        <Box
          sx={{
            height: "100vh",
            width: "320px",
            boxShadow: "0 0 2px rgba(0,0,0,0.25)",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
          }}
        >
          <Stack p={3} spacing={2} direction={"column"}>
            <Typography variant="h5">Groups</Typography>
            <BasicTextFields/>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="subtitle2" component={Link}>
                Create new Group
              </Typography>
              <IconButton sx={{
                color:theme.palette.primary.main
              }}>
                <Plus />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default Group;
