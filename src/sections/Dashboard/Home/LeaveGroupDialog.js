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
import { LeaveGroup } from "../../../redux/slices/conversation";
import { SelectConversation } from "../../../redux/slices/app";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const user_id = window.localStorage.getItem("user_id");

const LeaveGroupDialog = ({ open, handleClose, group_id }) => {
    const dispatch = useDispatch();
    const handleLeaveGroup = () => {
        dispatch(LeaveGroup(group_id));
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
            <DialogTitle>Leave group</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to leave this group?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleLeaveGroup}>Yes</Button>
            </DialogActions>
        </Dialog>
    );
};

export default LeaveGroupDialog;