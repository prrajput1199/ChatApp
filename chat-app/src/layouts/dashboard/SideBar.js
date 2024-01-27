import React from "react";
import { useTheme } from "@emotion/react";
import {
  Avatar,
  Box,
  Divider,
  FormLabel,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { Nav_Buttons, Profile_Menu } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";
import useSettings from "../../hooks/useSettings";
import MaterialUISwitch from "../../components/MaterialUISwitch";
import { useNavigate } from "react-router-dom";
const SideBar = () => {
  const theme = useTheme();
  const [selectedButton, setSelectedButton] = useState();
  const { onToggleMode } = useSettings();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getPath = (index) => {
    switch (index) {
      case 0:
        return ("/app");

      case 1:
        return ("/group");

      case 2:
        return ("/settings");

      default:
        return ("/app");
    }
  };

  return (
    <>
      <Box
        p={2}
        sx={{
          backgroundColor:
            theme.palette.mode === "light"
              ? "white"
              : theme.palette.background.paper,
          boxShadow: "0px 1px 2px rgba(0,0,0,0.25)",
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
                      onClick={() => {
                        setSelectedButton(Element.index);
                        navigate(getPath(Element.index));
                      }}
                    >
                      {Element.icon}
                    </IconButton>
                  )}
                </>
              );
            })}
            <Divider sx={{ width: "100%", backgroundColor: "blue" }} />
            {selectedButton === 2 ? (
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
                onClick={() => {setSelectedButton(2)
                  navigate(getPath(2));
                }}
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
            <Avatar
              src={faker.image.avatar()}
              sx={{ marginBottom: "30px" }}
              id="basic-buttton"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Stack direction={"column"} spacing={1}>
                {Profile_Menu.map((element) => {
                  return (
                    <>
                      <MenuItem onClick={() => handleClick}>
                        <Stack
                          direction={"row"}
                          alignItems={"cebter"}
                          width={100}
                          justifyContent={"space-between"}
                        >
                          <span>{element.title}</span>
                          {element.icon}
                        </Stack>
                      </MenuItem>
                    </>
                  );
                })}
              </Stack>
            </Menu>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default SideBar;
