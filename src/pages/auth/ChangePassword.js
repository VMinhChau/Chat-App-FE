import { Stack, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { CaretLeft } from "phosphor-react";
import NewPasswordForm from "../../sections/auth/NewPasswordForm";
import csscommon from "../../css/authCommon.module.css";

const ChangePassword = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative", p: 5 }} alignItems="center">
        <Typography variant="h3" paragraph>
          Change Password
        </Typography>

        <Typography sx={{ color: "text.secondary", mb: 5 }}>
          Please set your new password.
        </Typography>
      </Stack>

      {/* NewPasswordForm */}

      <NewPasswordForm />

      {/* <Link
        component={RouterLink}
        to={"/auth/login"}
        color="inherit"
        variant="subtitle2"
        sx={{
          mt: 3,
          mx: "auto",
          alignItems: "center",
          display: "inline-flex",
        }}
      >
        <CaretLeft size={24} />
        Return to sign in
      </Link> */}
      {/* <div className={csscommon.a_backbtn01}>
        <Link
          component={RouterLink}
          to={"/auth/login"}
          color="inherit"
          variant="subtitle2"
          sx={{
            mt: 3,
            mx: "auto",
            alignItems: "center",
            display: "inline-flex",
          }}
          className={csscommon.a_backbtn01_link}
        >
          <span className={csscommon.a_backbtn01_txt}>Return to sign in</span>
        </Link>
      </div> */}
    </>
  );
};

export default ChangePassword;