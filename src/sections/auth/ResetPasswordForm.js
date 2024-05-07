import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// components
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { Button, Alert, AlertTitle } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPassword } from "../../redux/slices/auth";
import { LoadingButton } from "@mui/lab";
import csscommon from "../../css/authCommon.module.css";
import { Stack, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

// ----------------------------------------------------------------------

export default function AuthResetPasswordForm() {
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: "demo@tawk.com" },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
      //   Send API Request
      dispatch(ForgotPassword(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="email" label="Email address" className={csscommon.input_field01} />

      <LoadingButton
        loading={isLoading}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{
          mt: 3,
          bgcolor: "text.primary",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
        }}
        className={csscommon.a_signupbtn + ' ' + csscommon.is_margin}
      >
        {/* <Link
          component={RouterLink}
          to={"/auth/verify/"}
        > */}
        <span className={csscommon.a_backbtn01_txt}>Send Request</span>
        {/* </Link> */}
      </LoadingButton>
    </FormProvider>
  );
}