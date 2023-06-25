import React from 'react' 
import {Typography, Stack, IconButton} from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';

const Header = (props) => {
    return (
        <Stack direction="row" justifyContent="space-between">
            <Typography variant="h3" fontWeight="fontWeightBold" color="secondary">PROOF</Typography>
            { props.signedIn ? 
            <IconButton color="secondary"
              onClick={() => props.logOut()}
            > 
              <LogoutIcon color="secondary" fontSize="large"></LogoutIcon>
            </IconButton>: <></>
            }
        </Stack>
    )
}
export default Header 