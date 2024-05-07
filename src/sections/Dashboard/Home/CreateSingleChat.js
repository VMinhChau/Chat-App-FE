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
import { FetchAllUsers } from "../../../redux/slices/app";
import { UserElement } from "../../../components/UserElement";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../../components/Search";
import { MagnifyingGlass, X } from "phosphor-react";
import _ from "lodash";
import { axiosAuth } from "../../../utils/axios";
import { showSnackbar } from "../../../redux/slices/app";

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

  const handleInputChange = async (e) => {
    if (e.key === "Enter") {
      console.log("Enter");
      const email = e.target.value;
      console.log(email);
      setSearchItem(email);
      await axiosAuth
        .get("/v1/api/auth/find-user-by-email",
          {
            params: { email }
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          })
        .then(function (response) {
          if (response.data.data !== "User not found") {
            setFilteredUsers(response.data.data);
          }
          console.log(filteredUsers);
        })
        .catch(function (error) {
          console.log(error);
          dispatch(showSnackbar({ severity: "error", message: error.message }));
        });
    }
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
              placeholder="Search user by name or email"
              endAdornment={
                <IconButton
                  onClick={handleClear}
                  sx={{ visibility: searchItem ? "visible" : "hidden" }}
                >
                  <X fontSize={"medium"} />
                </IconButton>
              }
              onKeyDown={handleInputChange}
            // value={searchItem}
            />
          </Search>
        </Stack>
        {filteredUsers?.length === 0 && searchItem ? (
          <Box textAlign="center" p={2}>
            No users found
          </Box>
        ) : (
          filteredUsers?.map((el, idx) => {
            return <UserElement key={idx} {...el} />;
          })
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateSingleChat;
