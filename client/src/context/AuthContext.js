// src/context/AuthContext.js
import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';


const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }


  // not using this for now
  const handleGoogle = async (e) => {
    const provider = await new GoogleAuthProvider();
    // signInWithPopup(auth, provider)
    //   .then((re)=>{
    //     console.log(re);

    //   })
    //   .catch((err)=>{
    //     console.log(err);
    //   })

    return signInWithPopup(auth, provider);
  };

  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
