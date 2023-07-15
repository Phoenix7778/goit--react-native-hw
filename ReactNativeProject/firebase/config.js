import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkQ8TpaWQyhF0j_ECndOh9vhMTq_-w4VE",
  authDomain: "goit-react-native-hw-31cbf.firebaseapp.com",
  // databaseURL: "https://goit-react-native-hw-31cbf-default-rtdb.firebaseio.com",
  projectId: "goit-react-native-hw-31cbf",
  storageBucket: "goit-react-native-hw-31cbf.appspot.com",
  messagingSenderId: "880884661985",
  appId: "1:880884661985:web:9ed9f1eef8a273f815c1a0",
  measurementId: "G-XB93QJZGY7",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
