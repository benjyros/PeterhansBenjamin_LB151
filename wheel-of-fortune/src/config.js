import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBh5fHofLkvJ9FSeUe6fvZ7jjnuAlFlzyw",
  authDomain: "wheel-of-fortune-9e6f7.firebaseapp.com",
  projectId: "wheel-of-fortune-9e6f7",
  storageBucket: "wheel-of-fortune-9e6f7.appspot.com",
  messagingSenderId: "36936980967",
  appId: "1:36936980967:web:cee573278f9a68452c4542",
  measurementId: "G-K8PVLP23CT"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const firestore = getFirestore(app);

export { auth, firestore }