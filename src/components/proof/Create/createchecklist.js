import React from 'react'
import { Typography, Grid} from '@mui/material'
const CreateChecklist = () => {
    const [checklistObject, setCheckListObject] = useState()


    return (
        <>
        <Typography>
            Check List Creator 
        </Typography>
        <Button>Create</Button>
        </>
    )
}
export default CreateChecklist 