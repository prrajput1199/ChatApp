import React from "react";
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const DashboardLayout = () => {
  // const theme = useTheme();
  // console.log(theme);

  return (
    <>
      <Stack direction={"row"} height={"100vh"}>
        <SideBar/>
        <Outlet />
      </Stack>
    </>
  );
};

export default DashboardLayout;
