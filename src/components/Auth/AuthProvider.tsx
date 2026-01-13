import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { FirebaseOptions, initializeApp } from "firebase/app";
import React from "react";
import AuthContext from "./AuthContext";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCsD9fw1PKCFrb3SW2evjeRaPowGVo0030",
  authDomain: "auth.horairets.emmanuelcoulombe.dev",
  projectId: "horairets-a8b7e",
  storageBucket: "horairets-a8b7e.appspot.com",
  messagingSenderId: "940888231644",
  appId: "1:940888231644:web:225432f32c7fd583bb6e19",
  measurementId: "G-XF6H123YCP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
  const db = getFirestore(app);
  connectFirestoreEmulator(db, "localhost", 9098);
  const fn = getFunctions(app);
  connectFunctionsEmulator(fn, "localhost", 9100);
}

interface AuthProviderProps {
  children?: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
