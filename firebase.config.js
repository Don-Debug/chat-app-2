import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  //you're firebase config keys

  apiKey: "  ",

  authDomain: "  ",

  projectId: "  ",

  storageBucket: "  ",

  messagingSenderId: "  ",

  appId: "  ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
