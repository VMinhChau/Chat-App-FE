import { Stack, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { CaretLeft } from "phosphor-react";
import AuthResetPasswordForm from "../../sections/auth/ResetPasswordForm";
import csscommon from "../../css/authCommon.module.css";

const ResetPassword = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h1" style={{ textAlign: 'center' }} className={csscommon.s_ttl01}>My <span className={csscommon.is_orange}>Crystal</span></Typography>

        <Typography sx={{ color: "text.secondary", mb: 5 }}>
          Please enter the email address associated with your account. We
          will email you new password to reset your password.
        </Typography>
      </Stack>

      {/* Reset Password Form */}
      <AuthResetPasswordForm />

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
      <div className={csscommon.a_backbtn01}>
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
          <span className={csscommon.a_backbtn01_txt}>Back</span>
        </Link>
      </div>
    </>
  );
};

export default ResetPassword;