import { Link, Stack, Typography } from "@mui/material";
import React from "react";
import AuthSection from "../../settings/Auth/AuthSection";
import { Link as RouterLink } from "react-router-dom";
import LoginForm from "../../settings/Auth/LoginForm";


const LoginPage = () => {
  return (
    <>
      <Stack
        spacing={5}
        sx={{
          position: "relative",
          mb: 5,
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h4">Login to Chat-Chat</Typography>
        <Stack direction={"row"} spacing={2}>
          <Typography>New user</Typography>
          <Link to="/auth/register" component={RouterLink}>Create Account</Link>
        </Stack>
       
      </Stack>

      {/* Loginform */}
      <LoginForm />  
    
      {/* <AuthSection/> */}
      {/* auth */}
    </>
  );
};

export default LoginPage;
