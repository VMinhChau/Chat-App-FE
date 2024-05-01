import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DeleteGroupConversation, FetchDirectConversations } from "../../../redux/slices/conversation";
import { SelectConversation } from "../../../redux/slices/app";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const user_id = window.localStorage.getItem("user_id");

const DeleteChatDialog = ({ open, handleClose, delete_id }) => {
    const { conversations } = useSelector(
        (state) => state.conversation.direct_chat
    );
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(DeleteGroupConversation(delete_id));
        dispatch(SelectConversation({ room_id: null }));
        handleClose();
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Delete this chat</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to delete this chat?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete}>Yes</Button>
            </DialogActions>
        </Dialog>
    );
};
export default DeleteChatDialog;