import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import {
  CaretRight,
  Prohibit,
  Trash,
  X,
  Image,
  FileText,
} from "phosphor-react";
import useResponsive from "../../hooks/useResponsive";
import AntSwitch from "../../components/AntSwitch";
import { useDispatch, useSelector } from "react-redux";
import { ToggleSidebar, UpdateSidebarType } from "../../redux/slices/app";
import { ReactComponent as FileIcon } from "../../assets/images/home/file_icon.svg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Block this contact</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to block this Contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteChatDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Delete this chat</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete this chat?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

const Contact = () => {
  const dispatch = useDispatch();

  const { current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );

  const theme = useTheme();

  const isDesktop = useResponsive("up", "md");

  const [openBlock, setOpenBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseBlock = () => {
    setOpenBlock(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <Box
      sx={{
        width: !isDesktop ? "100vw" : 300,
        maxHeight: "100vh",
        margin: "8px 0 8px 0",
        borderLeft: "2px solid #ED711A",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#FFFFFF"
            : theme.palette.background.paper,
        borderRadius: "0 30px 30px 0",
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack sx={{ height: "100%" }}>
        <Box
          sx={{
            width: "100%",
            borderRadius: "0 30px 0 0",
            borderBottom: "2px solid #ED711A",
          }}
        >
          <Stack
            sx={{ height: "100%", p: 2.38 }}
            spacing={3}
            textAlign="center"
          >
            <Typography variant="h6">Chat Info</Typography>
          </Stack>
        </Box>
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            // overflowY: "scroll",
            borderRadius: "0 0 35px 35px",
            justifyContent: "space-between",
          }}
          p={1.5}
          py={3}
          spacing={3}
        >
          <Stack direction="column" spacing={3}>
            <Stack alignItems="center" direction="column" spacing={2}>
              <Avatar
                src={current_conversation?.img}
                alt={current_conversation?.name}
                sx={{ height: 64, width: 64 }}
              />
              <Stack spacing={0.5}>
                <Typography variant="article" fontWeight={600}>
                  {current_conversation?.name}
                </Typography>
              </Stack>
            </Stack>
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={"space-between"}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Image size={28} color="#000000" weight="fill" />
                  <Typography variant="subtitle2">Images</Typography>
                </Stack>
                <IconButton
                  onClick={() => {
                    dispatch(UpdateSidebarType("SHARED_IMAGE"));
                  }}
                >
                  <CaretRight />
                </IconButton>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={"space-between"}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <FileText size={28} weight="fill" />
                  <Typography variant="subtitle2">Files</Typography>
                </Stack>
                <IconButton
                  onClick={() => {
                    dispatch(UpdateSidebarType("SHARED_FILE"));
                  }}
                >
                  <CaretRight />
                </IconButton>
              </Stack>
            </Box>
          </Stack>
          <Stack direction="row" alignItems={"center"} spacing={2}>
            <Button
              onClick={() => {
                setOpenBlock(true);
              }}
              fullWidth
              startIcon={<Prohibit />}
              variant="outlined"
            >
              Block
            </Button>
            <Button
              onClick={() => {
                setOpenDelete(true);
              }}
              fullWidth
              startIcon={<Trash />}
              variant="outlined"
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {openBlock && (
        <BlockDialog open={openBlock} handleClose={handleCloseBlock} />
      )}
      {openDelete && (
        <DeleteChatDialog open={openDelete} handleClose={handleCloseDelete} />
      )}
    </Box>
  );
};

export default Contact;
