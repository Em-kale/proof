import React from 'react'
import {AppBar, Toolbar, Stack, IconButton} from '@mui/material/'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import TimelineIcon from '@mui/icons-material/Timeline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Person2Icon from '@mui/icons-material/Person2';

const Footer = () => {
    return (
        <AppBar color="secondary" position="fixed" variant="footer">
                <Stack spacing={3} justifyContent='center' alignItems="center" direction="row">
                    <IconButton size="small"><HomeIcon fontSize="medium"/></IconButton>
                    <IconButton size="small"><TimelineIcon  fontSize="medium"/></IconButton>
                    <IconButton size='large'>
                        <AddCircleIcon  fontSize="large"></AddCircleIcon>
                    </IconButton>
                    <IconButton size="small"><NotificationsIcon fontSize="medium"/> </IconButton>
                    <IconButton size="small"><Person2Icon  fontSize="medium"/></IconButton>
                </Stack>
        </AppBar>
    )
}
export default Footer 