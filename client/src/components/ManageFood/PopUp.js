import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './PopUp.css'
export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props;

    return (
        <Dialog open={openPopup} maxWidth="md" >
            <DialogTitle >
                <div style={{ display: 'flex' }}>
                    <Typography id="header" variant="h6" component="div" align="center" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Button
                        id = "ButtonClose"
                        onClick={()=>{setOpenPopup(false)}}>
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}