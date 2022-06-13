import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBz6LAi1d7watCddeS1GEdfaQfZawgSkKI",
    authDomain: "instagram-clone-a2c37.firebaseapp.com",
    projectId: "instagram-clone-a2c37",
    storageBucket: "instagram-clone-a2c37.appspot.com",
    messagingSenderId: "831502690838",
    appId: "1:831502690838:web:07a9f077ece3c3f7682337",
    measurementId: "G-ZLFDQRK9HM"
  };

  const firebaseapp = firebase.initializeApp(firebaseConfig);

  const db = firebaseapp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage };