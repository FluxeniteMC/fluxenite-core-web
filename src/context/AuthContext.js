import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);
        const isAdminEmail = firebaseUser.email === ADMIN_EMAIL;
        if (snap.exists()) {
          const data = snap.data();
          if (isAdminEmail && data.role !== "admin") {
            await setDoc(ref, { ...data, role: "admin" });
            setUserData({ ...data, role: "admin" });
          } else {
            setUserData(data);
          }
        } else {
          const newUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || "",
            photoURL: firebaseUser.photoURL || "",
            role: isAdminEmail ? "admin" : "user",
            createdAt: new Date().toISOString(),
          };
          await setDoc(ref, newUser);
          setUserData(newUser);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);
  const googleSignIn = () => signInWithPopup(auth, new GoogleAuthProvider());

  const isAdmin = user?.email === ADMIN_EMAIL || userData?.role === "admin";
  const isAuthorized = isAdmin || userData?.role === "editor";

  return (
    <AuthContext.Provider value={{ user, userData, isAdmin, isAuthorized, login, register, logout, googleSignIn, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
