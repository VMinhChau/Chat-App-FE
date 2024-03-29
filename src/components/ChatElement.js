import React from "react";
import {
  Box,
  Badge,
  Stack,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import { styled, useTheme, alpha } from "@mui/material/styles";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SelectConversation } from "../redux/slices/app";
import { DotsThree } from "phosphor-react";

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

const ChatElement = ({ img, name, msg, time, unread, online, id }) => {
  const dispatch = useDispatch();
  const { room_id } = useSelector((state) => state.app);
  const selectedChatId = room_id?.toString();
  console.log(room_id);

  let isSelected = +selectedChatId === id;

  if (!selectedChatId) {
    isSelected = false;
  }

  const theme = useTheme();

  return (
    <Badge className="unread-count" color="primary" badgeContent={unread}>
      <StyledChatBox
        onClick={() => {
          dispatch(SelectConversation({ room_id: id }));
        }}
        sx={{
          width: "100%",
          borderRadius: "10px",
          border: isSelected ? "none" : "1px solid",
          borderColor: isSelected ? "none" : theme.palette.primary.light,
          background: isSelected
            ? theme.palette.mode === "light"
              ? theme.palette.gradients.primary
              : theme.palette.gradients.primary
            : theme.palette.mode === "light"
            ? "none"
            : theme.palette.background.paper,
        }}
        p={1.5}
      >
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={2}>
            {" "}
            {online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar alt={name} src={img} />
              </StyledBadge>
            ) : (
              <Avatar alt={name} src={img} />
            )}
            <Stack spacing={0.3}>
              <Typography variant="subtitle2">{name}</Typography>
              <Typography variant="caption">{truncateText(msg, 20)}</Typography>
            </Stack>
          </Stack>
          <Stack  alignItems={"end"}>
            <IconButton size="small" p={1}>
              <DotsThree fontSize="medium"/>
            </IconButton>
            <Typography sx={{ fontWeight: 600 }} variant="caption">
              {time}
            </Typography>
          </Stack>
        </Stack>
      </StyledChatBox>
    </Badge>
  );
};

export default ChatElement;
