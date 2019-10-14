import firebase from "firebase/app" ;
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCXOSAfsLUhTmGOw9Er8mruN8HLxL7ozM8",
  authDomain: "chat-app-c2a16.firebaseapp.com",
  databaseURL: "https://chat-app-c2a16.firebaseio.com",
  projectId: "chat-app-c2a16",
  storageBucket: "chat-app-c2a16.appspot.com",
  messagingSenderId: "617806362194",
  appId: "1:617806362194:web:7310e0dbd5695a3b44d18b",
  measurementId: "G-PGF65WE7X0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
