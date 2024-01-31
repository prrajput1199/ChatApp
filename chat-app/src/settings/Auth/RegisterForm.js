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
// import firebase from 'firebase/app';
import  { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase";

const RegisterForm = () => {
  const [showPassword, setShowPassoword] = useState(false);


  const RegisterSchema = Yup.object().shape({
    // FirstName: Yup.string().required("First Name is required"),
    // LastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is correct"),
  });

  const defaultvalues = {
    // FirstName: "",
    // LastName: "",
    email: "demo@chat.com",
    password: "chat1234",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
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
      const { email, password } = data;
      await createUserWithEmailAndPassword(auth,email, password);
      alert('Account created successfully!');
    } catch (error) {
      
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
          {/* <Stack direction={{ xs: "column", sm: "row" }} spacing={2}> 
            <RHFTextField name="FirstName" label="First name" />
            <RHFTextField name="LastName" label="Last name"/>
          </Stack> */}

          <RHFTextField name="email" label="Email address"/>

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
            Create an account
          </Button>
        </Stack>
      </FormProvider>
    </>
  );
};

export default RegisterForm;
