import { Box, Stack } from "@mui/material";
import { element } from "prop-types";
import React from "react";
import { Chat_History } from "../../data/index";
import { TextMsg, Timeline } from "./MessageTypes";
import { KeyReturn } from "phosphor-react";

const Messages = () => {
  return (
    <>
      <Box p={3}>
        <Stack spacing={3} direction={"column"}>
          {Chat_History.map((element) => {

            switch (element.type) {
              case "divider":
                return <Timeline element={element}/>;

              case "msg":
                switch (element.subtype) {
                  case "img":
                    //img
                    break;

                  case "doc":
                    //doc
                    break;

                  case "link":
                    //link
                    break;

                  case "reply":
                    //reply
                    break;

                  default:
                    return <TextMsg element={element}/>;
                }

              default: 
                return <></>;
            }
          })}

        </Stack>
      </Box>
    </>
  );
};

export default Messages;
