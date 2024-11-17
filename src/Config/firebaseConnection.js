import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore"
import { initializeAuth, getReactNativePersistence } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB4nDluDtcEG4XjbWrggfXpynePyv7avGQ",
  authDomain: "econecta-fd675.firebaseapp.com",
  projectId: "econecta-fd675",
  storageBucket: "econecta-fd675.firebasestorage.app",
  messagingSenderId: "1099462317916",
  appId: "1:1099462317916:web:877387aa9666f8de155399"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence()
})

export { db, auth };