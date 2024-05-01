import React from "react";
import { useTheme } from "@mui/material/styles";

import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import AntSwitch from "../../components/AntSwitch";

import useSettings from "../../hooks/useSettings";
import { Nav_Buttons, Nav_Setting } from "../../data";

import ProfileMenu from "./ProfileMenu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UpdateTab } from "../../redux/slices/app";

import csscommon from "../../css/authCommon.module.css";

const getPath = (index) => {
  switch (index) {
    case 0:
      return "/home";

    case 1:
      return "/phonebook";

    case 2:
      return "/call";

    case 3:
      return "/settings";

    default:
      break;
  }
};

const SideBar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { tab } = useSelector((state) => state.app);

  const navigate = useNavigate();

  const { onToggleMode } = useSettings();

  const selectedTab = tab;

  const handleChangeTab = (index) => {
    dispatch(UpdateTab({ tab: index }));
    navigate(getPath(index));
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: 145,

        backgroundColor:
          theme.palette.mode === "light"
            ? 'none'
            : theme.palette.background.paper,
        // boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack
        py={3}
        alignItems={"center"}
        justifyContent="space-between"
        sx={{ height: "100%", width: "145px" }}
      >
        <Stack alignItems={"center"} spacing={4}>
          <Box>
            <Typography
              variant="h5"
              style={{ textAlign: "center" }}
              className={csscommon.s_ttl01}
            >
              My <span className={csscommon.is_orange}>Crystal</span>
            </Typography>
          </Box>
          <Stack sx={{ width: "max-content" }} direction="column" spacing={2}>
            {Nav_Buttons.map((el, idx) => {
              return el.index == selectedTab ? (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  onClick={() => {
                    handleChangeTab(el.index);
                  }}
                  key={el.index}
                >
                  <Box
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: "10px",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* <IconButton
                      onClick={() => {
                        handleChangeTab(el.index);
                      }}
                      sx={{ width: "max-content", color: "white" }}
                    > */}
                    {el.icon}
                    {/* </IconButton> */}
                  </Box>
                  <Typography
                    variant="subtitle1"
                    color={theme.palette.primary.main}
                  >
                    {el.title}
                  </Typography>
                </Stack>
              ) : (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  onClick={() => {
                    handleChangeTab(el.index);
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: theme.palette.primary.lighter,
                      borderRadius: "10px",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* <IconButton
                      onClick={() => {
                        handleChangeTab(el.index);
                      }}
                      sx={{
                        width: "max-content",
                        color:
                          theme.palette.mode === "light"
                            ? "#080707"
                            : theme.palette.text.primary,
                      }}
                    > */}
                    {el.icon}
                    {/* </IconButton> */}
                  </Box>
                  <Typography
                    variant="subtitle1"
                  >
                    {el.title}
                  </Typography>
                </Stack>
              );
            })}
            <Divider sx={{ width: 48 }} />
            {Nav_Setting.map((el) => {
              return el.index == selectedTab ? (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  onClick={() => {
                    handleChangeTab(el.index);
                  }}
                  key={el.index}
                >
                  <Box
                    sx={{
                      // backgroundColor: theme.palette.primary.lighter,
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: "10px",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    p={1}
                  >
                    {/* <IconButton
                      onClick={() => {
                        handleChangeTab(el.index);
                      }}
                      sx={{ width: "max-content", color: "#ffffff" }}
                    > */}
                    {el.icon}
                    {/* </IconButton> */}
                  </Box>
                  <Typography
                    variant="subtitle1"
                    color={theme.palette.primary.main}
                  >
                    {el.title}</Typography>
                </Stack>
              ) : (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  onClick={() => {
                    handleChangeTab(el.index);
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: theme.palette.primary.lighter,
                      borderRadius: "10px",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    p={1}
                  >
                    {/* <IconButton
                      onClick={() => {
                        handleChangeTab(el.index);

                        // dispatch(UpdateTab(el.index));
                      }}
                      sx={{
                        width: "max-content",
                        color:
                          theme.palette.mode === "light"
                            ? "#080707"
                            : theme.palette.text.primary,
                      }}
                    > */}
                    {el.icon}
                    {/* </IconButton> */}
                  </Box>
                  <Typography variant="subtitle1">{el.title}</Typography>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
        <Stack spacing={4}>
          <AntSwitch
            defaultChecked={theme.palette.mode === "dark"}
            onChange={onToggleMode}
          />
          {/* Profile Menu */}
          <ProfileMenu />
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideBar;
