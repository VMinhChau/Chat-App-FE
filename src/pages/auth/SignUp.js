import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Stack, Typography, Link } from '@mui/material';

import RegisterForm from "../../sections/auth/RegisterForm";
import AuthSocial from '../../sections/auth/AuthSocial';

// ----------------------------------------------------------------------

export default function SignUpPage() {
  return (
    <>
      <Stack spacing={3} sx={{ mb: 5, position: 'relative' }} direction="column">
        <Typography variant="h1" style={{textAlign: 'center'}}>My Crystal</Typography>
        <Typography variant="body2" style={{textAlign: 'center'}}>Register an account</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2"> Already have an account? </Typography>

          <Link component={RouterLink} to={"/auth/login"} variant="subtitle2">
            Sign in
          </Link>
        </Stack>
      </Stack>
      {/* Form */}
      <RegisterForm  />

      <Typography
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

     <AuthSocial />
      </>
  );
}