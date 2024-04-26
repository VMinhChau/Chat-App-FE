import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ArchiveBox,
  CircleDashed,
  MagnifyingGlass,
  Users,
  X,
  Plus
} from "phosphor-react";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { useTheme } from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";
import BottomNav from "../../layouts/dashboard/BottomNav";
import { ChatList } from "../../data";
import ChatElement from "../../components/ChatElement";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import CreateSingleChat from "../../sections/Dashboard/CreateSingleChat";
import CreateGroupChat from "../../sections/Dashboard/CreateGroupChat";
// import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { FetchDirectConversations } from "../../redux/slices/conversation";
import { ReactComponent as AddGroup } from "../../assets/images/home/add_group_icon.svg"
import { ReactComponent as AddSingleChat } from "../../assets/images/home/add_single_chat_icon.svg"

const user_id = window.localStorage.getItem("user_id");

const Chats = () => {
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

    // dispatch(FetchDirectConversations({ conversations: ChatList }));
    dispatch(FetchDirectConversations({ user_id: user_id }))
    setFilteredUsers(conversations);
    // });
  }, []);

  const [openSingleChat, setOpenSingleChat] = useState(false);
  const [openGroupChat, setOpenGroupChat] = useState(false);

  const [searchItem, setSearchItem] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    const filteredItems = conversations.filter((conversation) =>
      conversation.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredItems);
  };

  const handleClear = () => {
    setSearchItem("");
    setFilteredUsers(conversations);
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          // height: "100%",
          width: isDesktop ? "21.9%" : "100vw",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#FFFFFF"
              : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          borderRadius: "35px",
          margin: "8px!important",
        }}
      >
        {!isDesktop && (
          // Bottom Nav
          <BottomNav />
        )}

        <Stack p={1.3} spacing={2} sx={{ maxHeight: "97vh" }}>
          <Stack
            alignItems={"center"}
            justifyContent="space-between"
            direction="row"
          >
            <Typography variant="h5">Chats</Typography>
            <Stack direction={"row"} alignItems="center" spacing={1}>
              <Tooltip title="New chat">
                <IconButton
                  onClick={() => {
                    setOpenSingleChat(true);
                  }}
                  sx={{ width: "max-content" }}
                >
                  <AddSingleChat width={20} height={20} />
                  {/* <Tooltip>Add</Tooltip> */}
                </IconButton>
              </Tooltip>
              <Tooltip title="Create group chat">
                <IconButton onClick={() => {
                  setOpenGroupChat(true);
                }}>
                  <AddGroup width={23} height={23} />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
          <Stack sx={{ width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#637381" />
              </SearchIconWrapper>
              <StyledInputBase
                // type="search"
                placeholder="Search…"
                endAdornment={
                  <IconButton
                    onClick={handleClear}
                    sx={{ visibility: searchItem ? "visible" : "hidden" }}
                  >
                    <X fontSize={"medium"} />
                  </IconButton>
                }
                onChange={handleInputChange}
                value={searchItem}
              />
            </Search>
          </Stack>
          {filteredUsers.length === 0 ? (
            <Box textAlign="center">No users found</Box>
          ) : (
            <Stack sx={{ flexGrow: 1, height: "100%", overflow: "scroll" }}>
              {/* <SimpleBarStyle
              timeout={500}
              clickOnTrack={true}
              onClick={() => console.log("ndd")}
            > */}

              <Stack spacing={0.8} width="100%">
                {filteredUsers.map((el, idx) => {
                  return <ChatElement {...el} />;
                })}
              </Stack>
              {/* </SimpleBarStyle> */}
            </Stack>
          )}
        </Stack>
      </Box>
      {openSingleChat && (
        <CreateSingleChat open={openSingleChat} handleClose={() => { setOpenSingleChat(false) }} />
      )}
      {openGroupChat && (
        <CreateGroupChat open={openGroupChat} handleClose={() => { setOpenGroupChat(false) }} />
      )}
    </>
  );
};

export default Chats;