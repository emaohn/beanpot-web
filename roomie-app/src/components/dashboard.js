import React from 'react'
import { Grid, Box, Typography } from '@material-ui/core'
import MonthlyBill from './MonthlyBills'

export default function Dashboard(props) {
    return (
        <Box p={5}>
            <Grid container direction="column" alignItems="flex-start">
                <Grid item>
                    <Box>
                        <Typography variant="h2" gutterBottom>Hello, Emmie</Typography>
                    </Box>
                </Grid>
                <Grid container item direction="row" alignItems="center">
                    <MonthlyBill />
                </Grid>
            </Grid>
        </Box>
    );
}