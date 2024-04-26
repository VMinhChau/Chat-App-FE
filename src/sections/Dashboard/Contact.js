import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  AvatarGroup,
  IconButton,
  Stack,
  Typography,
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  Badge
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

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
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
              {/* <Avatar
                src={current_conversation?.img}
                alt={current_conversation?.name}
                sx={{ height: 64, width: 64 }}
              /> */}
              <StyledBadge
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant={current_conversation?.online ? "dot" : ""}
              >
                {current_conversation?.chat_type === "group" ? (
                  <AvatarGroup
                    max={2}
                    total={2}
                    sx={{
                      "& .MuiAvatar-root": {
                        width: 35,
                        height: 35,
                        fontSize: 12,
                      },
                      display: "flex",
                      flexDirection: "column-reverse",
                    }}
                  >
                    <AvatarGroup
                      sx={{ marginBottom: "-4px" }}
                      max={1}
                      total={current_conversation?.img.length - 2}
                      cascade="above"
                      componentsProps={{
                        additionalAvatar: {
                          sx: {
                            zIndex: 1,
                          },
                        },
                      }}
                    >
                      <Avatar alt={current_conversation?.title} src={current_conversation?.img[0]} />
                    </AvatarGroup>
                    <AvatarGroup sx={{ marginTop: "-4px" }} max={2} total={2}>
                      <Avatar alt={current_conversation?.title} src={current_conversation?.img[1]} />
                      <Avatar alt={current_conversation?.title} src={current_conversation?.img[2]} />
                    </AvatarGroup>
                  </AvatarGroup>
                ) : (
                  <Avatar alt={current_conversation?.name} src={current_conversation?.img} sx={{ height: 64, width: 64 }} />
                )}
              </StyledBadge>
              <Stack spacing={0.5}>
                <Typography variant="article" fontWeight={600}>
                  {current_conversation?.chat_type === "group"
                    ? current_conversation?.title
                    : current_conversation?.name}
                </Typography>
              </Stack>
            </Stack>
            <Box>
              {current_conversation?.chat_type === "group" && (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent={"space-between"}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    {/* <MembersIcon size={23} weight="fill" /> */}
                    <Typography variant="subtitle2">Members</Typography>
                  </Stack>
                  <IconButton
                    onClick={() => {
                      dispatch(UpdateSidebarType("MEMBERS"));
                    }}
                  >
                    <CaretRight />
                  </IconButton>
                </Stack>
              )}
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
                  <FileIcon width={28} height={26} weight="fill" />
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
