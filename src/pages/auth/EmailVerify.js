import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ReactComponent as VerifySuccess } from "../../assets/images/auth/email_verify_success.svg";
import { ReactComponent as VerifyFail } from "../../assets/images/auth/email_verify_fail.svg";
import { Button, Stack, Typography, Box } from "@mui/material";
import csscommon from "../../css/authCommon.module.css";

const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(true);
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:3000/v1/api/auth/verify/${param.token}`;
                const { data } = await axios.get(url);
                console.log(data);
                if (data.code === 0) {
                    setValidUrl(true);
                }
                else {
                    setValidUrl(false);
                }
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [param]);

    return (
        <>
            {validUrl ? (
                <Stack direction="column" alignItems="center" gap={3} backgroundColor="#fff" p={5} borderRadius="10px" marginTop="0px!important">
                    <VerifySuccess />
                    <Typography variant="h3">Email verified</Typography>
                    <Typography variant="body1">Your email address was successfully verified </Typography>
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
                        onClick={() => (window.location.href = "/auth/login")}
                    >
                        Back to Login
                    </Button>
                </Stack>
            ) : (
                <Stack direction="column" alignItems="center" gap={3} backgroundColor="#fff" p={5} borderRadius="10px" marginTop="0px!important">
                    <VerifyFail />
                    <Typography variant="h3">Verification Failed</Typography>
                    <Typography variant="body1">The verification link is either invalid or has expired</Typography>
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
            )}
        </>
    );
};

export default EmailVerify;