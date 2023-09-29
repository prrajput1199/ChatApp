import { useTheme } from "@emotion/react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { element } from "prop-types";
import React from "react";

const TextMsg = ({ element }) => {
  const theme = useTheme();
  return (
    <div>
      <Stack
        direction={"row"}
        justifyContent={element.incoming ? "start" : end}
      >
        <Box
          p={1.5}
          sx={{
            backgroundColor: element.incoming
              ? theme.pallete.background.default
              : theme.pallete.primary.main,
               borderRadius:1.5,
               width:"max-content",
            
          }}
        >
            <Typography variant="body" color = { element.incoming ? theme.pallete.text : "white"}>
                {element.message}
            </Typography>
        </Box>
      </Stack>
    </div>
  );
};

export default MessageTypes;

const Timeline = ({ element }) => {
  const theme = useTheme();
  return (
    <div>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Divider width="46%" />
        <Typography
          variant="caption"
          sx={{
            color: theme.pallete.text,
          }}
        >
          {element.text}
        </Typography>
        <Divider width="46%" />
      </Stack>
    </div>
  );
};

export { Timeline, TextMsg };
