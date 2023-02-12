import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCr2svPbDsmorRKmMrcRsbH9MTI4E6Zcxs",
    authDomain: "whats-app-clone-7e4f0.firebaseapp.com",
    projectId: "whats-app-clone-7e4f0",
    storageBucket: "whats-app-clone-7e4f0.appspot.com",
    messagingSenderId: "679164623314",
    appId: "1:679164623314:web:eb60cab5c6fffa1335f00b",
    measurementId: "G-MQPQ4J6V0N"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
// const storage = firebase.storage();
// const dataref = firebase.database();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider};
export default db;

