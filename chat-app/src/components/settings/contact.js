// import { useTheme } from '@emotion/react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
// import Typography from '../../theme/overrides/Typography';
import { Bell, CaretRight, Phone, Prohibit, Star, Trash, VideoCamera, X } from "phosphor-react";
import { ToggleSidebar } from "../../Redux/slices/app";
import { useDispatch } from "react-redux";
import { faker } from "@faker-js/faker";
import MaterialUISwitch from "../MaterialUISwitch";
import AntSwitch from "../AntSwitch";

const Contact = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <div>
      <Box sx={{ width: "320px", height: "100vh",overflowY:"scroll" }}>
        <Stack direction={"column"} sx={{ height: "100%" }}>
          {/* Header */}
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
                justifyContent: "space-between",
                alignItems: "center",
                p: "16px",
              }}
            >
              <Typography variant="subtitle2">Contact</Typography>
              <IconButton
                onClick={() => {
                  dispatch(ToggleSidebar());
                }}
              >
                <X />
              </IconButton>
            </Stack>
          </Box>

          {/* body */}

          <Stack
            sx={{
              height: "100%",
            }}
          >
            <Stack
              sx={{
                alignItems: "center",
                justifyContent: "center",
              }}
              direction={"row"}
              p={2}
              spacing={5}
            >
              <Stack>
                <Avatar
                  src={faker.image.avatar()}
                  sx={{
                    width: "64px",
                    height: "64px",
                  }}
                />
              </Stack>

              <Stack
                direction="column"
                sx={{
                  alignItems: "center",
                }}
                spacing={1}
              >
                <Typography variant="article" fontWeight={600}>
                  {faker.name.fullName()}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {"91 8398174713"}
                </Typography>
              </Stack>
            </Stack>

            {/* audiovideo */}
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                justifyContent: "center",
              }}
              spacing={4}
              // p={1}
            >
              <Stack
                direction={"column"}
                sx={{
                  alignItems: "center",
                }}
                spacing={1}
              >
                <IconButton>
                  <Phone />
                </IconButton>
                <Typography variant="overline">Audio</Typography>
              </Stack>
              <Stack spacing={1}>
                <IconButton>
                  <VideoCamera />
                </IconButton>
                <Typography variant="overline">Video</Typography>
              </Stack>
            </Stack>

            <Divider sx={{
              pt:"4px"
            }}/>

            {/* about */}

            <Stack direction={"column"} p={2} spacing={2}>
              <Typography variant="article">Hi</Typography>
              <Typography variant="body2">Hi there ,I am using</Typography>
            </Stack>

            <Divider />
            
            {/* Media */}
            <Stack
              direction={"row"}
              p={1}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography fontSize={"13px"}>Media,links and docs</Typography>
              <Button endIcon={<CaretRight />}>401</Button>
            </Stack>

            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
              }}
              spacing={2}
              p={1}
            >
              {[1, 2, 3].map((element) => {
                return (
                  <>
                    <Box sx={{
                      width:"70px"
                    }}>
                      <img src={faker.image.food()} alt="" />
                    </Box>
                  </>
                );
              })}
            </Stack>
            
            <Divider/>

            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack direction={"row"} spacing={1} sx={{
                alignItems:"center",
                p:"4px"
              }}>
                <IconButton>
                  <Star />
                </IconButton>
                <Typography variant="subtitle2" sx={{
                  fontSize:"14px"
                }}>Starred Message</Typography>
              </Stack>

              <Button endIcon={<CaretRight />}></Button>
            </Stack>

            <Divider/>

            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack direction={"row"} spacing={1} sx={{
                alignItems:"center",
                p:"4px"
              }}>
                <IconButton>
                  <Bell />
                </IconButton>
                <Typography variant="subtitle2" sx={{
                  fontSize:"14px"
                }}>Mute Notification</Typography>
              </Stack>

              <Button>
                 <AntSwitch/>
              </Button>
            </Stack>

            <Typography fontSize={"13px"} p={1}>1 group in common</Typography>

            <Stack
              sx={{
                alignItems: "center",
                justifyContent: "center",
              }}
              direction={"row"}
              p={2}
              spacing={5}
            >
              <Stack>
                <Avatar
                  src={faker.image.avatar()}
                  sx={{
                    width: "64px",
                    height: "64px",
                  }}
                />
              </Stack>

              <Stack
                direction="column"
                sx={{
                  alignItems: "center",
                }}
                spacing={1}
              >
                <Typography variant="article" fontWeight={600}>
                  {faker.name.fullName()}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  Owl,parrot,rabbit,
                </Typography>
              </Stack>
            </Stack>

            <Stack direction={"row"} alignItems={"center"} p={1} spacing={3} justifyContent={"center"}>
              <Button startIcon={<Prohibit/>}>Block</Button>
              <Button startIcon={<Trash/>}>Delete</Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default Contact;
