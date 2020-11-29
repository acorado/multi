import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { functions } from "firebase";

const firebaseConfig = {
apiKey: "AIzaSyDKw1nHDyJ1MMyeu0snRdWQ_1tkmXJeM-o",
    authDomain: "alecorado1.firebaseapp.com",
    databaseURL: "https://alecorado1.firebaseio.com",
    projectId: "alecorado1",
    storageBucket: "alecorado1.appspot.com",
    messagingSenderId: "168494778034",
    appId: "1:168494778034:web:f3ce61134a512816a6ebab",
  measurementId: "G-77Z5WJ0SET"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

const provider2= new firebase.auth.FacebookAuthProvider();

export const signInWithFacebook = () => {
  auth.signInWithPopup(provider2);
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
