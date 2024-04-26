import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  IconButton,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllUsers } from "../../redux/slices/app";
import { UserElement } from "../../components/UserElement";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { MagnifyingGlass, X } from "phosphor-react";
import _ from "lodash";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateSingleChat = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const { all_users } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(FetchAllUsers());
  }, []);

  const [searchItem, setSearchItem] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    if (searchTerm === "") {
      setFilteredUsers([]);
      return;
    }
    const filteredEmail = all_users.filter((user) =>
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredName = all_users.filter((user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredItems = _.union(filteredEmail, filteredName);
    setFilteredUsers(filteredItems);
  };

  const handleClear = () => {
    setSearchItem("");
    setFilteredUsers([]);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 4 }}
    >
      <DialogTitle>{"New messages with"}</DialogTitle>
      <DialogContent>
        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#637381" />
            </SearchIconWrapper>
            <StyledInputBase
              // type="search"
              placeholder="Search user by name or email"
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
        {filteredUsers.length === 0 && searchItem ? (
          <Box textAlign="center" p={2}>
            No users found
          </Box>
        ) : (
          filteredUsers.map((el, idx) => {
            return <UserElement key={idx} {...el} />;
          })
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateSingleChat;
