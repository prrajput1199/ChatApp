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
import { Link as RouterLink } from "react-router-dom";

const ProfileForm = () => {
  const LoginSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    about: Yup.string().required("About is required"),
    Avatar: Yup.string().required("Avatar is correct").nullable(true),
  });

  const defaultvalues = {
    name: "Pratik Rajput",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultvalues,
  });

  const {
    reset,
    watch,
    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSUccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      //submit data to backend
    } catch (error) {
      console.log(error);
      reset();
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
            name="password"
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

export default ProfileForm;
