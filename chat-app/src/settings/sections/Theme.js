import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";

const Theme = ({ open, handleClose }) => {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

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
        <DialogContent sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {ShortcutList.map(({ key, Title, combination }) => {
              return (
                <>
                  <Grid item xs={6} key={key}>
                    <Stack
                      direction={"row"}
                      width={"100%"}
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="caption" fontSize={14}>
                        {Title}
                      </Typography>
                      <Stack direction={"row"}>
                        {combination.map((el) => {
                          return (
                            <Button
                              disabled
                              sx={{
                                color: "#212121",
                              }}
                            >
                              {el}
                            </Button>
                          );
                        })}
                      </Stack>
                    </Stack>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Theme;

