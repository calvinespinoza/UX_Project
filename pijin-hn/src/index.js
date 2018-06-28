import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';
import './index.css';


var config = {
    apiKey: "AIzaSyBE8yTf0nQHdXYjVKMpVbJ3wsJUWIfbAlk",
    authDomain: "pijin-hn.firebaseapp.com",
    databaseURL: "https://pijin-hn.firebaseio.com",
    projectId: "pijin-hn",
    storageBucket: "pijin-hn.appspot.com",
    messagingSenderId: "179652224625"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
