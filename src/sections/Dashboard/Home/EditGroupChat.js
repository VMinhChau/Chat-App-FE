import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  Box,
  Avatar,
  Badge,
  styled,
  TextField,
  Chip,
  Typography
} from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormProvider from "../../../components/hook-form/FormProvider";
import { RHFTextField } from "../../../components/hook-form";
import RHFAutocomplete from "../../../components/hook-form/RHFAutocomplete";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllUsers } from "../../../redux/slices/app";
import { EditGroupConversation } from "../../../redux/slices/conversation";
import _ from "lodash";
import { createFilterOptions } from '@mui/material/Autocomplete';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: "0!important",
      left: "0!important",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const EditGroupForm = ({ handleClose, group_id }) => {
  const dispatch = useDispatch();

  const { all_users } = useSelector((state) => state.app);
  const { current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );

  useEffect(() => {
    dispatch(FetchAllUsers());
  }, []);

  const NewGroupSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    // members: Yup.array().min(2, "Must have at least 2 members"),
  });

  const defaultValues = {
    title: current_conversation.title,
    description: current_conversation.description,
    // members: [],
  };

  const methods = useForm({
    resolver: yupResolver(NewGroupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
  } = methods;

  const onSubmit = async (data) => {
    try {
      //  API Call
      dispatch(EditGroupConversation(data, group_id));
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField size="10" name="title" label="Title" />
        <RHFTextField size="10" name="description" label="Description" />
        <Stack
          spacing={2}
          direction={"row"}
          alignItems="center"
          justifyContent={"end"}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Edit
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

const EditGroupChat = ({ open, handleClose, group_id }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 2 }}
    >
      <DialogTitle>{"Edit Group Chat"}</DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        {/* Create Group Form */}
        <EditGroupForm handleClose={handleClose} group_id={group_id} />
      </DialogContent>
    </Dialog>
  );
};

export default EditGroupChat;

