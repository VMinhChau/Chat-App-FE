import { Link as RouterLink } from "react-router-dom";
// sections
import { Stack, Typography, Link, Button, Box } from "@mui/material";
import SignUpIcon from "../../assets/images/auth/signup_icon.svg";
import SignInIcon from "../../assets/images/auth/signin_icon.svg";

// ----------------------------------------------------------------------

export default function TopPage() {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4" style={{ textAlign: "center" }}>
          My Crystal
        </Typography>
      </Stack>
      <Stack spacing={40} sx={{ mb: 5, position: "relative" }}>
        <Stack spacing={3} sx={{ mb: 1, position: "relative" }}>
          <Button
            variant="contained"
            style={{ textAlign: "center", backgroundColor: "orange" }}
          >
            Sign in with Google
          </Button>
          <Button
            variant="contained"
            style={{ textAlign: "center", backgroundColor: "orange" }}
            onClick={() => (window.location.href = "/auth/login")}
          >
            <img src={SignInIcon} style={{marginRight: "0.5rem"}}></img>
            Sign in with Email
          </Button>
        </Stack>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="0.5rem"
        >
          <img src={SignUpIcon}></img>
          <Typography onClick={() => (window.location.href = "/auth/signup")}>
            Create new account
          </Typography>
        </Box>
      </Stack>
    </>
  );
}
