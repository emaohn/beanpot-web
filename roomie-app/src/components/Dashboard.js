import React from 'react'
import { Grid, Box, Typography } from '@material-ui/core'
import MonthlyBill from './MonthlyBills'
import FirebaseFunctions from '../firebase/firebaseHelper';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_ref: 'users/NnS4f0DkRzKeIUNCfc5j',
            house_ref: "",
            user_name: "",
            house_name: "",
            residents: [],
            bills: [],
            transactions: [],
            chores: [],
            FirebaseHelper: null
        }
    }

    componentDidMount() {
        let FirebaseHelper = new FirebaseFunctions()
        FirebaseHelper.getUser('NnS4f0DkRzKeIUNCfc5j').then(user => {
            user.getHouse().then(house => {
                this.setState({
                    house_ref: user.houseRef,
                    user_name: user.name,
                    house_name: house.name,
                    residents: house.residents,
                    bills: house.bills,
                    transactions: house.transactions,
                    chores: house.chores,
                    FirebaseHelper: FirebaseHelper
                })
            })

        })
    }

    getBillsToPay = () => {
        return this.state.bills.filter(bill => bill.people_left.contains(this.state.user_ref))
    }

    getTransactionsToPay = () => {
        return this.transactions.filter(trans => trans.debtors.contains(this.state.user_ref))
    }

    getTransactionsUnpaid = () => {
        return this.transactions.reduce((acc, trans) => {
            if (trans.people_left.contains(this.state.user_ref)) {
                acc.toPay.push(trans)
            } else if (trans.people_left.length() > 0 && trans.creditors === this.state.user_ref) {
                acc.toRecieve.push(trans)
            }
        }, {toPay: [], toRecieve: []})
    }

    getAllUserTransactions = () => {
        return this.transactions.reduce((acc, trans) => {
            if (trans.debtors.contains(this.state.user_ref)) {
                acc.toPay.push(trans)
            } else if (trans.creditors === this.state.user_ref) {
                acc.toRecieve.push(trans)
            }
        }, {toPay: [], toRecieve: []})
    }

    addResident = (userRef) => {
        this.FirebaseHelper.addResident(this.state.house_ref, userRef)
        this.setState({ residents: this.state.concat([userRef]) })
    }

    addTransaction = (trans) => {
        this.FirebaseHelper.addTransaction(this.state.house_ref, trans)
        this.setState({ transactions: this.state.transactions.concat([trans])})
    }

    addBill = (bill) => {
        this.FirebaseHelper.addBill(this.state.house_ref, bill)
        this.setState({ bills: this.state.bills.concat(bills) })
    }

    addChore = (chore) => {
        this.FirebaseHelper.addChore(this.state.house_ref, chore)
        this.setState({ chores: this.state.chores.concat([chore])})
    }

    deleteChore = (chore) => {
        this.setState({ chores: this.state.chores.filter(c => c.name === chore.name)})
    }

    deleteBill = (bill) => {
        this.setState({ bills: this.state.bills.filter(b => b.name === bill.name) })
    }

    deleteTransaction = (trans) => {
        this.setState({ transactions: this.state.bills.filter(t => t.name === trans.name) })
    }

    render() {
        console.log(this.state)
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