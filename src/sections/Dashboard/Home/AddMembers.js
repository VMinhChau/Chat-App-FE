import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Slide,
    Stack,
    Box,
    Avatar,
    Badge,
    styled,
    TextField,
    Chip,
    Typography
} from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormProvider from "../../../components/hook-form/FormProvider";
import { RHFTextField } from "../../../components/hook-form";
import RHFAutocomplete from "../../../components/hook-form/RHFAutocomplete";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllUsers } from "../../../redux/slices/app";
import { FindUserByEmail } from "../../../redux/slices/auth";
import { AddMembersGroup } from "../../../redux/slices/conversation";
import _ from "lodash";
import { createFilterOptions } from '@mui/material/Autocomplete';
import { axiosAuth } from "../../../utils/axios";
import { showSnackbar } from "../../../redux/slices/app";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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

const AddMembersForm = ({ handleClose }) => {
    const dispatch = useDispatch();

    const { all_users, room_id } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(FetchAllUsers());
    }, []);

    const NewGroupSchema = Yup.object().shape({
        members: Yup.array().min(1, "Must have at least 2 members"),
    });

    const defaultValues = {
        members: [],
    };

    const methods = useForm({
        resolver: yupResolver(NewGroupSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting, isValid },
        reset,
    } = methods;

    const onSubmit = async ({ members }) => {
        const data = members?.map(m => m.id);
        console.log(data);
        dispatch(AddMembersGroup(room_id, data));
        handleClose();
    };

    const [searchItem, setSearchItem] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const handleInputChange = async (e) => {
        if (e.key === "Enter") {
            const email = e.target.value;
            console.log("Enter");
            // setFilteredUsers([]);
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

        // const searchTerm = e.target.value;
        // setSearchItem(searchTerm);
        // if (searchTerm === "") {
        //     setFilteredUsers([]);
        //     return;
        // }
        // const filteredEmail = all_users.filter((user) =>
        //     user.email?.toLowerCase().includes(searchTerm.toLowerCase())
        // );
        // const filteredName = all_users.filter((user) =>
        //     user.name?.toLowerCase().includes(searchTerm.toLowerCase())
        // );
        // const filteredItems = _.union(filteredEmail, filteredName);
        // setFilteredUsers(filteredItems);
    };

    const [value, setValue] = useState([]);
    const onDelete = (id) => () => {
        setValue((value) => value.filter((v) => v.id !== id));
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <RHFAutocomplete
                    size="medium"
                    name="members"
                    label="Type name or email"
                    multiple
                    filterSelectedOptions
                    options={filteredUsers}
                    ChipProps={{ size: "medium" }}
                    getOptionLabel={(option) => option.fullName + " " + option.email}
                    // value={value}
                    // onChange={(e, newValue) => setValue(newValue)}
                    onKeyDown={handleInputChange}
                    value={searchItem}
                    // renderTags={() => null}
                    // renderInput={(params) => (
                    //   <TextField
                    //     {...params}
                    //     name="members"
                    //     label="Type name or email"
                    //     onChange={handleInputChange}
                    //     value={searchItem}
                    //   />
                    // )}
                    renderOption={(props, option) => (
                        <Stack direction="row" alignItems={"center"} spacing={2} {...props}>
                            {" "}
                            {option.online ? (
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                    variant="dot"
                                >
                                    <Avatar alt={option.fullName} src={option.img} />
                                </StyledBadge>
                            ) : (
                                <Avatar alt={option.fullName} src={option.img} />
                            )}
                            <Stack spacing={0.3}>
                                <Typography variant="subtitle2">{option.fullName}</Typography>
                                <Typography variant="caption">{option.email}</Typography>
                            </Stack>
                        </Stack>
                    )}
                />
                <Box
                    mt={3}
                    sx={{
                        '& > :not(:last-child)': { marginRight: 1 },
                        '& > *': { marginBottom: 1 },
                    }}
                >
                    {value.map((v) => (
                        <Chip key={v.id} label={v.fullName} onDelete={onDelete(v.id)} />
                    ))}
                </Box>
                <Stack
                    spacing={2}
                    direction={"row"}
                    alignItems="center"
                    justifyContent={"end"}
                >
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained">
                        Add
                    </Button>
                </Stack>
            </Stack>
        </FormProvider>
    );
};

const AddMembers = ({ open, handleClose }) => {
    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            sx={{ p: 2 }}
        >
            <DialogTitle>{"Add New Members"}</DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
                {/* Create Group Form */}
                <AddMembersForm handleClose={handleClose} />
            </DialogContent>
        </Dialog>
    );
};

export default AddMembers;

