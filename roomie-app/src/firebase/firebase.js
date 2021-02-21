import firebase from "firebase/app"
import 'firebase/auth';
import 'firebase/firestore';
import { functions } from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDyMVuTZG5O-L_wWF_zFCuUfZVeX-m2eXY",
    authDomain: "hackbeanpot-roomie-app.firebaseapp.com",
    projectId: "hackbeanpot-roomie-app",
    storageBucket: "hackbeanpot-roomie-app.appspot.com",
    messagingSenderId: "998032024340",
    appId: "1:998032024340:web:cdbc8e12da9f7855011801",
    measurementId: "G-EHH1EP9JQV"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export default firebase;
