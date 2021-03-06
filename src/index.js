import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const AppKey = require('./APIKeys');

const firebase = require('firebase');
require('firebase/firestore');
var firebaseConfig = AppKey.firebaseConfig;
firebase.initializeApp(firebaseConfig);


ReactDOM.render(<App />, document.getElementById('clone-root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
