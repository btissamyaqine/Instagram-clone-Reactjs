import firebase from "firebase";


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBxfqH_zXpRyCOjffLnHsXWP3AKuDLWXbY",
    authDomain: "instagram-5a2f4.firebaseapp.com",
    projectId: "instagram-5a2f4",
    storageBucket: "instagram-5a2f4.appspot.com",
    messagingSenderId: "743282508946",
    appId: "1:743282508946:web:780bc68fe3feba0784124b",
    measurementId: "G-865PG8SCCG"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();



  export { db, auth, storage };