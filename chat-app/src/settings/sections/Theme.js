import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import useSettings from "../../hooks/useSettings";

const Theme = ({ open, handleClose }) => {
  const [value, setvalue] = useState();


  const { onChangeMode } = useSettings();

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
        <DialogTitle>Theme mode</DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="mode"
              name="mode1"
              value={value}
              onChange={(e) => onChangeMode(e)}
            >
              <FormControlLabel value="light" control={<Radio />} label="Light" checked={value ==="light"}/>
              <FormControlLabel
                value="dark"
                control={<Radio />}
                label="Dark"
                checked={value==="dark"}
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Theme;
