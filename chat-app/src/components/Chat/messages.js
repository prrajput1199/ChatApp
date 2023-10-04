import { Box, Stack } from "@mui/material";
import { element } from "prop-types";
import React from "react";
import { Chat_History } from "../../data/index";
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, Timeline } from "./MessageTypes.js";
import { KeyReturn } from "phosphor-react";

const Messages = () => {
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
                return <MediaMsg element={element}/>;
              }
              else if(element.subtype==="doc"){
                return <DocMsg element={element}/>;
              }
              else if(element.subtype==="link"){
                return <LinkMsg element={element}/>;
              }
              else if(element.subtype==="reply"){
                return <ReplyMsg element={element}/>;
              }
              else{
                return <TextMsg element={element}/>;
              } 
            }
          })}
        </Stack>
      </Box>
    </>
  );
};

export default Messages;
