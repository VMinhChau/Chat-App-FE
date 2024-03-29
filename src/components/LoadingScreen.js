import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";

const LoadingScreen = () => {
  return (
    <Stack
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <LoadingButton loading variant="outlined" size="large" color="primary">
        Submit
      </LoadingButton>
    </Stack>
  );
};

export default LoadingScreen;
