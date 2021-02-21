import React from 'react'
import { Grid, Box, Typography } from '@material-ui/core'
import MonthlyBill from './MonthlyBills'
import FirebaseFunctions from '../firebase/firebaseHelper';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: "",
            house_name: "",
            residents: [],
            bills = [],
            transactions = [],
            chores = [],
            FirebaseHelper = new FirebaseFunctions()
        }
    }

    render() {
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
}