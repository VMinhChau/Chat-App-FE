import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Stack, Typography, Link } from '@mui/material';

import RegisterForm from "../../sections/auth/RegisterForm";
import AuthSocial from '../../sections/auth/AuthSocial';
import csscommon from "../../css/authCommon.module.css";
import classes from "../../css/signUp.module.css";

// ----------------------------------------------------------------------

export default function SignUpPage() {
  return (
    <>
      <div className={csscommon.a_backbtn01}>
        <a className={csscommon.a_backbtn01_link} href='/auth/'>
          <span className={csscommon.a_backbtn01_txt}>Back</span>
        </a>
      </div>

      <Stack spacing={3} sx={{ mb: 5, position: 'relative' }} direction="column">
        <Typography variant="h1" style={{textAlign: 'center'}} className={csscommon.s_ttl01}>My <span className={csscommon.is_orange}>Crystal</span></Typography>
        <Typography variant="body2" style={{textAlign: 'center'}}>Register an account</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2"> Already have an account? </Typography>

          <Link component={RouterLink} to={"/auth/login"} variant="subtitle2" className={csscommon.a_signupbtn01}>
            Sign in
          </Link>
        </Stack>
      </Stack>
      {/* Form */}
      <RegisterForm  />

      {/* <Typography
        component="div"
        sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'center' }}
      >
        {'By signing up, I agree to '}
        <Link underline="always" color="text.primary">
          Terms of Service
        </Link>
        {' and '}
        <Link underline="always" color="text.primary">
          Privacy Policy
        </Link>
        .
      </Typography>

     <AuthSocial /> */}
      </>
  );
}