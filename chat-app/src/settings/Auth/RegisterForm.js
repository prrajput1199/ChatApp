import React, { useState } from "react";
import FormProvider from "../../components/hookform/FormProvider";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Alert,
  Avatar,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
} from "@mui/material";
import RHFTextField from "../../components/hookform/ReacthookFormTextField";
import { Eye, EyeSlash } from "phosphor-react";
// import firebase from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const RegisterForm = () => {
  const [showPassword, setShowPassoword] = useState(false);
  const [photo,setPhoto]=useState();
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    Newpassword: Yup.string()
      .min(6, "Password must be of at least 6 characters")
      .required("Password is required"),
    Confirmpassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("Newpassword"), null], "Password must match"),
  });

  const defaultvalues = {
    // FirstName: "",
    // LastName: "",
    email: "demo@chat.com",
    Newpassword: "",
    Confirmpassword: "",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultvalues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitSUccessful },
  } = methods;

  const onSubmit = async (data) => {

    try {
      const { email, Newpassword, name } = data;
      console.log(data);
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        Newpassword
      );
      navigate("/app");

      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef,photo);
      uploadTask.on(
        "state_changed",

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateProfile(res.user, {
              name,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              name,
              email,
              photoURL: downloadURL,
              uid: res.user.uid,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
          });
        }
      );
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

          <RHFTextField name="name" label="Name" />

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

          <RHFTextField
            name="Confirmpassword"
            label="confirm password"
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
          <Stack>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
               value={photo}

            />
            <label htmlFor="file">
              <Stack direction={"row"} alignItems={"center"} spacing={3}>
                <Avatar src="ProfileImage.jpeg" />
                <p>Add an Avatar</p>
              </Stack>
            </label>
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
            Create an account
          </Button>
        </Stack>
      </FormProvider>
    </>
  );
};

export default RegisterForm;
