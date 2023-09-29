import {
  Avatar,
  Box,
  Stack,
  Badge,
  Typography,
  IconButton,
  Divider,
  TextField,
  backdropClasses,
  InputAdornment,
  useTheme,
} from "@mui/material";
import React from "react";
import { faker } from "@faker-js/faker";
import styled from "@emotion/styled";
import { LinkSimple, PaperPlaneTilt, Smiley } from "phosphor-react";

const Footer = () => {
  const theme = useTheme();

  const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBased-input": {
      paddingTop: "12px",
      paddingBottom: "12px",
    },
  }));

  return (
    <div>
      <Box
        p={2}
        sx={{
          height: "100px",
          width: "100%",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        }}
      >
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={2}>
          <Stack width={"100%"}>
            <StyledInput
              fullWidth
              placeholder="Write a message"
              InputProps={{
                // disableUnderline: "true",
                startAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <LinkSimple />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <Smiley />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack>
            <Box
              sx={{
                borderRadius: 1.5,
                height: "100%",
                width: "100%",
              }}
            >
              <Stack
                width={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  backgroundColor:
                  theme.palette.mode === "light"
                    ? theme.palette.primary.main
                    : theme.palette.background.paper,
                }}
              >
                <IconButton>
                  <PaperPlaneTilt color="white" />
                </IconButton>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default Footer;
