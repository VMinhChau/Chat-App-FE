import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Badge,
  styled,
} from "@mui/material";
import { ArrowLeft, DotsThree } from "phosphor-react";
import useResponsive from "../../../hooks/useResponsive";
import { useDispatch, useSelector } from "react-redux";
import { UpdateSidebarType } from "../../../redux/slices/app";
import { ReactComponent as AddIcon } from "../../../assets/images/home/add_icon.svg";
import { ReactComponent as LeaveIcon } from "../../../assets/images/home/leave_icon.svg";
import { ReactComponent as ChatIcon } from "../../../assets/images/home/chat_icon.svg";
import { FetchMembersGroup } from "../../../redux/slices/conversation";
import AddMembers from "./AddMembers";
import { MembersList } from "../../../data";

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

const Members = (props) => {
  const dispatch = useDispatch();

  const theme = useTheme();

  const isDesktop = useResponsive("up", "md");

  const [value, setValue] = React.useState(props.tab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { user_id } = useSelector((state) => state.auth);
  const { room_id } = useSelector((state) => state.app);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(null);
  const handleClick = (event, member_id) => {
    setAnchorEl(event.currentTarget);
    setOpen(member_id);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(null);
  };

  useEffect(() => {
    dispatch(FetchMembersGroup(room_id));
  }, []);

  const { members } = useSelector((state) => state.conversation.group_chat);

  const [openAddMembers, setOpenAddMembers] = useState(false);

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
            direction="row"
            alignItems={"center"}
            sx={{ height: "100%", p: '10px' }}
          >
            <IconButton
              size="medium"
              onClick={() => {
                dispatch(UpdateSidebarType("CONTACT"));
              }}
            >
              <ArrowLeft />
            </IconButton>
            <Box margin={"auto"}>
              <Typography variant="h6" textAlign={"center"}>
                Members
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Stack p={1.63} gap={1.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1">
              Members List ({members.length})
            </Typography>
            <IconButton
              size="medium"
              sx={{
                backgroundColor: `${theme.palette.primary.main}!important`,
              }}
              onClick={() => {
                setOpenAddMembers(true);
              }}
            >
              <AddIcon />
            </IconButton>
          </Stack>
          {members && members?.map((member, idx) => {
            return (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                key={idx}
              >
                <Stack direction="row" alignItems="center" gap={1.5}>
                  {member.isActive ? (
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar></Avatar>
                    </StyledBadge>
                  ) : (
                    <Avatar></Avatar>
                  )}
                  <Typography variant="body1">{member.fullName}</Typography>
                </Stack>
                <DotsThree
                  size={20}
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={(e) => {
                    handleClick(e, member.id);
                  }}
                />
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open === member.id}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  {member.id === user_id ? (
                    <MenuItem p={1}>
                      <ListItemIcon sx={{ minWidth: "30px!important" }}>
                        <LeaveIcon />
                      </ListItemIcon>
                      <ListItemText>Leave group</ListItemText>
                    </MenuItem>
                  ) : (
                    <MenuItem p={1}>
                      <ListItemIcon sx={{ minWidth: "30px!important" }}>
                        <ChatIcon />
                      </ListItemIcon>
                      <ListItemText>Chat</ListItemText>
                    </MenuItem>
                  )}
                </Menu>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
      {openAddMembers && (
        <AddMembers open={openAddMembers} handleClose={() => { setOpenAddMembers(false) }} />
      )}
    </Box>
  );
};

export default Members;
