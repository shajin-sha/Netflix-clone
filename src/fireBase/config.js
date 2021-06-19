import firebase from "firebase";
import "firebase/auth";
import "firebase/firebase";
import "firebase/database"
const firebaseConfig = {
    apiKey: "AIzaSyCvoOJGWD8P62cZF1OE4m490mYLyAqxBSY",
    authDomain: "netflix-d7399.firebaseapp.com",
    projectId: "netflix-d7399",
    storageBucket: "netflix-d7399.appspot.com",
    messagingSenderId: "681311500422",
    appId: "1:681311500422:web:be892017fff9a747537907",
    measurementId: "G-0E01G5GS8G"
  };

export default firebase.initializeApp(firebaseConfig)