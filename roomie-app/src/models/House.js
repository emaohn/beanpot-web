import FirebaseFunctions from '../firebase/firebaseHelper'

export default class House {
    constructor(name, residents, bills, transactions, chores) {
        this.name = name;
        this.residents = residents;
        this.bills = chores
        this.transactions = chores
        this.chores = chores
        this.FirebaseHelper = new FirebaseFunctions()
    }

    getName = () => this.name;
    getResidents = () => this.residents;
    getAllBills = () => this.bills;
    getAllTransactions = () => this.transactions;
    getAllChores = () => this.chores;

    getBillsToPay = (userRef) => {
        return this.bills.filter(bill => bill.people_left.contains(userRef))
    }

    getTransactionsToPay = (userRef) => {
        return this.transactions.filter(trans => trans.debtors.contains(userRef))
    }

    getTransactionsUnpaid = (userRef) => {
        return this.transactions.reduce((acc, trans) => {
            if (trans.people_left.contains(userRef)) {
                acc.toPay.push(trans)
            } else if (trans.people_left.length() > 0 && trans.creditors === userRef) {
                acc.toRecieve.push(trans)
            }
        }, {toPay: [], toRecieve: []})
    }

    getAllUserTransactions = (userRef) => {
        return this.transactions.reduce((acc, trans) => {
            if (trans.debtors.contains(userRef)) {
                acc.toPay.push(trans)
            } else if (trans.creditors === userRef) {
                acc.toRecieve.push(trans)
            }
        }, {toPay: [], toRecieve: []})
    }

    addResident = (houseRef) => {
        this.FirebaseHelper.addResident(houseRef)
        return this
    }

    addTransaction = (houseRef, trans) => {
        this.FirebaseHelper.addTransaction(houseRef, trans)
        return this
    }

    addBill = (houseRef, bill) => {
        this.FirebaseHelper.addBill(houseRef, bill)
        return this
    }

    addChore = (houseRef, chore) => {
        this.FirebaseHelper.addChore(houseRef, chore)
        return this
    }
}