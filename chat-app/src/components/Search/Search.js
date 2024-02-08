import {
  Box,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { MagnifyingGlass } from "phosphor-react";
import { useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function BasicTextFields({
  username,
  err,
  user,
  setErr,
  setUser,
  setUserName,
}) {
  const HandleSearch = async () => {
    const q = query(collection(db, "users"), where("name", "==", username));

    const querySnapshot = await getDocs(q);

    try {
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
  };
  const handleKey = (e) => {
    e.code == "enter" && HandleSearch();
  };
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
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKey}
          value={username}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  cursor: "pointer",
                }}
              >
                <MagnifyingGlass size={32} onClick={HandleSearch} />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </Box>
  );
}
