import './App.css';
// import { FirebaseContext } from './firebase'
import firebase from './firebase/firebase'

import React, { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Application from "./Components/Application";
import UserProvider from "./providers/UserProvider";
import ProfilePage from "./Components/ProfilePage";
import { UserContext } from "./providers/UserProvider";

var config = {
  apiKey: "AIzaSyDyMVuTZG5O-L_wWF_zFCuUfZVeX-m2eXY",
  authDomain: "hackbeanpot-roomie-app.firebaseapp.com",
  projectId: "hackbeanpot-roomie-app",
  storageBucket: "hackbeanpot-roomie-app.appspot.com",
  messagingSenderId: "998032024340",
  appId: "1:998032024340:web:cdbc8e12da9f7855011801",
  measurementId: "G-EHH1EP9JQV"
};

function App() {
  const ref = firebase.firestore().collection("users")

  return (
    <UserProvider>
      <Application />
    </UserProvider>
  );
}

export default App;
