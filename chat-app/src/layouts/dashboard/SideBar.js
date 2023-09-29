import React from "react";
import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  Divider,
  FormLabel,
  IconButton,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { Nav_Buttons } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";
import useSettings from "../../hooks/useSettings";
import MaterialUISwitch from "../../components/MaterialUISwitch";

const SideBar = () => {
  const theme = useTheme();
  const [selectedButton, setSelectedButton] = useState(0);
  const { onToggleMode } = useSettings();

  return (
    <>
      <Box
        p={2}
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          height: "100%",
          width: "100px",
        }}
      >
        <Stack
          sx={{ width: "100%" }}
          direction="column"
          alignItems={"center"}
          spacing={3}
          justifyContent={"space-between"}
          height={"100%"}
        >
          <Stack
            spacing={3}
            sx={{
              width: "max-content",
              direction: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                height: "64px",
                width: "64px",
                borderRadius: 1.5,
              }}
            >
              <img src="../" alt="" />
            </Box>
            {Nav_Buttons.map((Element) => {
              return (
                <>
                  {Element.index === selectedButton ? (
                    <Box
                      sx={{
                        backgroundColor: "black",
                        color: "white",
                        borderRadius: 1,
                      }}
                    >
                      <IconButton
                        key={Element.index}
                        sx={{ color: "white", width: "max-content" }}
                      >
                        {Element.icon}
                      </IconButton>
                    </Box>
                  ) : (
                    <IconButton
                      sx={{
                        color:
                          theme.palette.mode === "light" ? "black" : "white",
                      }}
                      onClick={() => setSelectedButton(Element.index)}
                    >
                      {Element.icon}
                    </IconButton>
                  )}
                </>
              );
            })}
            <Divider sx={{ width: "100%", backgroundColor: "blue" }} />
            {selectedButton === 3 ? (
              <Box
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: 1,
                }}
              >
                <IconButton sx={{ color: "white" }}>
                  <Gear size={25} />
                </IconButton>
              </Box>
            ) : (
              <IconButton
                sx={{
                  color: theme.palette.mode === "light" ? "black" : "white",
                }}
                onClick={() => setSelectedButton(3)}
              >
                <Gear size={25} />
              </IconButton>
            )}
          </Stack>
          <Stack alignItems={"center"} spacing={"20px"} marginTop={"50px"}>
            <MaterialUISwitch
              {...FormLabel}
              defaultChecked
              onChange={() => {
                onToggleMode();
              }}
            />
            <Avatar src={faker.image.avatar()} sx={{ marginBottom: "30px" }} />
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default SideBar;
