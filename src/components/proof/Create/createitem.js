import React, {useState} from 'react'
import { Button, TextField, Typography, Stack, Grid, Paper, 
FormControlLabel, Checkbox} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';



const CreateItem = (props) => {
    const [items, setItems] = useState([])
    const [title, setTitle] = useState("")
    const [attestors, setAttestors] = useState([])
    const [description, setDescription] = useState([])
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState() 
    const [itemComponent, setItemComponent] = useState()
    const [attestationRequired, setAttestationRequired] = useState(false)

    function updateTitle(e){
        setTitle(e.target.value)
    }
    function updateDescription(e){
        setDescription(e.target.value)
    } 
    function updateAttestors(e){
        let attestorArray = e.target.value.split(",")
        setAttestors(attestorArray)
    }
    function updateAttestationRequired(e){
        setAttestationRequired(e.target.checked)
    }
    function updateItems(){
        let item_object = {
            itemTitle: title, 
            itemDescription: description, 
            itemStart: startDate?.toISOString(),
            itemDeadline: endDate?.toISOString(), 
            itemCompleted: false, 
            itemCompletionDate: "",
            itemAttestationRequired: attestationRequired,
            itemAuthorizedAttestors: attestors, 
            itemAttestationRecieved: "",
            itemAttestationId: "",
            itemAttestationRequested: false,
            itemDateAttestationRequested: "",
            itemAttestationRequestedFromAccount: ""
        }
        let temp = items
        temp.push(item_object)
        setItems(temp)

        setItemComponent(items.reverse().map((i)=>{
            return ( 
                <>
                <Typography >{i.itemTitle}</Typography>
               </>
            )
        }))
    }

  

    return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Typography variant="h5" fontWeight="fontWeightBold" color="secondary" sx={{ marginTop: "20px", textAlign: "center"}}>Add Items</Typography>
        <Stack spacing={4} justifyContent="center" alignItems="center" sx={{width: "90%", display: "block", marginLeft: "auto", marginRight: "auto", marginTop: "20px"}}>
        <Grid  container rowSpacing={2} columnSpacing={1} justifyContent='center' alignItems="center">
            {/* checklist mame, organization, start date. end date, asignees, Contact account, Accountable Account, active status*/}
        <Grid item xs={6}>
                <TextField onChange={(e)=>{updateTitle(e)}} label="Title" color="secondary" variant="filled"></TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField onChange={(e)=>{updateAttestors(e)}} color="secondary" variant="filled" label="Attester AccountIds"></TextField>
            </Grid>
            <Grid item xs={12}>
            <TextField onChange={(e)=>{updateDescription(e)}} color="secondary" variant="filled" multiline rows={3} label="Description" sx={{width: "100%"}}></TextField>
            </Grid>
            <Grid item xs={6}>
            <DatePicker
                defaultValue={dayjs('2022-04-17')} 
                label="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e)}
                />
            </Grid>
            <Grid item xs={6}>
            <DatePicker
            defaultValue={dayjs('2022-04-17')} 
            label="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e)}
            />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    sx={{display: "block", margin: "auto"}}
                    label="Attestation Required"
                    control={<Checkbox color="secondary" checked={attestationRequired} onChange={(e)=>{updateAttestationRequired(e)}} />}
                />
            </Grid>
            <Grid item xs={12}>
            <Button onClick={()=>updateItems()} variant="contained" color="secondary" elevation={10} sx={{display: "block", margin: "auto", width: "60%"}}>Add Item</Button>
            </Grid>

        </Grid>
        <Paper elevation={7} sx={{overflowY: "scroll", display: "block", margin: "auto", height: "250px"}}>
            <Stack alignItems="center" >
            { items.length === 0 ?
               <Typography>No Items Added Yet</Typography>:
               <>{itemComponent}</>
                }
            </Stack>
        </Paper>
    </Stack>
    </LocalizationProvider>
    )
}

export default CreateItem