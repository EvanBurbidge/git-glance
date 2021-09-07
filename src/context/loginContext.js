import to from "await-to-js";
import { signInWithPopup, GithubAuthProvider } from "@firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../utils/firebase";
import provider from "../utils/gitAuth";

const AuthContext = createContext({});

export const useAuth = () => {
  console.log(useContext(AuthContext));
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [gitToken, setGitToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const login = async () => {
    console.log("login");
    const [err, result] = await to(signInWithPopup(auth, provider));
    if (err) {
      setGitToken(null);
      GithubAuthProvider.credentialFromError(err);
    } else {
      const token = GithubAuthProvider.credentialFromResult(result);
      setGitToken(token);
    }
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  });

  const value = {
    login,
    loading,
    gitToken,
    currentUser
  };
  console.log("VALUE");
  console.log(value);
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
