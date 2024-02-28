import React, { useCallback, useContext, useState } from "react";
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
import { AuthContext } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const ProfileForm = () => {
  const LoginSchema = Yup.object().shape({
    about: Yup.string().required("About is required"),
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
    setValue,
    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSUccessful },
  } = methods;

  const values = watch();

  // const handledrop = useCallback(
  //   (acceptedfiles) => {
  //     const file = acceptedfiles[0];

  //     const newFile = Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //     });

  //     if (file) {
  //       setValue("Avatarurl", newFile, { shouldValidate: true });
  //     }
  //   },
  //   [setValue]
  // );
  
  const {currentUser}=useContext(AuthContext);
  // console.log(currentUser);
  const onSubmit = async (data) => {
    try {
       const {About} = data;
      await setDoc(doc(db, "users", currentUser), {
        About
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

          <RHFTextField
            name="About"
            label="About"
            multiline
            rows={3}
            maxRows={5}
          />

          <Button
            color="primary"
            size="large"
            type="submit"
            variant="outlined"
          >
            Save
          </Button>
        </Stack>
      </FormProvider>
    </>
  );
};

export default ProfileForm;
