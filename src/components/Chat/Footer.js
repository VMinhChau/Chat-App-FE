import {
  Box,
  Fab,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  Camera,
  File,
  Image,
  LinkSimple,
  PaperPlaneRight,
  Smiley,
  Sticker,
  User,
} from "phosphor-react";
import { useTheme, styled } from "@mui/material/styles";
import React, { useRef, useState, useEffect } from "react";
import useResponsive from "../../hooks/useResponsive";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { connectSocket, ws } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { AddDirectMessage, FetchCurrentMessages } from "../../redux/slices/conversation";

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px !important",
    minHeight: "0px!important",
  },
  "& .MuiInputBase-root": {
    borderRadius: "35px!important",
    padding: "0!important",
  },
}));

const Actions = [
  {
    color: "#4da5fe",
    icon: <Image size={24} />,
    y: 102,
    title: "Photo/Video",
  },
  {
    color: "#1b8cfe",
    icon: <Sticker size={24} />,
    y: 172,
    title: "Stickers",
  },
  {
    color: "#0172e4",
    icon: <Camera size={24} />,
    y: 242,
    title: "Image",
  },
  {
    color: "#0159b2",
    icon: <File size={24} />,
    y: 312,
    title: "Document",
  },
  {
    color: "#013f7f",
    icon: <User size={24} />,
    y: 382,
    title: "Contact",
  },
];

const ChatInput = ({
  openPicker,
  setOpenPicker,
  setValue,
  value,
  inputRef,
}) => {
  // const [openActions, setOpenActions] = React.useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();

  const { room_id } = useSelector((state) => state.app);

  const inputFileRef = useRef(null);
  const [image, setImage] = useState("")
  const handleClickInputFile = () => {
    inputFileRef.current.click();
  };
  const handleChangeInputFile = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setImage(reader.result);
      const base64String = reader.result;
      ws.send(base64String);
    };
    reader.readAsDataURL(file);
    dispatch(FetchCurrentMessages({ chat_id: room_id }));
  }

  return (
    <>
      <StyledInput
        inputRef={inputRef}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        fullWidth
        placeholder="Write a message..."
        variant="filled"
        multiline
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <Stack sx={{ width: "max-content" }}>
              {/* <Stack
              sx={{
                position: "relative",
                display: openActions ? "inline-block" : "none",
              }}
            > */}
              {/* {Actions.map((el, idx) => (
                <Tooltip placement="right" title={el.title} key={el.title}>
                  <Fab
                    onClick={() => {
                      setOpenActions(!openActions);
                    }}
                    sx={{
                      position: "absolute",
                      top: -el.y,
                      backgroundColor: el.color,
                    }}
                    aria-label="add"
                  >
                    {el.icon}
                  </Fab>
                </Tooltip>
              ))} */}

              {/* </Stack> */}

              <InputAdornment>
                <IconButton
                  // onClick={() => {
                  //   setOpenActions(!openActions);
                  // }}
                  onClick={handleClickInputFile}
                >
                  <LinkSimple
                    color={theme.palette.primary.main}
                    weight="fill"
                  />
                </IconButton>
              </InputAdornment>
            </Stack>
          ),
          endAdornment: (
            <Stack sx={{ position: "relative" }}>
              <InputAdornment>
                <IconButton
                  onClick={() => {
                    setOpenPicker(!openPicker);
                  }}
                >
                  <Smiley
                    color={theme.palette.primary.main}
                    size={25}
                    weight="fill"
                  />
                </IconButton>
              </InputAdornment>
            </Stack>
          ),
        }}
      />
      <input
        type="file"
        id="file"
        ref={inputFileRef}
        onChange={handleChangeInputFile}
        style={{ display: "none" }}
      />
    </>
  );
};

function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank">${url}</a>`
  );
}

function containsUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return urlRegex.test(text);
}

const Footer = () => {
  const theme = useTheme();

  const { current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const { isLoggedIn } = useSelector((state) => state.app)

  const user_id = window.localStorage.getItem("user_id");

  const isMobile = useResponsive("between", "md", "xs", "sm");

  const { sideBar, room_id } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  const [openPicker, setOpenPicker] = React.useState(false);

  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  function handleEmojiClick(emoji) {
    const input = inputRef.current;

    if (input) {
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;

      setValue(
        value.substring(0, selectionStart) +
        emoji +
        value.substring(selectionEnd)
      );

      // Move the cursor to the end of the inserted emoji
      input.selectionStart = input.selectionEnd = selectionStart + 1;
    }
  }

  if (isLoggedIn) {
    connectSocket(room_id, user_id);
    // ws.onopen = e => {
    //   console.log("Connected established");
    // }
    ws.onmessage = e => {
      const data = JSON.parse(e.data);
      dispatch(FetchCurrentMessages({ chat_id: room_id }));
      console.log("Message received", data);
    }
  }

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "transparent !important",
      }}
    >
      <Box
        p={isMobile ? 1 : 1.1}
        width={"100%"}
        sx={{
          backgroundColor:
            theme.palette.mode === "light"
              ? "#FFFFFF"
              : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          borderRadius: sideBar.open ? "0 0 0 35px" : "0px 0px 35px 35px",
          marginBottom: "8px"
        }}
      >
        <Stack direction="row" alignItems={"center"} spacing={isMobile ? 1 : 1}>
          <Stack sx={{ width: "100%" }}>
            <Box
              style={{
                zIndex: 10,
                position: "fixed",
                display: openPicker ? "inline" : "none",
                bottom: 81,
                right: isMobile ? 20 : sideBar.open ? 420 : 100,
              }}
            >
              <Picker
                theme={theme.palette.mode}
                data={data}
                onEmojiSelect={(emoji) => {
                  handleEmojiClick(emoji.native);
                }}
              />
            </Box>
            {/* Chat Input */}
            <ChatInput
              inputRef={inputRef}
              value={value}
              setValue={setValue}
              openPicker={openPicker}
              setOpenPicker={setOpenPicker}
            />
          </Stack>
          <Stack
            sx={{ height: "100%" }}
            alignItems={"center"}
            justifyContent="center"
          >
            <IconButton
              // onClick={() => {
              //   socket.emit("text_message", {
              //     message: linkify(value),
              //     conversation_id: room_id,
              //     from: user_id,
              //     to: current_conversation.user_id,
              //     type: containsUrl(value) ? "Link" : "Text",
              //   });
              // }}
              onClick={() => {
                // dispatch(AddDirectMessage(value))
                if (value) {
                  ws.send(value);
                  dispatch(FetchCurrentMessages({ chat_id: room_id }));
                }
              }}
            >
              <PaperPlaneRight
                color={theme.palette.primary.main}
                weight="fill"
              />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Box >
  );
};

export default Footer;
