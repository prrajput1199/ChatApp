import { Link, Stack, Typography } from '@mui/material';
import React from 'react'
import AuthSection from '../../settings/Auth/AuthSection';
import Loginform from '../../settings/Auth/LoginForm';

const LoginPage = () => {
  return (
    <>
       <Stack spacing={5} sx={{
        position:"relative",
        mb:5,
        justifyContent:"flex-start",
        alignItems:"flex-start"
       }}> 
       <Typography variant='h4'>Login to Tawk</Typography>
      <Stack direction={"row"} spacing={2}>
        <Typography>New user</Typography>
        <Link to="/auth/register">Create Account</Link>
      </Stack>
       </Stack>

       {/* Loginform */}
       <Loginform/>
      

       <AuthSection/>
       {/* auth */}
    </>
  )
}

export default LoginPage;
