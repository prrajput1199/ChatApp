import { Link, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import NewpasswordForm from "../../settings/Auth/NewpasswordForm";

const Newpassword = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h3" paragraph>
          Reset Password
        </Typography>
        <Typography color={"text.secondary"} mb={5}>
          Please enter your new password
        </Typography>

      </Stack>

      {/* Newpassword */}
      <NewpasswordForm/>

      <Link color={"inherit"} variant="subtitle2" sx={{
        mt:5,
        mx:"auto",
        alignItems:"center",
        display:"inline"
      }} to={"/auth/login"} component={RouterLink}>
        <CaretLeft/>Return to sign in
      </Link>
    </>
  );
};

export default Newpassword;
