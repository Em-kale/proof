import React, {useState} from 'react'
import {Tabs, Tab, Box, Typography} from '@mui/material'

const Profile = () => {
    const [value, setValue] = useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    return (
        <>
        <Tabs centered variant="fullWidth" sx={{width: "100%", marginTop: "20px"}} textColor="secondary"
             indicatorColor="secondary" value={value} onChange={handleChange}  >
          <Tab value="one" label="Checklists" />
          <Tab value="two" label="Attestations" />
        </Tabs>
      <Box value={value} index={0}>
        {value == "one"? <Typography>CheckLists</Typography> : <Typography>Attestations</Typography>}
      </Box>
      </>)
}

export default Profile