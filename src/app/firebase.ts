import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzBXPppVfPF_VrpBuW-z5PmFC7OycS2hA",
  authDomain: "curiosphere-76326.firebaseapp.com",
  projectId: "curiosphere-76326",
  storageBucket: "curiosphere-76326.appspot.com",
  messagingSenderId: "1055911358936",
  appId: "1055911358936",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Login Function
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return null;
  }
};

// Logout Function
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

export { auth };
