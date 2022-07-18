// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import App from './App';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDP-HqE50AzDBPuYp7m9T3uWdKNE-sZk3I",
  authDomain: "song-tag-ec68c.firebaseapp.com",
  projectId: "song-tag-ec68c",
  storageBucket: "song-tag-ec68c.appspot.com",
  messagingSenderId: "925690998273",
  appId: "1:925690998273:web:3178ffcec69a2e3d8d5a00",
  measurementId: "G-9Z3XWK13S2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);

const logout = async () => {
  try {
    await auth.signOut()
  } catch (error: any) {
    console.log(error.message);
  }
}

function SignInScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const [loggedInUser, setLoggedInUser] = useState<firebase.User | null>(null)

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
      setLoggedInUser(user)
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    );
  }
  return (
    <div>
      <h4>{loggedInUser ? loggedInUser.displayName : "Not logged in"}</h4>
      <App logout = {logout} loggedInUser = {loggedInUser}/>
    </div>
  );
}

export default SignInScreen;