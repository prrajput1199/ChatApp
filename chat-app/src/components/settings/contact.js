// import { useTheme } from '@emotion/react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useState } from "react";
import {
  Bell,
  CaretRight,
  Phone,
  Prohibit,
  Star,
  Trash,
  VideoCamera,
  X,
} from "phosphor-react";
import { ToggleSidebar, UpdateSidebarType } from "../../Redux/slices/app";
import { useDispatch } from "react-redux";
import { faker } from "@faker-js/faker";
import MaterialUISwitch from "../MaterialUISwitch";
import AntSwitch from "../AntSwitch";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Block this contact"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure You want to block this contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Delete this Contact"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure You want to delete this contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
};

const Contact = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [openBlock, setopenBlock] = useState(false);
  const [openDelete, setopenDelete] = useState(false);
  const { data } = useContext(ChatContext);

  const handleCloseBlock = () => {
    setopenBlock(false);
  };

  const handleCloseDelete = () => {
    setopenDelete(false);
  };

  return (
    <div>
      <Box sx={{ width: "300px", height: "100vh" }}>
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
              overflowY: "scroll",
            }}
          >
            <Stack
              sx={{
                alignItems: "center",
              }}
              direction={"row"}
              p={2}
              spacing={5}
            >
              <Avatar
                src={data.user.photoURL}
                sx={{
                  width: "64px",
                  height: "64px",
                }}
              />
              <Typography variant="article" fontWeight={600}>
              {data.user.displayName}
              </Typography>
            </Stack>

            <Divider
              sx={{
                pt: "4px",
              }}
            />

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
                mt:"24px",
              }}
            >
              <Typography fontSize={"13px"}>Media,links and docs</Typography>
              <Button
                endIcon={<CaretRight />}
                onClick={() => {
                  dispatch(UpdateSidebarType("SHARED"));
                }}
              >
                401
              </Button>
            </Stack>

            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                mb:"16px"
              }}
              spacing={2}
              p={1}
      
            >
              {[1, 2, 3].map((element) => {
                return (
                  <>
                    <Box
                      sx={{
                        width: "70px",
                      }}
                    >
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
              <Stack
                direction={"row"}
                spacing={1}
                sx={{
                  alignItems: "center",
                  p: "4px",
                  mt:"16px",
                  mb:"16px"
                }}
              >
                <IconButton>
                  <Star />
                </IconButton>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontSize: "14px",
                  }}
                >
                  Starred Message
                </Typography>
              </Stack>

              <Button
                endIcon={<CaretRight />}
                onClick={() => {
                  dispatch(UpdateSidebarType("STARRED"));
                }}
              ></Button>
            </Stack>

            <Divider />

            {/* <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack
                direction={"row"}
                spacing={1}
                sx={{
                  alignItems: "center",
                  p: "4px",
                }}
              >
                <IconButton>
                  <Bell />
                </IconButton>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontSize: "14px",
                  }}
                >
                  Mute Notification
                </Typography>
              </Stack>

              <Button>
                <AntSwitch />
              </Button>
            </Stack>

            <Typography fontSize={"13px"} p={1}>
              1 group in common
            </Typography>

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
            </Stack> */}

            <Stack
              direction={"row"}
              alignItems={"center"}
              p={1}
              spacing={3}
              justifyContent={"center"}
            >
              {/* <Button
                startIcon={<Prohibit />}
                onClick={() => setopenBlock(true)}
              >
                Block
              </Button> */}
              <Button startIcon={<Trash />} onClick={() => setopenBlock(true)}>
                Delete
              </Button>
            </Stack>
          </Stack>
          {openBlock && (
            <BlockDialog open={openBlock} handleClose={handleCloseBlock} />
          )}
          {openDelete && (
            <DeleteDialog open={openDelete} handleClose={handleCloseDelete} />
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default Contact;
