import React, { useCallback, useState } from "react";
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
    Name: Yup.string().required("name is required"),
    about: Yup.string().required("About is required"),
    Avatarurl: Yup.string().required("Avatar is correct").nullable(true),
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

  const handledrop = useCallback(
    (acceptedfiles) => {
      const file = acceptedfiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("Avatarurl", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );
  const onSubmit = async (data) => {
    try {
      //submit data to backend
      console.log("Data", data);
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
            name="Name"
            label="Name"
            helperText={"This name is visible to contacts"}
          />

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
