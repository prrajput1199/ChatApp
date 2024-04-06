import React, { useCallback, useContext, useState } from "react";
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
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { db, storage } from "../../firebase";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import profilePhoto from "../../Images/ProfileImage.jpeg";
import { updateProfile } from "firebase/auth";
import { ChatContext } from "../../contexts/ChatContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";

const ProfileForm = ({ user }) => {
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
  const [photo, setPhoto] = useState(null);
  
  const HandleSendfiles = (e) => {
    const file = e.target.files[0];
    const maxSizeInBytes = 250000; // 1MB limit (change this as per your requirement)

    if (file && file.size > maxSizeInBytes) {
      alert("File size exceeds the limit (225 kb)");
    } else {
      setPhoto(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const { About, Country } = data;
      // console.log("about", "=>", About);

      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, photo);

      uploadTask.on("state_changed", () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, "users", currentUser.uid), {
            profileInfo: {
              photoURL: downloadURL,
              About: About,
              Country: Country,
            },
          });
        });
      });
      reset({
        About: "",
        Country: "",
      });
      setPhoto(null);
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

          <Stack direction={"column"} spacing={3} alignItems={"center"}>
            <label htmlFor="file">
              <Stack direction={"row"} alignItems={"center"} spacing={3}>
                <Avatar src={profilePhoto} alt="Sampleprofile" />
                <p>Add an Avatar</p>
              </Stack>
            </label>
            <input
              src={photo}
              onChange={(e) => HandleSendfiles(e)}
              type="file"
              id="file"
              name="file"
              accept="image/*"
            />
          </Stack>

          <Button color="primary" size="large" type="submit" variant="outlined">
            Save
          </Button>
        </Stack>
      </FormProvider>
    </>
  );
};

export default ProfileForm;
