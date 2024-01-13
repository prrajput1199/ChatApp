import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";

const Shortcuts = ({ open, handleClose }) => {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const ShortcutList = [
    {
      key: 0,
      Title: "Mark as unread",
      combination: ["cmd", "shift", "U"],
    },
    {
      key: 1,
      Title: "Archieve chats",
      combination: ["cmd", "shift", "E"],
    },
    {
      key: 2,
      Title: "Pin chat",
      combination: ["cmd", "shift", "P"],
    },
    {
      key: 3,
      Title: "Search Chat",
      combination: ["cmd", "shift", "F"],
    },
    {
      key: 4,
      Title: "Next Chat",
      combination: ["cmd", "Tab"],
    },
    {
      key: 5,
      Title: "New Group",
      combination: ["cmd", "shift", "N"],
    },
    {
      key: 6,
      Title: "increase speed of voice messages",
      combination: ["shift", "."],
    },
    {
      key: 7,
      Title: "Settings",
      combination: ["shift", ","],
    },
    {
      key: 8,
      Title: "Mute",
      combination: ["cmd", "shift", "U"],
    },
    {
      key: 9,
      Title: "Delete Chat",
      combination: ["cmd", "shift", "U"],
    },
    {
      key: 10,
      Title: "Search",
      combination: ["cmd", "shift", "U"],
    },
    {
      key: 11,
      Title: "New chat",
      combination: ["cmd", "shift", "U"],
    },
    {
      key: 12,
      Title: "Previous Chat",
      combination: ["cmd", "shift", "U"],
    },
    {
      key: 13,
      Title: "New chat",
      combination: ["cmd", "shift", "U"],
    },
    {
      key: 14,
      Title: "New chat",
      combination: ["cmd", "shift", "U"],
    },
    {
      key: 15,
      Title: "New chat",
      combination: ["cmd", "shift", "U"],
    },
    {
      key: 16,
      Title: "New chat",
      combination: ["cmd", "shift", "U"],
    },
    {
      key: 17,
      Title: "New chat",
      combination: ["cmd", "shift", "U"],
    },
    {
      key: 18,
      Title: "New chat",
      combination: ["cmd", "shift", "U"],
    },
  ];
  return (
    <>
      <Dialog
        fullWidth
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        keepMounted
        TransitionComponent={Transition}
        sx={{ p: 4 }}
      >
        <DialogTitle>Shortcuts</DialogTitle>
        <DialogContent sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            {ShortcutList.map(({ key, Title, combination }) => {
              return (
                <>
                  <Grid item xs={6} key={key}>
                    <Stack direction={"row"} width={"100%"} sx={{
                      justifyContent:"space-between",
                      alignItems:"center"
                    }}>
                      <Typography variant="caption" fontSize={14}>
                        {Title}
                      </Typography>
                      <Stack direction={"row"}>
                        {combination.map((el) => {
                        return <Button disabled sx={{
                          color:"#212121"
                        }}>{el}</Button>;
                        })}
                      </Stack>
                    </Stack>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Shortcuts;
