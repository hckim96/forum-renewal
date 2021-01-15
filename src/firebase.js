// import * as firebase from "firebase"; // before 8.0.0
import firebase from 'firebase/app' // after 8.0.0
import "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCuPyGhtMKv4F00ES-leNp9j_NPS7b4XiI",
    authDomain: "forum-renewal-test.firebaseapp.com",
    projectId: "forum-renewal-test",
    storageBucket: "forum-renewal-test.appspot.com",
    messagingSenderId: "632834950560",
    appId: "1:632834950560:web:85c25a414e411e3dac50c5",
    measurementId: "G-NKZ1TMVFHZ"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
export const db = firebase.database();