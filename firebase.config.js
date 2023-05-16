import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjxlVOWUOGKvGG-FuM0rzEPxuSWYDdpbQ",

  authDomain: "debug-chat-app.firebaseapp.com",

  projectId: "debug-chat-app",

  storageBucket: "debug-chat-app.appspot.com",

  messagingSenderId: "8654975673",

  appId: "1:8654975673:web:c7bc4fda2c951c89222168",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
