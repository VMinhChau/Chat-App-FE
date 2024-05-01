import React, { useEffect } from "react";
import { Container, Stack } from "@mui/material";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import classes from "../../css/authCommon.module.css";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    // dispatch(FetchDirectConversations({ user_id: user_id }))
    if (isLoggedIn) {
      console.log("User logged in");
      // <Navigate to={"/home"} />;
      navigate("/home");
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className={classes.a_bgcommon}>
        <Container
          // sx={{ mt: 5 }}
          maxWidth="sm"
        >
          <Stack spacing={5}>
            <Stack
              sx={{ width: "100%" }}
              direction="column"
              alignItems={"center"}
            >
              {/* <img style={{ height: 120, width: 120 }} src={Logo} alt="Logo" /> */}
            </Stack>
            <Outlet />
          </Stack>
        </Container>
      </div>
    </>
  );
};

export default AuthLayout;
