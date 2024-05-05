import React from "react";
import { useTheme, alpha } from "@mui/material/styles";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import { ArrowLeft } from "phosphor-react";
import useResponsive from "../../../hooks/useResponsive";
import { useDispatch } from "react-redux";
import { UpdateSidebarType } from "../../../redux/slices/app";
import { faker } from "@faker-js/faker";
import { DocMsg, LinkMsg } from "./Conversation";
import { Shared_docs, Shared_links } from "../../../data";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const Media = (props) => {
  const dispatch = useDispatch();

  const theme = useTheme();

  const isDesktop = useResponsive("up", "md");

  const [value, setValue] = React.useState(props.tab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: !isDesktop ? "100vw" : 300,
        maxHeight: "97.7vh",
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
            // sx={{ height: "100%", p: 2 }}
            direction="row"
            alignItems={"center"}
            // spacing={9}
            sx={{ height: "100%", p: 1.25 }}
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
                Shared
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Media" />
          <Tab label="Links" />
          <Tab label="Docs" />
        </Tabs>
        <Stack
          sx={{
            position: "relative",
            // flexGrow: 1,
            overflowY: value === 0 ? "" : "scroll",
            height: "80%",
          }}
          padding={1}
          spacing={1}
        >
          {/* <Conversation starred={true} /> */}
          {(() => {
            switch (value) {
              case 0:
                return (
                  <ImageList cols={3} rowHeight={90}>
                    {[
                      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                      17, 18, 19,
                    ].map((item) => (
                      <ImageListItem key={item.img}>
                        <img
                          srcSet={`${faker.image.city()}?w=20&h=20&fit=crop&auto=format&dpr=2 2x`}
                          src={`${faker.image.city()}?w=20&h=20&fit=crop&auto=format`}
                          alt={item.title}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                );
              case 1:
                return Shared_links.map((el) => <LinkMsg el={el} />);

              case 2:
                return Shared_docs.map((el) => <Docs el={el} />);

              default:
                break;
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  );
};

const Docs = ({ el, menu }) => {
  const theme = useTheme();
  return (
    // <Stack
    //   direction="row"
    //   // justifyContent={el.incoming ? "start" : "end"}
    //   sx={{
    //     position: "relative",
    //     // flexGrow: 1,
    //     // overflowY: "scroll",
    //     height: "80%",
    //   }}
    // >
    <Box
      // px={1.5}
      // py={1.5}
      sx={{
        backgroundColor: el.incoming
          ? alpha(theme.palette.background.default, 1)
          : theme.palette.primary.main,
        borderRadius: 1.5,
        width: "max-content",
      }}
    >
      <Stack direction="column" spacing="8px!important">
        <Stack
          // p={2}
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.primary.lighter,
              borderRadius: "10px",
              width: "50px",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton></IconButton>
          </Box>
          <Stack>
            <Typography variant="body1">{el.title}</Typography>
            <Typography
              sx={{
                fontSize: "13px",
                color: theme.palette.grey[100],
                fontWeight: 500,
              }}
            >
              {el.size}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
    //  {menu && <MessageOption />}
    // </Stack>
  );
};

export { Media, Docs };
