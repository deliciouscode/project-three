import firebase from 'firebase/app';
import 'firebase/database';

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyCsuB2_72rxZsSfpJ9wDqDh1Xm6w8kk5Os",
    authDomain: "delicious-code.firebaseapp.com",
    projectId: "delicious-code",
    storageBucket: "delicious-code.appspot.com",
    messagingSenderId: "440871225418",
    appId: "1:440871225418:web:a874197f6d164524677eb3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;