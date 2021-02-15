import firebase from "firebase";


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB2L-275-hmzt1mH0XXUoxbHgJZF-jbbi8",
    authDomain: "instagram-clone-react-ed377.firebaseapp.com",
    databaseURL: "http://instagram-clone-react-ed377.firebaseio.com",
    projectId: "instagram-clone-react-ed377",
    storageBucket: "instagram-clone-react-ed377.appspot.com",
    messagingSenderId: "93568403506",
    appId: "1:93568403506:web:95f91f959804ca3b76542b",
    measurementId: "G-T362Q2R5ZG"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();



  export { db, auth, storage };