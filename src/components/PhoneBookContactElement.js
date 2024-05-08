import React, { useState } from "react";
import {
  Box,
  Badge,
  Stack,
  Avatar,
  Typography,
  IconButton,
  AvatarGroup,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Button,
} from "@mui/material";
import {
  Trash,
} from "phosphor-react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SelectConversation, UpdateTab } from "../redux/slices/app";
import { FetchCurrentMessages, FetchCurrentPrivateConversation } from "../redux/slices/conversation";
import { DotsThree } from "phosphor-react";
import DeleteChatDialog from "../sections/Dashboard/Home/DeleteChatDialog";
import classess from "../css/ChatElement.module.css";


const truncateText = (string, n) => {
  return string?.length > n ? `${string?.slice(0, n)}...` : string;
};

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

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

const PhoneBookContactElement = (el) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { room_id } = useSelector((state) => state.app);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, delete_id) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    // setOpen(member_id);
    setDeleteId(delete_id);
  };
  const handleClose = () => {
    setAnchorEl(null);
    // setOpen(null);
  };

  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const [delete_id, setDeleteId] = useState(null);

  return (
    <StyledChatBox
      sx={{
        width: "100%",
      }}
      p={1.5}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2} onClick={() => {
          dispatch(SelectConversation({ room_id: el.chat_id, chat_type: "privatechat" }));
          dispatch(UpdateTab({ tab: 0 }));
          navigate("/home");
          dispatch(FetchCurrentPrivateConversation(el));
          dispatch(FetchCurrentMessages({ chat_id: el.chat_id }));
        }}>
          {" "}
          {el.online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={el.name} src={el.img} />
            </StyledBadge>
          ) : (
            <Avatar alt={el.name} src={el.img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{el.fullName}</Typography>
            <Typography variant="caption">
              {truncateText(el.email, 60)}
            </Typography>
          </Stack>
        </Stack>
        <Stack alignItems={"end"}>
          <IconButton size="small" p={1} onClick={(e) => {
            handleClick(e, el.roomId);
          }}>
            <DotsThree fontSize="medium" />
          </IconButton>
        </Stack>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
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
          <Button
            onClick={() => {
              setOpenDelete(true);
            }}
            fullWidth
            startIcon={<Trash />}
          >
            Delete
          </Button>
        </Menu>
        {openDelete && (
          <DeleteChatDialog open={openDelete} handleClose={handleCloseDelete} delete_id={delete_id} />
        )}
      </Stack>
    </StyledChatBox>
  );
};

export default PhoneBookContactElement;
