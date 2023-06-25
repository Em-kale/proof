import React from 'react'
import Typography from '@mui/material/Typography'
import { Card, CardHeader, Divider, CardContent, CardActions, CardActionArea, Paper } from "@mui/material"

import enterprise from '../../../images/enterprise.png'
import game from '../../../images/game.png'
import money from '../../../images/money.png'
import education from '../../../images/education.png'
    const Home = () => {
    return <>
    <Typography variant="h6">is in the checklist</Typography>
    <Typography variant="body1"></Typography>
    <Card elevation={0} component={Paper} style={{marginTop: '10px'}}>
        <div style={{float:'right', marginRight:'25px'}}>
            <img src={enterprise}/>
        </div>
        <CardHeader
            title="For Work"
            subheader="Real-time onboarding."
        />
        <CardContent>
            <Typography variant="body1">Guide and track new hires as they move towards being productive members of your enterprise.</Typography>
        </CardContent>
    </Card>
    <Divider variant="middle" align="center" color="#000000" style={{width: '75%', color: 'black', marginTop: '10px', marginBottom: '10px'}} />
    <Card elevation={0} component={Paper} style={{marginTop: '10px'}}>
        <div style={{float:'left', marginLeft:'25px'}}>
            <img src={game}/>
        </div>
        <CardHeader
            title="For Play"
            subheader="Next level scavenger hunts."
            style={{textAlign: 'right'}}
        />
        <CardContent>
            <Typography variant="body1">Provide fun and local engagements with real-time leaderboards and incentives.</Typography>
        </CardContent>
    </Card>
    <Divider variant="middle" align="center" color="#000000" style={{width: '75%', color: 'black', marginTop: '10px', marginBottom: '10px'}} />

    <Card elevation={0} component={Paper} style={{marginTop: '10px'}}>
        <div style={{float:'right', marginRight:'25px'}}>
            <img src={money}/>
        </div>
        <CardHeader
            title="For Profit"
            subheader="Follow ."
        />
        <CardContent>
            <Typography variant="body1">Share the steps that increase income streams and impact lives.</Typography>
        </CardContent>
    </Card>
    <Divider variant="middle" align="center" color="#000000" style={{width: '75%', color: 'black', marginTop: '10px', marginBottom: '10px'}} />

    <Card elevation={0} component={Paper} style={{marginTop: '10px'}}>
        <div style={{float:'left'}}>
            <img src={education}/>
        </div>
        <CardHeader
            title="For Mentorship"
            subheader="Follow in their footsteps."
            style={{textAlign: 'right'}}
        />
        <CardContent>
            <Typography variant="body1">Show people the proven path and see how many people you impact along the way.</Typography>
        </CardContent>
    </Card>
    </>
}
export default Home 