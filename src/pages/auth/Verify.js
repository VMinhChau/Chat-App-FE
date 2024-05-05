import { Link as RouterLink } from "react-router-dom";
// sections
import { Stack, Typography, Link } from "@mui/material";
import AuthSocial from "../../sections/auth/AuthSocial";
import Login from "../../sections/auth/LoginForm";
import VerifyForm from "../../sections/auth/VerifyForm";
import csscommon from "../../css/authCommon.module.css";

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <div className={csscommon.a_backbtn01}>
        <Link
          component={RouterLink}
          to={"/auth/reset-password/"}
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
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Please Verify OTP</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">
            Sent to email (shreyanshshah242@gmail.com)
          </Typography>
        </Stack>
      </Stack>
      {/* Form */}
      <VerifyForm />
    </>
  );
}