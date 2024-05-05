import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import {
  ArchiveBox,
  CircleDashed,
  MagnifyingGlass,
  Users,
  X
} from "phosphor-react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../../components/Search";
import { alpha, useTheme } from "@mui/material/styles";
import useResponsive from "../../../hooks/useResponsive";
import Options from "./Options";
import MainPhoneBook from "./MainPhoneBook";
import BackgroundHome from "../../../assets/images/auth/bg-auth.jpg";
import { Phone_Menu } from "../../../data";
import { useDispatch, useSelector } from "react-redux";

const Phonebook = () => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");

  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = useState(0);
  const [searchItem, setSearchItem] = useState("");
  // const [filteredPrivateChat, setFilteredPrivateChat] = useState(private_conversations);
  // const [filteredGroupChat, setFilteredGroupChat] = useState(group_conversations);

  // const handleInputChange = (e) => {
  //   const searchTerm = e.target.value;
  //   setSearchItem(searchTerm);
  //   const filteredGroupChat = group_conversations.filter((conversation) =>
  //     conversation.title?.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   const filteredPrivateChat = private_conversations.filter((conversation) =>
  //     conversation.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredPrivateChat(filteredPrivateChat);
  //   setFilteredGroupChat(filteredGroupChat);
  // };

  // const handleClear = () => {
  //   setSearchItem("");
  //   setFilteredGroupChat(group_conversations);
  //   setFilteredPrivateChat(private_conversations);
  // };

  return (
    <>
      <Stack
        direction="row"
        sx={{
          width: "100%",
          backgroundImage: `url(${BackgroundHome})`,
          borderRadius: "35px 0 0 35px",
        }}
      >
        {/* <Options /> */}
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
            {/* <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Stack> */}
            <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#637381" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search chat's title"
                  endAdornment={
                    <IconButton
                      // onClick={handleClear}
                      sx={{ visibility: searchItem ? "visible" : "hidden" }}
                    >
                      <X fontSize={"medium"} />
                    </IconButton>
                  }
                  // onChange={handleInputChange}
                  value={searchItem}
                />
              </Search>
            </Stack>
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                backgroundColor={selectedTab === 0 && alpha("#FFDCA9", 0.5)}
                borderRadius="10px"
                paddingLeft={1}
                onClick={() => {
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
                backgroundColor={selectedTab === 1 && alpha("#FFDCA9", 0.5)}
                borderRadius="10px"
                paddingLeft={1}
                onClick={() => {
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
        <MainPhoneBook index={selectedTab} />
      </Stack>
    </>
  );
};

export default Phonebook;
