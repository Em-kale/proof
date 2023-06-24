import React from 'react' 
import {Typography, Stack, Button} from "@mui/material"

const Header = (props) => {
    return (
        <Stack direction="row">
            <Typography variant="h3" fontWeight="fontWeightBold" color="secondary">PROOF</Typography>
            <Button variant="contained" color="secondary"
              onClick={() => props.logOut()}
            >
              Sign Out
            </Button>
        </Stack>
    )
}
export default Header 