import React, { useState } from "react";
import FormProvider from "../../components/hookform/FormProvider";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
} from "@mui/material";
import RHFTextField from "../../components/hookform/ReacthookFormTextField";
import { Eye, EyeSlash } from "phosphor-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = () => {
  const [showPassword, setShowPassoword] = useState(false);
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    Newpassword: Yup.string()
      .min(6, "Password must be of at least 6 characters")
      .required("Password is required"),
  });

  const defaultvalues = {
    email: "demo@chat.com",
    Newpassword: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultvalues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSUccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const { email, Newpassword } = data;
      const res = await signInWithEmailAndPassword(auth, email, Newpassword);
      reset({
        email:"",
        Newpassword:""
      });
      navigate("/app");
    } catch (error) {
      reset({
        email:"",
        Newpassword:""
      });
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}

          <RHFTextField name="email" label="Email address" />

          <RHFTextField
            name="Newpassword"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton
                    onClick={() => {
                      setShowPassoword(!showPassword);
                    }}
                  >
                    {showPassword ? <Eye /> : <EyeSlash />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack sx={{ alignItems: "flex-end", my: 2, cursor: "pointer" }}>
          <Link
            underline="always"
            variant="body2"
            color={"inherit"}
            to="/auth/reset-password"
            component={RouterLink}
          >
            Forget Password?
          </Link>
        </Stack>
        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          Login
        </Button>
      </FormProvider>
    </>
  );
};

export default LoginForm;
