// import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// import * as firebase from 'firebase';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSic3jmsL-pJZiZz4Wwa2QJLwwSios684",
  authDomain: "dakirni.firebaseapp.com",
  databaseURL: "https://dakirni-default-rtdb.firebaseio.com",
  projectId: "dakirni",
  storageBucket: "dakirni.appspot.com",
  messagingSenderId: "744400890347",
  appId: "1:744400890347:web:dc2b4c92977e25663411ae"
};

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// let database = firebaseApp.database();

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

// firebase.initializeApp(firebaseConfig);

export default database;

// export default firebase.database();