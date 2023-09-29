import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import TextField from "@mui/material/TextField";
import { Archive, MagnifyingGlass } from "phosphor-react";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import styled from "@emotion/styled";
import { faker } from "@faker-js/faker";
import { ChatList } from "../../data";
import SimpleBar from "simplebar-react";
import { SimpleBarStyle } from "../../components/Scrollbar";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Chats = () => {
  const theme = useTheme();

  const ChatSection = ({
    id,
    img,
    name,
    msg,
    time,
    unread,
    pinned,
    online,
  }) => {
    return (
      <Box
        sx={{
          backgroundColor: theme.palette.mode ==="Light" ? "white" : theme.palette.background.paper,
          width: "90%",
          height: "57px",
          borderRadius: "20px",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          marginTop={"6px"}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            marginTop={"2px"}
          >
            {online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                sx={{ marginLeft: "0px" }}
              >
                <Avatar alt="Remy Sharp" src={faker.image.avatar()} />
              </StyledBadge>
            ) : (
              <Avatar alt="Remy Sharp" src={faker.image.avatar()} />
            )}
            <Stack direction={"column"} alignItems={"center"}>
              <Typography variant="subtitle2">{name}</Typography>
              <Typography variant="caption">{msg}</Typography>
            </Stack>
          </Stack>
          <Stack
            direction={"column"}
            alignItems={"center"}
            spacing={1.2}
            marginRight={"15px"}
          >
            <Typography variant="caption">{time}</Typography>
            <Badge color="primary" badgeContent={unread}></Badge>
          </Stack>
        </Stack>
      </Box>
    );
  };

  function BasicTextFields() {
    return (
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "90%", borderRadius: 2 },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MagnifyingGlass size={32} />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          height: "100%",
          width: "300px",
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          backgroundColor: theme.palette.mode ==="Light" ? "#f3fdfa" : theme.palette.background.paper
        }}
      >
        <Stack sx={{ height: "100%" }}>
          <Stack padding={3} height={"100%"}>
            <Typography variant="h5">Chats</Typography>
          </Stack>
          <Stack spacing={3} height={"100%"}>
            <BasicTextFields />
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
              <Archive size={24} />
              <Button>Archives</Button>
            </Stack>
            <Divider />
            <Stack sx={{ height: "100%", flexGrow: "1", overflow: "scroll" }} spacing={2}>
       
                <SimpleBarStyle timeout={500} clickOnTrack={false}>
                <Stack direction={"column"} spacing={2} alignItems={"center"}>
                    <Typography
                      variant="caption"
                      color={"#676767"}
                      marginLeft={3}
                    >
                      Pinned
                    </Typography>
                    {ChatList.filter((Element) => {
                      return Element.pinned;
                    }).map((Element) => {
                      return <ChatSection {...Element} />;
                    })}
                  </Stack>

                  <Stack direction={"column"} spacing={2} alignItems={"center"} >
                    <Typography variant="caption" color={"#676767"} spacing={2}>
                      All Chats
                    </Typography>
                    {ChatList.filter((Element) => {
                      return !Element.pinned;
                    }).map((Element) => {
                      return <ChatSection {...Element} />;
                    })}
                  </Stack>
                </SimpleBarStyle>        
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Chats;
