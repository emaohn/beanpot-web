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

    editTransaction = (houseRef, oldTrans, newTrans) => {
        return new Promise(resolve => {
            houseRef.update({ expenses: firebase.firestore.FieldValue.arrayRemove(oldTrans) })
                .then(() => {
                    houseRef.update({ expenses: firebase.firestore.FieldValue.arrayUnion(newTrans)})
                })
        })
    }

    addBill = (houseRef, bill) => {
        return houseRef.update({monthly_bills: firebase.firestore.FieldValue.arrayUnion(bill)})
    }

    editBill = (houseRef, oldBills, newBills) => {
        return new Promise(resolve => {
            houseRef.update({ bills: firebase.firestore.FieldValue.arrayRemove(oldBills) })
                .then(() => {
                    houseRef.update({ bills: firebase.firestore.FieldValue.arrayUnion(newBills)})
                })
        })
    }

    addChore = (houseRef, chore) => {
        return houseRef.update({chores: firebase.firestore.FieldValue.arrayUnion(chore)})
    }

    editChore = (houseRef, oldChores, newChores) => {
        return new Promise(resolve => {
            houseRef.update({ chores: firebase.firestore.FieldValue.arrayRemove(oldChores) })
                .then(() => {
                    houseRef.update({ chores: firebase.firestore.FieldValue.arrayUnion(newChores)})
                })
        })
    }
}




