import logo from './logo.svg';
import './App.css';
// import { FirebaseContext } from './firebase'
import firebase from './firebase/firebase'
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
}

export default App;
