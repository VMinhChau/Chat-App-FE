import React, { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import {
  CaretLeft,
  Bell,
  Lock,
  Key,
  PencilCircle,
  Image,
  Note,
  Keyboard,
  Info,
} from "phosphor-react";

import { useTheme } from "@mui/material/styles";
import { faker } from "@faker-js/faker";
// import ThemeDialog from "../../../sections/dashboard/Settings/ThemeDialog";
// import ShortcutDialog from "../../../sections/dashboard/Settings/ShortcutDialog";
import Options from "./Options";
import MainPhoneBook from "./MainPhoneBook";
import BackgroundHome from "../../../assets/images/auth/bg-auth.jpg";

const Phonebook = () => {
  

  return (
    <>
    <Stack
        direction="row"
        sx={{
          width: "100%",
          backgroundImage: `url(${BackgroundHome})`,
          borderRadius: "35px 0 0 35px",
        }}
        // spacing="8px"
        // alignItems={"center"}
    >
        <Options />
        <MainPhoneBook />
    </Stack>
    </>
  );
};

export default Phonebook;
