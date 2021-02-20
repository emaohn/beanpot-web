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

function App() {
  const ref = firebase.firestore().collection("users")

  ref.onSnapshot((querySnapshot) => {
    const users = []
    querySnapshot.forEach((doc) => {
      users.push(doc.data())

      doc.data().house[0].get().then(data => {
        console.log(data.data())
      })
    })
  })

  return (

      <div className="App">
        <FirebaseAuthProvider firebase={firebase} {...config}>
          {
            // my app code
          }
        </FirebaseAuthProvider>

        <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId }) => {
            return (
              <pre style={{ height: 300, overflow: "auto" }}>
                {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
              </pre>
            );
          }}
        </FirebaseAuthConsumer>

        <IfFirebaseAuthedAnd
          filter={({ providerId, user }) => {
            if(!user.email){return false;}
            return (
              providerId !== "anonymous" &&
              user.email.indexOf("@companyname.com") > -1
            );
          }}
          >
          {({ isSignedIn, user, providerId }) => {
            return (
              <div> Hello </div>
            );
          }}
        </IfFirebaseAuthedAnd>
      </div>

    
  );
}

export default App;
