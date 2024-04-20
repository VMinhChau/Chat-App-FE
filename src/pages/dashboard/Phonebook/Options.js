import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArchiveBox,
  CircleDashed,
  MagnifyingGlass,
  Users,
} from "phosphor-react";
import { SimpleBarStyle } from "../../../components/Scrollbar";
import { useTheme } from "@mui/material/styles";
import useResponsive from "../../../hooks/useResponsive";
import BottomNav from "../../../layouts/dashboard/BottomNav";
import { ChatList } from "../../../data";
import ChatElement from "../../../components/ChatElement";
// import Friends from "../../../sections/Dashboard/Friends";
// import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchDirectConversations,
  SetCurrentConversation,
} from "../../../redux/slices/conversation";
import { UpdateTab } from "../../../redux/slices/app";
import { useNavigate } from "react-router-dom";

import {
    Search,
    SearchIconWrapper,
    StyledInputBase,
  } from "../../../components/Search";

import { Phone_Menu } from "../../../data";  



const user_id = window.localStorage.getItem("user_id");

const getPath = (index) => {
    switch (index) {
      case 0:
        return "/phonebook/contact/";
  
      case 1:
        return "/phonebook/group/";
  
      default:
        break;
    }
  };

const Options = () => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");

  const dispatch = useDispatch();

  const { conversations } = useSelector(
    (state) => state.conversation.direct_chat
  );

  useEffect(() => {
  //   socket.emit("get_direct_conversations", { user_id }, (data) => {
  //     console.log(data); // this data is the list of conversations
  //     // dispatch action

      dispatch(FetchDirectConversations({ conversations: ChatList }));
    // });
  }, []);

  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  
  const handleChangeTab = (index) => {
    dispatch(UpdateTab({ tab: index }));
    navigate(getPath(index));
  };

  const navigate = useNavigate();
  

  return (
    <>
      <Box
        sx={{
          position: "relative",
          // height: "100%",
          width: isDesktop ? '21.9%' : "100vw",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#FFFFFF"
              : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          borderRadius: "35px",
          margin: "8px",
        }}
      >
        <Stack p={1.3} spacing={2} sx={{ maxHeight: "97vh" }}>
            <Stack sx={{ width: "100%" }}>
                <Search>
                    <SearchIconWrapper>
                    <MagnifyingGlass color="#709CE6" />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    />
                </Search>
            </Stack>
        </Stack>
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            onClick={() => {
            // handleChangeTab(el.index);
            }}
        >
            <Box
                sx={{
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                >
                {Phone_Menu[0].icon}
                </Box>
            <Typography
            variant="subtitle1"
            color={theme.palette.primary.main}
            >
            Contact list
            </Typography>
        </Stack>
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            onClick={() => {
            // handleChangeTab(el.index);
            }}
        >
            <Box
                sx={{
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                >
                {Phone_Menu[0].icon}
                </Box>
            <Typography
            variant="subtitle1"
            color={theme.palette.primary.main}
            >
            Group list
            </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default Options;
