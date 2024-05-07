import React, { useEffect, useState } from "react";
import {
    Box,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import {
    MagnifyingGlass,
    X,
} from "phosphor-react";
import GroupChatElement from "../../../components/GroupChatElement";
import PrivateChatElement from "../../../components/PrivateChatElement";
import {
    Search,
    SearchIconWrapper,
    StyledInputBase,
} from "../../../components/Search";

const SearchChat = ({ group_conversations, private_conversations }) => {
    const [searchItem, setSearchItem] = useState("");
    const [filteredPrivateChat, setFilteredPrivateChat] = useState(private_conversations);
    const [filteredGroupChat, setFilteredGroupChat] = useState(group_conversations);

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);
        const filteredGroupChat = group_conversations?.filter((conversation) =>
            conversation.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const filteredPrivateChat = private_conversations?.filter((conversation) =>
            conversation.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPrivateChat(filteredPrivateChat);
        setFilteredGroupChat(filteredGroupChat);
    };

    const handleClear = () => {
        setSearchItem("");
        setFilteredGroupChat(group_conversations);
        setFilteredPrivateChat(private_conversations);
    };

    return (
        <>
            <Stack sx={{ width: "100%" }}>
                <Search>
                    <SearchIconWrapper>
                        <MagnifyingGlass color="#637381" />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search chat's title"
                        endAdornment={
                            <IconButton
                                onClick={handleClear}
                                sx={{ visibility: searchItem ? "visible" : "hidden" }}
                            >
                                <X fontSize={"medium"} />
                            </IconButton>
                        }
                        onChange={handleInputChange}
                        value={searchItem}
                    />
                </Search>
            </Stack>

            <Typography variant="subtitle1">Private chat</Typography>
            {searchItem ? (
                filteredPrivateChat?.length === 0 ? (
                    <Box textAlign="center">No chats found</Box>
                ) : (
                    <Stack sx={{ flexGrow: 1, height: "100%", overflow: "scroll" }}>
                        <Stack spacing={0.8} width="100%">
                            {filteredPrivateChat?.map((el, idx) => {
                                return <PrivateChatElement  {...el} key={idx} />;
                            })}
                        </Stack>
                    </Stack>
                )
            ) : (<Stack sx={{ flexGrow: 1, height: "100%", overflow: "scroll" }}>
                <Stack spacing={0.8} width="100%">
                    {private_conversations?.map((el, idx) => {
                        return <PrivateChatElement {...el} key={idx} />;
                    })}
                </Stack>
            </Stack>
            )}

            <Typography variant="subtitle1">Group chat</Typography>
            {searchItem ? (
                filteredGroupChat?.length === 0 ? (
                    <Box textAlign="center">No chats found</Box>
                ) : (
                    <Stack sx={{ flexGrow: 1, height: "100%", overflow: "scroll" }}>
                        <Stack spacing={0.8} width="100%">
                            {filteredGroupChat?.map((el, idx) => {
                                return <GroupChatElement {...el} key={idx} />;
                            })}
                        </Stack>
                    </Stack>
                )
            ) : (<Stack sx={{ flexGrow: 1, height: "100%", overflow: "scroll" }}>
                <Stack spacing={0.8} width="100%">
                    {group_conversations?.map((el, idx) => {
                        return <GroupChatElement {...el} key={idx} />;
                    })}
                </Stack>
            </Stack>)}
        </>
    );
}
export default SearchChat;