import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import {
  CaretLeft,
  Bell,
  Lock,
  Key,
  Info,
} from "phosphor-react";

import { useTheme } from "@mui/material/styles";
import { faker } from "@faker-js/faker";
import BackgroundHome from "../../../assets/images/auth/bg-auth.jpg";
import SeetingProfile from "./SettingProfile";
import { useDispatch, useSelector } from "react-redux";
import { FetchUserProfile } from "../../../redux/slices/app";
import ChangePassword from "../../../pages/auth/ChangePassword";

const truncateText = (string, n) => {
  return string?.length > n ? `${string?.slice(0, n)}...` : string;
};

const Settings = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user_id } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.app);
  const list = [
    {
      key: 1,
      icon: <Bell size={20} />,
      title: "Notifications",
    },
    {
      key: 2,
      icon: <Lock size={20} />,
      title: "Privacy",
    },
    {
      key: 3,
      icon: <Key size={20} />,
      title: "Security",
    },
    // {
    //   key: 3,
    //   icon: <PencilCircle size={20} />,
    //   title: "Theme",
    //   onclick: handleOpenTheme,
    // },
    // {
    //   key: 4,
    //   icon: <Image size={20} />,
    //   title: "Chat Wallpaper",
    //   onclick: () => {},
    // },
    // {
    //   key: 5,
    //   icon: <Note size={20} />,
    //   title: "Request Account Info",
    //   onclick: () => {},
    // },
    // {
    //   key: 6,
    //   icon: <Keyboard size={20} />,
    //   title: "Keyboard Shortcuts",
    //   onclick: handleOpenShortcuts,
    // },
    {
      key: 4,
      icon: <Info size={20} />,
      title: "Help",
    },
  ];

  useEffect(() => {
    dispatch(FetchUserProfile(user_id));
  }, []);

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      <Stack
        direction="row"
        sx={{
          width: "100%",
          backgroundImage: `url(${BackgroundHome})`,
          padding: "8px",
          borderRadius: "35px 0 0 35px",
        }}
      >
        {/* LeftPane */}
        <Box
          sx={{
            height: "100%",
            width: 320,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#FFFFFF"
                : theme.palette.background.paper,
            margin: "0 8px 0 0",
            borderRadius: "35px",
          }}
        >
          <Stack
            p={2}
            spacing={5}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "35px 0 0 35px",
            }}
          >
            {/* Header */}
            <Stack direction="row" alignItems={"center"} spacing={3}>
              <IconButton>
                <CaretLeft size={24} color={"#4B4B4B"} />
              </IconButton>

              <Typography variant="h5">Settings</Typography>
            </Stack>

            {/* Profile */}
            <Stack direction="row" spacing={2} onClick={() => { setSelectedTab(0) }}>
              <Avatar
                src={user?.img}
                sx={{ height: 56, width: 56 }}
              />
              <Stack spacing={0.5}>
                <Typography variant="article">{user.fullName}</Typography>
                <Typography variant="body2">{truncateText(user.email, 30)}</Typography>
              </Stack>
            </Stack>
            {/* List */}
            <Stack spacing={4}>
              {list.map(({ key, icon, title, onclick }) => {
                return key == selectedTab ? (
                  <>
                    <Stack
                      onClick={() => setSelectedTab(key)}
                      sx={{ cursor: "pointer" }}
                      spacing={2}
                      key={key}
                      color={theme.palette.primary.main}
                    >
                      <Stack alignItems={"center"} direction="row" spacing={2}>
                        {icon}
                        <Typography variant="body2">{title}</Typography>
                      </Stack>
                      {key !== 7 && <Divider color={theme.palette.primary.main} />}
                    </Stack>
                  </>

                ) : (
                  <>
                    <Stack
                      onClick={() => setSelectedTab(key)}
                      sx={{ cursor: "pointer" }}
                      spacing={2}
                      key={key}
                    >
                      <Stack alignItems={"center"} direction="row" spacing={2}>
                        {icon}
                        <Typography variant="body2">{title}</Typography>
                      </Stack>
                      {key !== 7 && <Divider />}
                    </Stack>
                  </>)
              })}
            </Stack>
          </Stack>
        </Box>
        {/* Right Pane */}
        
          {(() => {
            switch (selectedTab) {
              case 0:
                return <SeetingProfile avtImg={user?.img} profileName={user.fullName} email={user.email} />

              case 2:
                return <ChangePassword />;

              default:
                break
            }
          })()}
      </Stack>
    </>
  );
};

export default Settings;
