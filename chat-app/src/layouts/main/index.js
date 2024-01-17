import { Container, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../assets/Images/chatapplogo.jpg"

const MainLayout = () => {
  return (
    <>
      <Container sx={{mb:5}} maxWidth={"sm"}>
        <Stack spacing={5}>
          <Stack sx={{width:"100%",direction:"column",alignItems:"center",py:"24px"}}>
            <img src={Logo} alt="" style={{height:140,width:140,borderRadius:"15px"}}/>
          </Stack>
         
        </Stack>
        {/* <div>Main Layout</div> */}

        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
