import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignInScreen from './Authentication';
// Import the functions you need from the SDKs you need


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
ReactDOM.render(
  <React.StrictMode>
    <SignInScreen />
  </React.StrictMode>,
  document.getElementById('root')
);
