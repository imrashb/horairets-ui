import React from 'react';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import AuthContext from './AuthContext';

const firebaseConfig = {
  apiKey: 'AIzaSyCsD9fw1PKCFrb3SW2evjeRaPowGVo0030',
  authDomain: 'horairets-a8b7e.firebaseapp.com',
  projectId: 'horairets-a8b7e',
  storageBucket: 'horairets-a8b7e.appspot.com',
  messagingSenderId: '940888231644',
  appId: '1:940888231644:web:225432f32c7fd583bb6e19',
  measurementId: 'G-XF6H123YCP',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
}

function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
