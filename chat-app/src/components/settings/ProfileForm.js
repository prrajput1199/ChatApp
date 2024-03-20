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
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const ProfileForm = () => {
  const LoginSchema = Yup.object().shape({
    About: Yup.string().required("About is required"),
    Country: Yup.string().required("Country Name is required"),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
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

  const { currentUser } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const { About, Country } = data;
      console.log("about", "=>", About);
      await updateDoc(doc(db, "users", currentUser.uid), {
        [currentUser.uid + ".profileinfo"]: {
          About:About,
          Country: Country,
        }
      });
      reset({
        About: "",
        Country: "",
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

          <RHFTextField name="About" label="About" multiline />

          <RHFTextField name="Country" label="Country" multiline />

          <Button color="primary" size="large" type="submit" variant="outlined">
            Save
          </Button>
        </Stack>
      </FormProvider>
    </>
  );
};

export default ProfileForm;
