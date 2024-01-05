// import { useTheme } from '@emotion/react';
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import React from 'react'
// import Typography from '../../theme/overrides/Typography';
import { X } from 'phosphor-react';
import { ToggleSidebar } from '../../Redux/slices/app';
import { useDispatch } from 'react-redux';

const Contact = () => {
  const theme=useTheme();
  const dispatch = useDispatch();
  return (
    <div>
     
      <Box sx={{width:"320px",height:"100vh"}}>
        <Stack direction={"column"} sx={{height:"100%"}}>
           {/* Header */}
           <Box sx={{
            boxShadow:"0px 0px 2px rgba(0,0,0,0.25)",
            width:"100%",
            backgroundColor:theme.palette.mode==="light"?"#F8FAFF" : theme.mode.background,
           }}>
            <Stack direction={"row"} sx={{
              justifyContent:"space-between",
              alignItems:"center",
              p:"16px"
            }}>
              <Typography variant="subtitle2">
              Contact
              </Typography>
             <IconButton onClick={()=>{
              dispatch(ToggleSidebar());
             }}>
              <X/>
             </IconButton>
            </Stack>
           </Box>

           {/* body */}
        </Stack>
         
      </Box>
    </div>
  )
}

export default Contact;
