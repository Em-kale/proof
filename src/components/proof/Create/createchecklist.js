import React, {useState} from 'react'
import { Typography, Grid, TextField, Button, Checkbox, FormControlLabel, ownerDocument} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const CreateChecklist = () => {
    const [checklistObject, setCheckListObject] = useState()
    const [endDate, setEndDate] = useState()
    const [startDate, setStartDate] = useState()
    const [active, setActive] = useState(true)
    const [listName, setListName] = useState("")
    const [organization, setOrganization] = useState("")
    const [asignees, setAsignees] = useState([])
    const [POC, setPOC] = useState("")
    const [owner, setOwner] = useState("")

    function updateActive(e){
        setActive(e.target.checked)
    }
    function updateName(e){
        setListName(e.target.value)
    }
    function updateOrganization(e){
        setOrganization(e.target.value)
    }

    function updateAsignees(e){
        let asigneeArray = e.target.value.split(",")
        setAsignees(asigneeArray) 
    }
    function updatePOC(e){
        setPOC(e.target.value)
    }
    function updateOwner(e){
        setOwner(e.target.value)
    }

    function submit(){
        let checklist = {
            checklistName: listName, 
            organization: organization, 
            startDate: startDate?.toISOString(),
            endDate: endDate?.toISOString(),
            assignTo: asignees, 
            assignedToAccount: "",
            pocAccount: POC,
            accountableOwnerAccount: owner, 
            checklistCreatorAccount: "",
            activeStatus: active
        }

        console.log("checklist_object", checklist)
        window.location.href = "/create-item";
    }

  
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        
        <Typography variant="h5" fontWeight="fontWeightBold" color="secondary" sx={{display: "block", marginTop: "100px",  marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>Create Checklist</Typography>
        <Grid container rowSpacing={2} columnSpacing={1} justifyContent="center" alignItems="center" sx={{ marginTop: "50px"}}>   
            <Grid item xs={6}>
                 <TextField onChange={(e)=>updateName(e)} color="secondary" variant="filled" label="Checklist Name"></TextField>
            </Grid>     
            <Grid item xs={6}>   
                 <TextField onChange={(e)=>updateOrganization(e)} color="secondary" variant="filled" label="Organization"></TextField>
            </Grid>     
            <Grid item xs={12}>
                 <TextField onChange={(e)=>updateAsignees(e)} color="secondary" variant="filled" label="Asignees" sx={{width: "100%"}}></TextField>
            </Grid>
            <Grid item xs={6}>
                 <TextField onChange={(e)=>updatePOC(e)} color="secondary" variant="filled" label="Point of Contact"></TextField>
            </Grid>
            <Grid item xs={6}>
                 <TextField onChange={(e)=>updateOwner(e)} color="secondary" variant="filled" label="Owner"></TextField>
            </Grid>
            <Grid item xs={6}>
                 <DatePicker
                    defaultValue={dayjs('2022-04-17')} 
                    label="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e)}
                    />
            </Grid>
            <Grid item xs={6}>
                   <DatePicker
                    defaultValue={dayjs('2022-04-17')} 
                    label="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e)}
                    />
                 {/* Dates and Checkbox for active */}
            </Grid>
            <Grid item xs={12}>
                 <FormControlLabel
                    sx={{display: "block", margin: "auto"}}
                    label="Active"
                    control={<Checkbox color="secondary" checked={active} onChange={(e)=>{updateActive(e)}} />}
                />
            </Grid>
            <Grid item xs={6}>     
                 <Button onClick={()=>submit()} sx={{display: "block", margin: "auto", width: "60%"}} variant="contained" color="secondary">Create</Button>
            </Grid>
        </Grid>
        </LocalizationProvider>
    )
}
export default CreateChecklist 