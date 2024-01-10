import { Box, Stack } from "@mui/material";
import { element } from "prop-types";
import React from "react";
import { Chat_History } from "../../data/index";
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, Timeline } from "./MessageTypes.js";
import { KeyReturn } from "phosphor-react";
import { MessagesMenu } from "./MessageTypes.js";

const Messages = ({Menu}) => {
  return (
    <>
      <Box p={3}>
        <Stack spacing={3} direction={"column"}>
          {
          Chat_History.map((element) => {
            if(element.type==="divider"){
              return <Timeline element={element}/>;
            }
            
            else if(element.type==="msg"){
              if(element.subtype==="img"){
                return <MediaMsg element={element} Menu={Menu}/>;
              }
              else if(element.subtype==="doc"){
                return <DocMsg element={element} Menu={Menu}/>;
              }
              else if(element.subtype==="link"){
                return <LinkMsg element={element} Menu={Menu}/>;
              }
              else if(element.subtype==="reply"){
                return <ReplyMsg element={element} Menu={Menu}/>;
              }
              else{
                return <TextMsg element={element} Menu={Menu}/>;
              } 
            }
          })}
        </Stack>
      </Box>
    </>
  );
};

export default Messages;
