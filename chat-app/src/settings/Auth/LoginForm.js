import React, { useState } from "react";
import FormProvider from "../../components/hook-form/FormProvider";
import * as Yup from "yup";
import useForm from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Loginform = () => {
  const [showPassword, setShowPassoword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is correct"),
  });

  const defaultvalues = {
    email: "demo@chat.com",
    password: "chat1234",
  };

  const methods = useForm({
    resolver: yupResolver(Loginform),
    defaultvalues,
  });
  return (
    <>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
      ></FormProvider>
    </>
  );
};

export default Loginform;
