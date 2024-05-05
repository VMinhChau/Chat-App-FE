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
import GroupChatElement from "../../../components/GroupChatElement";
// import Friends from "../../../sections/Dashboard/Friends";
// import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchGroupConversations,
  FetchPrivateConversations
} from "../../../redux/slices/conversation";
import { UpdateTab } from "../../../redux/slices/app";
import { useNavigate } from "react-router-dom";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../../components/Search";
import { Phone_Menu } from "../../../data";

const Options = () => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");

  const dispatch = useDispatch();

  const { conversations } = useSelector(
    (state) => state.conversation.direct_chat
  );

  useEffect(() => {
    const user_id = window.localStorage.getItem("user_id");
    dispatch(FetchGroupConversations({ user_id: user_id }))
    dispatch(FetchPrivateConversations({ user_id: user_id }))
  }, []);

  const handleChangeTab = (index) => {
    // dispatch(UpdateTab({ tab: index }));
    // navigate(getPath(index));
  };

  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState(0);

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
        p={1.3}
      >
        <Stack spacing={2} sx={{ maxHeight: "97vh" }}>
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
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              onClick={() => {
                // handleChangeTab(el.index);
                setSelectedTab(0);
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
                setSelectedTab(1);
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
        </Stack>
      </Box>
    </>
  );
};

export default Options;
