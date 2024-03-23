import React from "react";
import { Container, Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import classes from "../../css/authCommon.module.css";

// import Logo from "../../assets/Images/logo.ico";
import Background from "../../assets/background.png";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (isLoggedIn) {
    return <Navigate to={"/app"} />;
  }

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
