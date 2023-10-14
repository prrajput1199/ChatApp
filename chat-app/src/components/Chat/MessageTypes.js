import { useTheme } from "@emotion/react";
import {
  Box,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { DotsThreeCircleVertical, DownloadSimple, Image } from "phosphor-react";
import { element } from "prop-types";
import React from "react";
import { Message_options } from "../../data";

const DocMsg = ({ element }) => {
  const theme = useTheme();
  return (
    <div>
      <Stack
        direction={"row"}
        justifyContent={element.incoming ? "start" : "end"}
        spacing={1}
      >
        <Box
          p={1.5}
          sx={{
            backgroundColor: element.incoming
              ? theme.palette.background.default
              : theme.palette.primary.main,
            borderRadius: 1.5,
            width: "max-content",
          }}
        >
          <Stack spacing={2}>
            <Stack
              direction={"row"}
              p={2}
              spacing={3}
              alignItems={"center"}
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 1,
              }}
            >
              <Image size={48} />
              <Typography variant="caption">Abstract.msg</Typography>
              <IconButton>
                <DownloadSimple />
              </IconButton>
            </Stack>
            <Typography
              variant="body2"
              sx={{ color: element.incoming ? theme.palette.text : "#fff" }}
            >
              {element.message}
            </Typography>
          </Stack>
        </Box>
        <MessagesMenu/>
      </Stack>
    </div>
  );
};

const LinkMsg = ({ element }) => {
  const theme = useTheme();
  return (
    <div>
      <Stack
        direction={"row"}
        justifyContent={element.incoming ? "start" : "end"}
        spacing={1}
      >
        <Box
          p={1.5}
          sx={{
            backgroundColor: element.incoming
              ? theme.palette.background.default
              : theme.palette.primary.main,
            borderRadius: 1.5,
            width: "max-content",
          }}
        >
          <Stack spacing={2}>
            <Stack
              p={2}
              direction={"column"}
              spacing={3}
              alignItems={"start"}
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 1,
              }}
            >
              <img
                src={element.preview}
                alt={element.message}
                style={{ maxHeight: 210, borderRadius: "10px" }}
              ></img>
              <Stack spacing={2}>
                <Typography variant="subtitle2" color={theme.palette.text}>
                  Creating Chat App
                </Typography>
                <Typography
                  variant="subtitle2"
                  component={Link}
                  sx={{ color: theme.palette.primary.main }}
                  to="//https://www.youtube.com/"
                >
                  WWW.Youtube.com
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                color={element.incoming ? theme.palette.text : "#fff"}
              >
                {element.message}
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <MessagesMenu/>
      </Stack>
    </div>
  );
};

const ReplyMsg = ({ element }) => {
  const theme = useTheme();
  return (
    <div>
      <Stack
        direction={"row"}
        justifyContent={element.incoming ? "start" : "end"}
        spacing={1}
      >
        <Box
          p={1.5}
          sx={{
            backgroundColor: element.incoming
              ? theme.palette.background.default
              : theme.palette.primary.main,
            borderRadius: 1.5,
            width: "max-content",
          }}
        >
          <Stack spacing={2}>
            <Stack
              p={2}
              direction={"column"}
              spacing={3}
              alignItems={"center"}
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 1,
              }}
            >
              <Typography variant="body" color={theme.palette.text}>
                {element.message}
              </Typography>
            </Stack>
            <Typography
              variant="body"
              color={element.incoming ? theme.palette.text : "white"}
            >
              {element.reply}
            </Typography>
          </Stack>
        </Box>
        <MessagesMenu/>
      </Stack>
    </div>
  );
};

const MediaMsg = ({ element }) => {
  const theme = useTheme();
  return (
    <div>
      {console.log(theme)}
      <Stack
        direction={"row"}
        justifyContent={element.incoming ? "start" : "end"}
        spacing={1}
      >
        <Box
          p={1.5}
          sx={{
            backgroundColor: element.incoming
              ? theme.palette.background.default
              : theme.palette.primary.main,
            borderRadius: 1.5,
            width: "max-content",
          }}
        >
          <Stack>
            <img
              src={element.img}
              alt={element.message}
              style={{ maxHeight: "210px", borderRadius: "10px" }}
            ></img>
            <Typography
              variant="body"
              color={element.incoming ? theme.palette.text : "white"}
            >
              {element.message}
            </Typography>
          </Stack>
        </Box>
        <MessagesMenu/>
      </Stack>
    </div>
  );
};

const TextMsg = ({ element }) => {
  const theme = useTheme();

  return (
    <div>
      <Stack
        direction={"row"}
        justifyContent={element.incoming ? "start" : "end"}
        spacing={1}
      >
        <Box
          p={1.5}
          sx={{
            backgroundColor: element.incoming
              ? theme.palette.background.default
              : theme.palette.primary.main,
            borderRadius: 1.5,
            width: "max-content",
          }}
        >
          <Typography
            variant="body"
            color={element.incoming ? theme.palette.text : "white"}
          >
            {element.message}
          </Typography>
        </Box>
        <MessagesMenu/>
      </Stack>
    </div>
  );
};

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
            color: theme.palette.text,
          }}
        >
          {element.text}
        </Typography>
        <Divider width="46%" />
      </Stack>
    </div>
  );
};

const MessagesMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <DotsThreeCircleVertical
        size={20}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack direction={"column"} spacing={1}>
          {Message_options.map((element) => {
            return (
              <>
                <MenuItem onClick={() => handleClick}>{element.title}</MenuItem>
              </>
            );
          })}
        </Stack>
      </Menu>
    </>
  );
};

export { Timeline, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg, MessagesMenu };
