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
              px: 3,
              pt: 1,
            }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Media" />
            <Tab label="Links" />
            <Tab label="Docs" />
          </Tabs>
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
            {(() => {
              switch (value) {
                case 0:
                  //image
                  return (
                    <Grid container spacing={2}>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((element) => {
                        return (
                          <Grid item xs={4}>
                            <img src={faker.image.avatar()}></img>
                          </Grid>
                        );
                      })}
                    </Grid>
                  );

                case 1:
                  //Link
                  return Shared_links.map((element)=>{
                    return <LinkMsg element={element}/>
                  })

                case 2:
                  //Doc
                  return Shared_docs.map((Element)=>{
                    return <DocMsg element={element}/>
                  })

                default:
                  break;
              }
            })()}
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default SharedMessages;
