import firebase from './firebase'
import House from '../models/House'
import User from '../models/User'

export default class FirebaseFunctions {
    constructor() {
        this.db = firebase.firestore()
        this.USER_ID = "NnS4f0DkRzKeIUNCfc5j"
    }

    getUser = (id) => {
        let usersRef = this.db.collection("users");
        return new Promise(resolve => {
            usersRef.doc(id).get().then(doc => {
                let data = doc.data()
                resolve(new User(data.name, data.house[0]));
            })
        })
    }

    getHouse = (ref) => {
        return new Promise(resolve => {
            ref.get().then(doc => {
                let data = doc.data();
                resolve(new House(data.name, data.residents, data.monthly_bills, data.expenses, data.chores, ref))
            })
        })
    }

    getAllUserRefs = () => {
        let ref = this.db.collection("users")
        ref.onSnapshot((querySnapshot) => {
            const users = []
            querySnapshot.forEach(doc => {
                users.push(doc)
            })
            return users
        })
    }

    addResident = (houseRef, userRef) => {
        return houseRef.update({residents: firebase.firestore.FieldValue.arrayUnion(userRef)})
    }

    addTransaction = (houseRef, transaction) => {
        return houseRef.update({expenses: firebase.firestore.FieldValue.arrayUnion(transaction)})
    }

    addBill = (houseRef, bill) => {
        return houseRef.update({monthly_bills: firebase.firestore.FieldValue.arrayUnion(bill)})
    }

    addChore = (houseRef, chore) => {
        return houseRef.update({chores: firebase.firestore.FieldValue.arrayUnion(chore)})
    }
}




