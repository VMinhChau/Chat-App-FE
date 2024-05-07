import { Stack, Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { SimpleBarStyle } from "../../../components/Scrollbar";

import { ChatHeader, ChatFooter } from "../../../components/Chat";
import useResponsive from "../../../hooks/useResponsive";
import { Chat_History } from "../../../data";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from "../../../sections/Dashboard/Home/Conversation";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchCurrentMessages,
  SetCurrentConversation,
} from "../../../redux/slices/conversation";
import Contact from "../../../sections/Dashboard/Home/Contact";
import Media from "../../../sections/Dashboard/Home/SharedMessages";
// import { socket } from "../../socket";

const Conversation = ({ isMobile, menu }) => {
  const dispatch = useDispatch();

  const { conversations, current_messages } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const { room_id, chat_type } = useSelector((state) => state.app);

  useEffect(() => {
    console.log(room_id);
    dispatch(FetchCurrentMessages({ chat_id: room_id }));
  }, []);

  return (
    <Box p={isMobile ? 1 : 3}>
      <Stack spacing={3}>
        {chat_type === "privatechat" && current_messages?.map((el, idx) => {
          // switch (el.type) {
          //   case "divider":
          //     return (
          //       // Timeline
          //       <Timeline el={el} key={idx} />
          //     );

          //   case "msg":
          //     switch (el.subtype) {
          //       case "img":
          //         return (
          //           // Media Message
          //           <MediaMsg el={el} menu={menu} key={idx} />
          //         );

          //       case "doc":
          //         return (
          //           // Doc Message
          //           <DocMsg el={el} menu={menu} key={idx} />
          //         );
          //       case "Link":
          //         return (
          //           //  Link Message
          //           <LinkMsg el={el} menu={menu} key={idx} />
          //         );

          //       case "reply":
          //         return (
          //           //  ReplyMessage
          //           <ReplyMsg el={el} menu={menu} key={idx} />
          //         );

          //       default:
          //         return (
          //           // Text Message
          //           <TextMsg el={el} menu={menu} key={idx} />
          //         );
          //     }

          //   default:
          //     return <TextMsg el={el} menu={menu} key={idx} />;
          if (el.message?.startsWith('data:image')) {
            return (
              // Media Message
              <MediaMsg el={el} menu={menu} key={idx} />
            );
          }
          else {
            return (
              // Text Message
              <TextMsg el={el} menu={menu} key={idx} />
            );
          }
        })}
      </Stack>
    </Box>
  );
};

const ChatComponent = () => {
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const theme = useTheme();

  const messageListRef = useRef(null);

  const { current_messages } = useSelector(
    (state) => state.conversation.direct_chat
  );

  const { sideBar } = useSelector((state) => state.app);

  useEffect(() => {
    // Scroll to the bottom of the message list when new messages are added
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [current_messages]);

  return (
    <Stack
      height={"100%"}
      maxHeight={"100vh"}
      width={isMobile ? "100vw" : "auto"}
    // borderRadius="35px"
    // padding="8px 8px 8px 0px!important"
    >
      <ChatHeader />
      <Box
        ref={messageListRef}
        width={"100%"}
        sx={{
          position: "relative",
          overflow: "scroll",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background.paper,

          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          height: "90%"
        }}
      >
        <SimpleBarStyle timeout={500} clickOnTrack={false}>
          <Conversation menu={true} isMobile={isMobile} />
        </SimpleBarStyle>
      </Box>
      <ChatFooter />
    </Stack>

  );
};

export default ChatComponent;

export { Conversation };
