import React from 'react'
import {AppBar, Fab, Toolbar, Stack, IconButton} from '@mui/material/'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import TimelineIcon from '@mui/icons-material/Timeline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Person2Icon from '@mui/icons-material/Person2';

const Footer = () => {
    return (
        <AppBar sx={{bottom: 0, top: "auto"}} position="fixed" color="secondary" variant="footer">
                <Stack spacing={3} justifyContent='center' alignItems="center" direction="row">
                    <IconButton  href="/" size="small"><HomeIcon fontSize="medium"/></IconButton>
                    <IconButton href="/analytics" size="small"><TimelineIcon  fontSize="medium"/></IconButton>
                    <Fab href="/create-checklist" size='large' variant="extended">
                        <AddCircleIcon fontSize="large"></AddCircleIcon>
                    </Fab>
                    <IconButton href="/notifications" size="small"><NotificationsIcon fontSize="medium"/> </IconButton>
                    <IconButton  href="/profile"  size="small"><Person2Icon  fontSize="medium"/></IconButton>
                </Stack>
        </AppBar>
    )
}
export default Footer 