import {
    Box,
    Button,
    Divider,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import useResponsive from "../../../hooks/useResponsive";
import classCss from "../../../css/PhoneBook/commonPhoneBook.module.css"
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import PhoneBookContactElement from "../../../components/PhoneBookContactElement.js";
import PhoneBookGroupElement from "../../../components/PhoneBookGroupElement.js";

function MainPhoneBook({ index }) {
    const isDesktop = useResponsive("up", "md");
    const theme = useTheme();
    const { private_conversations } = useSelector(
        (state) => state.conversation.direct_chat
    );
    const { group_conversations } = useSelector(
        (state) => state.conversation.group_chat
    );
    return (
        <>
            <Box
                sx={{
                    position: "relative",
                    width: isDesktop ? '78.1%' : "100vw",
                    backgroundColor: theme.palette.mode === "light"
                        ? "#FFFFFF"
                        : theme.palette.background.paper,
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                    borderRadius: "35px",
                    margin: "8px 8px 8px 0",
                }}
            >
                <div className={classCss.phoneBook_ttl}>
                    {index === 0 ? (
                        <div className={classCss.txt}>Contact list ({private_conversations?.length})</div>
                    ) : (< div className={classCss.txt}>Group list ({group_conversations?.length})</div>)}
                </div>
                <div className={classCss.phoneBook_ctn}>
                    <div className={classCss.item_avt}>
                        <Stack
                            sx={{ flexGrow: 1, height: "100%", overflow: "scroll" }}
                        >
                            <Stack spacing={0.8} width="100%">
                                {index === 0 ? (
                                    private_conversations?.map((el, idx) => {
                                        return <PhoneBookContactElement {...el} />;
                                    })
                                ) : (group_conversations?.map((el, idx) => {
                                    return <PhoneBookGroupElement {...el} />;
                                }))}
                            </Stack>
                        </Stack>
                    </div>
                </div>
            </Box >
        </>
    );
}

export default MainPhoneBook;