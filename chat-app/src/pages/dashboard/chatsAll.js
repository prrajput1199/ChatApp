import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@emotion/react";

import { collection, doc, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../contexts/AuthContext";

const ChatsAll = ({ setChats }) => {
  const [allUser, setAlluser] = useState(null);

  const { currentUser } = useContext(AuthContext);

  const theme = useTheme();

  useEffect(() => {
    const getchatdata = () => {
      const getRes = onSnapshot(
        doc(db, "userChats", currentUser.uid),
        (doc) => {
          setChats(doc.data());
          //   setUser(null);
        }
      );

      return () => {
        getRes();
      };
    };
    currentUser.uid && getchatdata();

    const getalluser = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userdata = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        userdata.push({ ...doc.data() });
      });

      setAlluser(userdata);
    };
    return () => {
      getalluser();
    };
  }, [currentUser.uid]);

  return (
    <div>
 
        <Typography variant="caption" color={"#676767"} >
          User List
        </Typography>

        {allUser &&
          allUser.map((el) => {
            //chatsection paste here
            return (
              <Box
                sx={{
                  backgroundColor:
                    theme.palette.mode === "Light"
                      ? "white"
                      : theme.palette.background.paper,
                  mt:'16px',
                  height: "57px",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
                key={el.uid}
              >
                <Stack
                  direction={"row"}
                  gap={3}
                  alignItems={"center"}
                  marginTop={"6px"}
                  width={"100%"}
                  height={"100%"}
                >
                  <Avatar alt="Remy Sharp" src={el.photoURL} />

                  <Typography variant="subtitle2">{el.displayName}</Typography>
                </Stack>
              </Box>
            );
          })}

    </div>
  );
};

export default ChatsAll;
