import React from "react";
import PropTypes from "prop-types";
// form
import { useFormContexrt, controller, Controller } from "react-hook-form";
//mui
import { TextField } from "@mui/material";

RHFTextfield.PropTypes = {
  name: PropTypes.string,
  helpertext: PropTypes.node,
};

export default function RHFTextfield({ name, helpertext, ...other }) {
  const { control } = useFormContexrt();
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          <TextField
            {...field}
            fullWidth
            error={!!error}
            helperText={error ? error.message : helpertext}
            {...other}
            value={typeof field.value==="number" && field.value===0? "" : field.value}
          />;
        }}
      />
    </>
  );
}
