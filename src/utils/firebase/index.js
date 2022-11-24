import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCY66n5I9cMUi-fhuMV18B-27HD3pcvr50",
  authDomain: "crwn-clothing-db-32137.firebaseapp.com",
  projectId: "crwn-clothing-db-32137",
  storageBucket: "crwn-clothing-db-32137.appspot.com",
  messagingSenderId: "1024735445288",
  appId: "1:1024735445288:web:848175490b28b3000e901d",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
