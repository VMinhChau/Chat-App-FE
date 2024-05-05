import email_icon from "../../assets/images/auth/email.png";
import { Button, Stack, Typography, Box } from "@mui/material";
import csscommon from "../../css/authCommon.module.css";
import { useSelector } from "react-redux";

const VerificationNotice = () => {
    const { email } = useSelector((state) => state.auth)
    console.log(email);

    return (
        <Stack direction="column" alignItems="center" gap={3} backgroundColor="#fff" p={5} borderRadius="10px" marginTop="0px!important">
            <img src={email_icon} alt="Email icon" width="84px" height="84px" />
            <Typography variant="h3">Verify your email</Typography>
            <Typography variant="body1" textAlign="center">We have sent a verification link to <span style={{ fontWeight: 600 }}>{email}</span></Typography>
            <Stack direction="column">
                <Typography variant="body1" textAlign="center">Click on the link to complete the verification process</Typography>
                <Typography variant="body1" textAlign="center">You might need to <span style={{ fontWeight: 600 }}>check your spam folder</span></Typography>
            </Stack>
            <Button
                sx={{
                    bgcolor: "text.primary",
                    color: (theme) =>
                        theme.palette.mode === "light" ? "common.white" : "grey.800",
                    "&:hover": {
                        bgcolor: "text.primary",
                        color: (theme) =>
                            theme.palette.mode === "light" ? "common.white" : "grey.800",
                    },
                }}
                className={csscommon.a_signupbtn}
            // onClick={() => (window.location.href = "/auth/login")}
            >
                Resend verification link
            </Button>
        </Stack>
    );
};

export default VerificationNotice;