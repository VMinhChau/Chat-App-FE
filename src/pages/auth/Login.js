import { Link as RouterLink } from "react-router-dom";
// sections
import { Stack, Typography, Link } from "@mui/material";
import AuthSocial from "../../sections/auth/AuthSocial";
import Login from "../../sections/auth/LoginForm";

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4" style={{textAlign: 'center'}}>My Crystal</Typography>
        <Typography variant="h4" style={{textAlign: 'center'}}>Login with email</Typography>
      </Stack>
      {/* Form */}
      <Login />

      {/* <AuthSocial/> */}
    </>
  );
}
