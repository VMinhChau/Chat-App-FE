import { Link as RouterLink } from "react-router-dom";
// sections
import { Stack, Typography, Link, Button, Box, css } from "@mui/material";
import SignUpIcon from "../../assets/images/auth/signup_icon.svg";
import SignInIcon from "../../assets/images/auth/signin_icon.svg";
import csscommon from "../../css/authCommon.module.css";

// ----------------------------------------------------------------------

export default function TopPage() {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
      <Typography variant="h1" style={{textAlign: 'center'}} className={csscommon.s_ttl01}>My <span className={csscommon.is_orange}>Crystal</span></Typography>
      </Stack>
      <Stack spacing={40} sx={{ mb: 5, position: "relative" }}>
        <Stack spacing={3} sx={{ mb: 1, position: "relative" }}>
          <Button
            variant="contained"
            className={csscommon.c_btgg}
          >
            Sign in with Google
          </Button>
          <Button
            variant="contained"
            onClick={() => (window.location.href = "/auth/login")}
            className={csscommon.c_btmail}
          >
            Sign in with Email
          </Button>
        </Stack>
        <div className={csscommon.c_btsignup}>
          <a className={csscommon.c_btsignup_link} href="/auth/signup/">
            <span className={csscommon.c_btsignup_text}><i className={csscommon.arr}></i>Create new account</span>
          </a>

        </div>
      </Stack>
    </>
  );
}
