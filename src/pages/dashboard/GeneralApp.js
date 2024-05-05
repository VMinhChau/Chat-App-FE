import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";

import { Link, useSearchParams } from "react-router-dom";
import ChatComponent from "./Home/Conversation";
import Chats from "./Home/Chats";
import Contact from "../../sections/Dashboard/Home/Contact";
import NoChat from "../../assets/Illustration/NoChat";
import { useSelector } from "react-redux";
import StarredMessages from "../../sections/Dashboard/StarredMessages";
import { Media } from "../../sections/Dashboard/Home/SharedMessages";
import BackgroundHome from "../../assets/images/auth/bg-auth.jpg";
import Members from "../../sections/Dashboard/Home/Members";

const GeneralApp = () => {
  const [searchParams] = useSearchParams();

  const theme = useTheme();

  const { sideBar, room_id, chat_type } = useSelector((state) => state.app);

  return (
    <>
      <Stack
        direction="row"
        sx={{
          width: "100%",
          backgroundImage: `url(${BackgroundHome})`,
          borderRadius: "35px 0 0 35px",
        }}
      // spacing="8px"
      // alignItems={"center"}
      >
        <Chats />
        <Box
          sx={{
            maxHeight: "100%",
            width: sideBar.open ? `54.5%` : "76.5%",
          }}
        >
          {room_id !== null ? (
            <ChatComponent />
          ) : (
            <Stack
              spacing={2}
              sx={{ height: "100%", width: "100%" }}
              alignItems="center"
              justifyContent={"center"}
            >
              <NoChat />
              <Typography variant="subtitle2">
                Select a conversation or start a{" "}
                <Link
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                  }}
                  to="/"
                >
                  new one
                </Link>
              </Typography>
            </Stack>
          )}
        </Box>
        {(room_id !== null && sideBar.open) &&
          (() => {
            switch (sideBar.type) {
              case "CONTACT":
                return <Contact />;

              case "SHARED_IMAGE":
                return <Media tab={0} />;

              case "SHARED_FILE":
                return <Media tab={2} />;

              case "MEMBERS":
                return <Members />;

              default:
                break;
            }
          })()}
      </Stack>
    </>
  );
};

export default GeneralApp;
