import logo from './logo.svg';
import './App.css';
// import { FirebaseContext } from './firebase'
import firebase from './firebase/firebase'
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import React from 'react'
import FirebaseFunctions from './firebase/firebaseHelper'

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
  let FirebaseHelper = new FirebaseFunctions();

  FirebaseHelper.getUser(FirebaseHelper.USER_ID).then(user => {
    console.log(user)
    FirebaseHelper.getHouse(user.houseRef).then(house => {
      console.log("this is the house")
      console.log(house)
    })

    FirebaseHelper.addResident(user.houseRef, 'users/NnS4f0DkRzKeIUNCfc5j"')
  })

  return (
      <div className="App">
        <FirebaseAuthProvider {...config} firebase={firebase}>
      <div>
        <button
          onClick={() => {
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(googleAuthProvider);
          }}
        >
          Sign In with Google
        </button>
        <button
          data-testid="signin-anon"
          onClick={() => {
            firebase.auth().signInAnonymously();
          }}
        >
          Sign In Anonymously
        </button>
        <button
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          Sign Out
        </button>
        <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId }) => {
            return (
              <pre style={{ height: 300, overflow: "auto" }}>
                {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
              </pre>
            );
          }}
        </FirebaseAuthConsumer>
        <div>
          <IfFirebaseAuthed>
            {() => {
              return <div>You are authenticated</div>;
            }}
          </IfFirebaseAuthed>
          <IfFirebaseAuthedAnd
            filter={({ providerId }) => providerId !== "anonymous"}
          >
            {({ providerId }) => {
              return <div>You are authenticated with {providerId}</div>;
            }}
          </IfFirebaseAuthedAnd>
        </div>
      </div>
    </FirebaseAuthProvider>
      </div>

    
  );
}

export default App;
