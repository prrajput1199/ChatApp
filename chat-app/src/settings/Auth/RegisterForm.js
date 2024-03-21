import React, { useEffect, useReducer, useState } from "react";
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
import profilePhoto from "../../Images/ProfileImage.jpeg";
import { v4 } from "uuid";
import { Loadable } from "../../routes";

const RegisterForm = () => {
  const [showPassword, setShowPassoword] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [newUser, setnewUser] = useState(false);
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    displayName: Yup.string().required("Name is required"),
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

  const OnSubmit = async (data) => {
    try {
      const { email, Newpassword, displayName } = data;
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        Newpassword
      );

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, photo);

      uploadTask.on(
        "state_changed",

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              displayName,
              email,
              photoURL: downloadURL,
              uid: res.user.uid,
            });

            //  create userchat folder
            await setDoc(doc(db, "userChats", res.user.uid), {});
          });
        }
      );
      navigate("/app");
      // setTimeout(() => {
      //   <Loadable>{window.location.reload(false)}</Loadable>;
      // }, 10000);
      setTimeout(() => {
        <Loadable>{window.location.reload(false)}</Loadable>;
      }, 5000);
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
      <FormProvider methods={methods} onSubmit={handleSubmit(OnSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}

          <RHFTextField name="displayName" label="Name" />

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
              src={photo}
              onChange={(e) => setPhoto(e.target.files[0])}
              type="file"
              id="file"
              style={{ display: "none" }}
            />

            <label htmlFor="file">
              <Stack direction={"row"} alignItems={"center"} spacing={3}>
                <Avatar src={profilePhoto} alt="Sampleprofile" />
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
