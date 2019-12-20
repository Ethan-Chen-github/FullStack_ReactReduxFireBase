import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyDS4MwUxUfDde1xaC4hS6MVQuTkGVpCuK4",
    authDomain: "wireframer-b43d9.firebaseapp.com",
    databaseURL: "https://wireframer-b43d9.firebaseio.com",
    projectId: "wireframer-b43d9",
    storageBucket: "wireframer-b43d9.appspot.com",
    messagingSenderId: "21831344837",
    appId: "1:21831344837:web:ed2a45138b7329561ac6ac",
    measurementId: "G-C9PT50B3S5"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;