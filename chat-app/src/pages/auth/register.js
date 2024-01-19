import React from "react";
import { Link, Stack, Typography } from "@mui/material";
import { Link as Routerlink } from "react-router-dom";
import RegisterForm from "../../settings/Auth/RegisterForm";
import AuthSection from "../../settings/Auth/AuthSection";

const Register = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }} direction={"column"}>
        <Typography variant="h4">Get started with chat-chat?</Typography>
        <Stack direction={"row"} spacing={0.5}>
          <Typography variant="body2">Alredy have an account?</Typography>
          <Link component={Routerlink} to="/auth/login" variant="subtitle2">
            Sign in
          </Link>
        </Stack>
      </Stack>

      {/* Register form */}
      <RegisterForm/>

      <Typography
        component={"div"}
        sx={{
          color: "text.secondary",
          mt: 2,
          typography: "caption",
          textAlign: "center",
        }}
      >
        {"By signing up I agree to "}
        <Link underline="always" color="text.primary">
          Terms of service
        </Link>
        {" and "}
        <Link underline="always" color="text.primary">
          Privacy policy
        </Link>
      </Typography>

      <AuthSection/>
    </>
  );
};

export default Register;
