import { Box, FormControl, InputAdornment, TextField } from "@mui/material";
import { MagnifyingGlass } from "phosphor-react";

export default function BasicTextFields() {
    return (
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "90%", borderRadius: 2 },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{
                  cursor:"pointer"
                }}>
                  <MagnifyingGlass size={32} />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Box>
    );
  }