import React, { useEffect, useRef } from "react";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  Typography,
  AvatarGroup,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CaretDown, MagnifyingGlass, Phone, VideoCamera, Info } from "phosphor-react";
import { faker } from "@faker-js/faker";
import useResponsive from "../../hooks/useResponsive";
import { ToggleSidebar } from "../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
// import { StartAudioCall } from "../../redux/slices/audioCall";
// import { StartVideoCall } from "../../redux/slices/videoCall";
import { SetCurrentConversation } from "../../redux/slices/conversation";
import { ReactComponent as InfoButton } from "../../assets/images/home/info_button.svg"

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

const ChatHeader = () => {
  const dispatch = useDispatch();
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const theme = useTheme();

  const { conversations } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const { room_id, sideBar } = useSelector((state) => state.app);
  useEffect(() => {
    const current = conversations.find((el) => el?.id === room_id);
    dispatch(SetCurrentConversation(current));
  });
  const { current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );

  return (
    <>
      <Box
        p={1.5}
        width={"100%"}
        sx={{
          backgroundColor:
            theme.palette.mode === "light"
              ? "#FFFFFF"
              : theme.palette.background,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          borderRadius: sideBar.open ? "35px 0 0 0" : "35px 35px 0px 0px",
          borderBottom: "2px solid #ED711A",
        }}
      >
        <Stack
          alignItems={"center"}
          direction={"row"}
          sx={{ width: "100%", height: "100%" }}
          justifyContent="space-between"
        >
          <Stack
            onClick={() => {
              dispatch(ToggleSidebar());
            }}
            spacing={2}
            direction="row"
          >
            <Box>
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
                        width: 21,
                        height: 21,
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
                      <Avatar alt={current_conversation?.name} src={current_conversation?.img[0]} />
                    </AvatarGroup>
                    <AvatarGroup sx={{ marginTop: "-4px" }} max={2} total={2}>
                      <Avatar alt={current_conversation?.name} src={current_conversation?.img[1]} />
                      <Avatar alt={current_conversation?.name} src={current_conversation?.img[2]} />
                    </AvatarGroup>
                  </AvatarGroup>
                ) : (
                  <Avatar alt={current_conversation?.name} src={current_conversation?.img} />
                )}
              </StyledBadge>
            </Box>
            <Stack spacing={0.2}>
              <Typography variant="subtitle2">
                {current_conversation?.title}
              </Typography>
              <Typography variant="caption">
                {current_conversation?.online ? "Online" : "Offline"}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            alignItems="center"
            spacing={1}
          >
            {/* <IconButton onClick={() => {
              dispatch(StartVideoCall(current_conversation.user_id));
            }}>
              <VideoCamera />
            </IconButton>
            <IconButton
              onClick={() => {
                
                dispatch(StartAudioCall(current_conversation.user_id));
              }}
            > */}
            {/* <Phone />
            </IconButton> */}
            {!isMobile && (
              <IconButton>
                <MagnifyingGlass />
              </IconButton>
            )}
            {/* <Divider orientation="vertical" flexItem /> */}
            <IconButton
              id="chat-information-button"
              onClick={() => {
                dispatch(ToggleSidebar());
              }}
            >
              <Info size={26} />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default ChatHeader;
