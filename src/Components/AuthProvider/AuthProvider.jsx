/* eslint-disable react/prop-types */

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase.js/firebase";



export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
 

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)


  }
  const sigIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)

  }
  const LogOut = () => {
    setLoading(true)
    return signOut(auth)

  }
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false)

    })
    return () => {
      return unSubscribe()
    }
  }, [])
  const authInfo = { createUser, sigIn, LogOut, user, loading }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;