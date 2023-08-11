const { initializeApp, app }  = require("firebase/app");
// import { getAnalytics } from "firebase/analytics";
const { collection, doc, setDoc, getFirestore, query, getDocs, deleteDoc } = require('firebase/firestore')
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

require('dotenv').config()
// Your web app's Firebase configuration
// API_KEY = "AIzaSyCT9ASge_7Vy8RtuEuOpTbOuokNleY5jD8"
// AUTH_DOMAIN = "jmp-dashboard.firebaseapp.com"
// PROJECT_ID = "jmp-dashboard"
// STORAGE_BUCKET = "jmp-dashboard.appspot.com"
// MESSAGING_SENDER_ID = "808210032046"
// APP_ID = "1:808210032046:web:e86fecdc7537daed70943f"
// MEASUREMENT_ID = "G-7K5XXZXM2F"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const stockListRef = collection(db, "stockList")

const listQuery = query(stockListRef)

module.exports = {
    stockListRef: stockListRef,
    setDoc: setDoc,
    doc: doc,
    getDocs: getDocs,
    listQuery: listQuery,
    deleteDoc: deleteDoc,
    db: db
};
  
