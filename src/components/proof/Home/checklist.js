import React, {useState} from 'react'
import {Paper, FormControlLabel, Dialog, Checkbox, Typography, Stack, IconButton} from '@mui/material'
import QrCodeIcon from '@mui/icons-material/QrCode';
import { QRCodeCanvas } from "qrcode.react";

const Checklist = (props) => {
    const [value, setValue] = useState(false)
    const [open, setOpen] = useState(false)

    const url = "http://test.com"

    let items = [{title: "Mediation with HR"}, {title: "Deliver supplies"}] 
    
    function updateValue(e){
        setValue(e.target.checked)
    }

    const qrcode = (
        <QRCodeCanvas
          id="qrCode"
          value={url}
          size={300}
        //   bgColor={"#00ff00"}
          level={"H"}
        />)
    
        function handleClick(){
            setOpen(open => !open)    
        }
        
        const handleClose = () => {
            setOpen(open => !open);
          };

    const itemList = items.map((i)=>{
        return (
            <>
            <Dialog open={open} onClose={handleClose}>
                <div>{qrcode}</div>
            </Dialog>
            <Stack direction="horizontal" justifyContent="space-between" sx={{padding: "5px"}}> 
                 <FormControlLabel
                    control={<Checkbox color="secondary" checked={value} onChange={(e)=>{updateValue(e)}} />}
                />
                <Typography sx={{marginTop: "10px"}} variant="h5" >{i.title}</Typography>
                <IconButton onClick={()=>{handleClick()}} color="secondary" size="large" >
                        <QrCodeIcon fontSize="large" color="secondary"></QrCodeIcon>
                </IconButton>
            </Stack>
            </>
        )
    })

    return (
        <Paper sx={{display: "block", marginLeft: "auto", marginRight: "auto", marginTop: "100px", height: "200px", width: "90%"}}>
            <Typography variant="h4" sx={{textAlign: "center", marginBottom: "10px"}}>Administration</Typography>
            {itemList}
        </Paper>
    )
}
export default Checklist