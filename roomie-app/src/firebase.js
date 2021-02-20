import app from "firebase/app"
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDyMVuTZG5O-L_wWF_zFCuUfZVeX-m2eXY",
    authDomain: "hackbeanpot-roomie-app.firebaseapp.com",
    projectId: "hackbeanpot-roomie-app",
    storageBucket: "hackbeanpot-roomie-app.appspot.com",
    messagingSenderId: "998032024340",
    appId: "1:998032024340:web:cdbc8e12da9f7855011801",
    measurementId: "G-EHH1EP9JQV"
};

export default class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.db = firebase.firestore();
        this.auth = firebase.auth();
    }
}

