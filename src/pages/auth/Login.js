import { Link as RouterLink } from "react-router-dom";
// sections
import { Stack, Typography, Link, css } from "@mui/material";
import AuthSocial from "../../sections/auth/AuthSocial";
import Login from "../../sections/auth/LoginForm";
import csscommon from "../../css/authCommon.module.css";
import classes from "../../css/signUp.module.css";

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <div className={csscommon.a_backbtn01}>
        <a className={csscommon.a_backbtn01_link} href='/auth/'>
          <span className={csscommon.a_backbtn01_txt}>Back</span>
        </a>
      </div>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h1" style={{textAlign: 'center'}} className={csscommon.s_ttl01}>My <span className={csscommon.is_orange}>Crystal</span></Typography>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>

          <Link
            to={"/auth/register"}
            component={RouterLink}
            variant="subtitle2"
            className={csscommon.a_signupbtn01}
          >
            Create an account
          </Link>
        </Stack>
      </Stack>
      {/* Form */}
      <Login />

      {/* <AuthSocial/> */}
    </>
  );
}
