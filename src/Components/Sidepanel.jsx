import { useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './Components.css'
import { createChat } from '../Redux/apiCalls';

const Sidepanel = () => {

    const iconStyles = {
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
    };
    
    const hoverStyles = {
        transform: 'scale(1.2)',
    };
    

    const [open, setOpen] = React.useState(false);

    const [ responseMessage, setResponseMessage ]= useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setResponseMessage("")
    };
    
    const [ newChatInput, setNewChatInput ]= useState("")
    
    const handleChatInput= (data) => {
        setNewChatInput(data)
    }
    
    const username= useSelector((state)=>state.user.user.username)
    const token= useSelector((state)=>state.user.token)
    // console.log(username, token)
    const handleClick = async () => {
        const response= await createChat(username, newChatInput, token)
        if (response.status===400) {
            setResponseMessage(response.data)
        }
        else {
            window.location.reload(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.code === "Enter") {
            handleClick(e)
        }
    };

    return (
        <div className="sidepanel">
            <div className='top'>
                <AddOutlinedIcon 
                onClick={handleClickOpen}
                style={{cursor: 'pointer', color: "#031d3b"}}
                />
                <InboxOutlinedIcon
                style={{cursor: 'pointer', color: "#031d3b"}} />
                <GroupsOutlinedIcon 
                style={{cursor: 'pointer', color: "#031d3b"}} />
            </div>
            <div>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle style={{backgroundColor: "#379683", color: "#031d3b"}}>Chat with...</DialogTitle>
                <DialogContent style={{backgroundColor: "#8ee4af"}}>
                    <DialogContentText style={{color: "#031d3b"}}>
                        Enter their username
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="username"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(e)=>handleChatInput(e.target.value)}
                        style={{color: "#031d3b"}}
                        onKeyDown={handleKeyDown}
                    />
                </DialogContent>
                <p style={{display: "flex", justifyContent: "center", alignItems: "center", color: "red"}}>
                    {responseMessage}
                </p>
                <DialogActions style={{backgroundColor: "#8ee4af"}}>
                    <Button style={{color: "#031d3b"}} onClick={handleClose}>Cancel</Button>
                    <Button style={{color: "#031d3b"}} onClick={handleClick}>Chat</Button>
                </DialogActions>
            </Dialog>
            </div>
            <div className='bottom'>
                <Link to="/logout" 
                    style={{color: "black"}}>
                    <AccountCircleOutlinedIcon 
                    style={{cursor: 'pointer', color: "#031d3b"}} />
                </Link>
                <SettingsOutlinedIcon 
                style={{cursor: 'pointer', color: "#031d3b"}} />
            </div>
        </div>
    )
}

export default Sidepanel