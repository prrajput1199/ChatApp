import React, { useState } from "react";
import FormProvider from "../../components/hookform/FormProvider";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Alert, Button, Stack } from "@mui/material";
import RHFTextField from "../../components/hookform/ReacthookFormTextField";
import { auth, db } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPasswordForm = () => {
  const ResetpasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const defaultvalues = {
    email: "demo@chat.com",
  };

  const methods = useForm({
    resolver: yupResolver(ResetpasswordSchema),
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
      //submit data to backend
      const { email } = data;
      await sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Password reset email sent!");
          reset();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
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
            Send Link
          </Button>
        </Stack>
      </FormProvider>
    </>
  );
};

export default ResetPasswordForm;
