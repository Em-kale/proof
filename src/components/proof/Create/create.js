import React, {useState} from 'react'
import { Button, TextField, Typography, Stack, Grid, Paper} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const Create = (props) => {
    const [value, setValue] = useState()
    const [items, setItems] = useState([])
    const [title, setTitle] = useState("")
    const [attesters, setAttesters] = useState([])
    const [description, setDescription] = useState([])
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState() 


    return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
        <Grid  container rowSpacing={2} columnSpacing={1} justifyContent='center' alignItems="center">
            {/* checklist mame, organization, start date. end date, asignees, Contact account, Accountable Account, active status*/}
        <Grid item xs={6}>
                <TextField label="Title" color="secondary" variant="filled"></TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField color="secondary" variant="filled" label="Attester AccountIds"></TextField>
            </Grid>
            <Grid item xs={12}>
            <TextField color="secondary" variant="filled" multiline label="Description" sx={{width: "100%"}}></TextField>
            </Grid>
            <Grid item xs={6}>
            {/* Attestation Required?, Item start (optional), item deadline (optional) , description */}
            <DatePicker
                defaultValue={dayjs('2022-04-17')} 
                label="Start Date"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                />
            </Grid>
            <Grid item xs={6}>
            <DatePicker
            defaultValue={dayjs('2022-04-17')} 
            label="End Date"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            />
            </Grid>
            <Grid item xs={12}>
            <Button variant="contained" color="secondary" elevation={10} sx={{display: "block", margin: "auto", width: "60%"}}>Add Item</Button>
            </Grid>
        </Grid>
        <Paper elevation={7} sx={{overflowY: "scroll", display: "block", margin: "auto", width: "90%", minHeight: "400px"}}>
            <Stack alignItems="center" >
            { items.length === 0 ? <Typography >No Items Added Yet</Typography>:
            <></>}
            </Stack>
        </Paper>
    </Stack>
    </LocalizationProvider>
    )
}

export default Create