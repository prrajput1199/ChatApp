import { Divider, IconButton, Stack } from "@mui/material";
import React from "react";
import { GoogleLogo, GithubLogo, TwitterLogo } from "phosphor-react";

const AuthSection = () => {
  return (
    <>
      <Divider
        sx={{
          my: 2.5,
          typography: "overline",
          color: "text.disabled",
          "&::before,::after": {
            borderTopStyle: "dashed",
          },
        }}
      >
        OK
      </Divider>
      <Stack
        direction={"row"}
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton>
          <GoogleLogo size={32} color="#DF3E30"/>
        </IconButton>
        <IconButton color="inherit">
          <GithubLogo size={32} />
        </IconButton>
        <IconButton>
          <TwitterLogo color="#1C9CEA"/>
        </IconButton>
      </Stack>
    </>
  );
};

export default AuthSection;
