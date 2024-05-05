import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import SideNav from "./SideNav";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { FetchUserProfile, SelectConversation, showSnackbar } from "../../redux/slices/app";
import { socket, connectSocket } from "../../socket";

const DashboardLayout = () => {
  const isDesktop = useResponsive("up", "md");
  const dispatch = useDispatch();
  const { user_id } = useSelector((state) => state.auth);
  const theme = useTheme();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { conversations, current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );

  // useEffect(() => {
  //   dispatch(FetchUserProfile());
  // }, []);

  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <>
      <Stack direction="row" backgroundColor={theme.palette.mode === "light" ? "#FAF9F570" : theme.palette.background.paper}>
        {isDesktop && (
          // SideBar
          <SideNav />
        )}
        <Outlet />
      </Stack>
    </>
  );
};

export default DashboardLayout;
