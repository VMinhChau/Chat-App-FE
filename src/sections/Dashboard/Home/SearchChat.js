import React, { useEffect, useState } from "react";
import {
    Box,
    IconButton,
    Stack,
} from "@mui/material";
import {
    MagnifyingGlass,
    X,
} from "phosphor-react";
import ChatElement from "../../../components/ChatElement";
import {
    Search,
    SearchIconWrapper,
    StyledInputBase,
} from "../../../components/Search";

const SearchChat = ({ conversations }) => {
    const [searchItem, setSearchItem] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(conversations);

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);
        const filteredItems = conversations.filter((conversation) =>
            conversation.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filteredItems);
    };

    const handleClear = () => {
        setSearchItem("");
        setFilteredUsers(conversations);
    };

    return (
        <>
            <Stack sx={{ width: "100%" }}>
                <Search>
                    <SearchIconWrapper>
                        <MagnifyingGlass color="#637381" />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
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
            {searchItem ? (
                filteredUsers.length === 0 ? (
                    <Box textAlign="center">No users found</Box>
                ) : (
                    <Stack sx={{ flexGrow: 1, height: "100%", overflow: "scroll" }}>
                        <Stack spacing={0.8} width="100%">
                            {filteredUsers.map((el, idx) => {
                                return <ChatElement {...el} key={idx} />;
                            })}
                        </Stack>
                    </Stack>
                )
            ) : (<Stack sx={{ flexGrow: 1, height: "100%", overflow: "scroll" }}>
                <Stack spacing={0.8} width="100%">
                    {conversations.map((el, idx) => {
                        return <ChatElement {...el} key={idx} />;
                    })}
                </Stack>
            </Stack>)}
        </>
    );
}
export default SearchChat;