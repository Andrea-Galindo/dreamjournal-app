import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updatePassword = (password) => {
    return updatePassword(user, password);
  };

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      const uid = currentUser.uid;
      localStorage.setItem("uid", currentUser.uid);
    });
    return () => {
      unsuscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ user, createUser, login, logout, resetPassword }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
