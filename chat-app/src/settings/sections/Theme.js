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
import React from "react";
import useSettings from "../../hooks/useSettings";

const Theme = ({ open, handleClose }) => {
  const [value, setValue] = React.useState('female');
const { onToggleMode } = useSettings();

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
        <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={ onToggleMode()}>
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
      </RadioGroup>
    </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Theme;

