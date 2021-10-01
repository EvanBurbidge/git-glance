import to from "await-to-js";
import { signInWithPopup, GithubAuthProvider } from "@firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../utils/firebase";
import provider from "../utils/gitAuth";
import { Loading } from "../components/Loading";
import { getInstallationId, setInstallationId, removeGitToken } from "../utils/localStorage";


const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [gitToken, setGitToken] = useState(null);

  const login = async () => {
    setLoading(true);
    const [err, result] = await to(signInWithPopup(auth, provider));
    if (err) {
      setGitToken(null);
      GithubAuthProvider.credentialFromError(err);
    } else {
      const token = GithubAuthProvider.credentialFromResult(result);
      setGitToken(token.accessToken);
      setInstallationId(token.accessToken);
    }
    setLoading(false);
  };

  const signOut = () => {
    removeGitToken()
    auth.signOut();
  }

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setCurrentUser(user);
  //       setGitToken(getInstallationId());
  //     } else {
  //       setGitToken(null);
  //       setCurrentUser(null);
  //     }
  //     setLoading(false);
  //   });
  //   return unsubscribe;
  // });

  const value = {
    login,
    signOut,
    loading,
    gitToken,
    // currentUser,
  };
  return (
    <AuthContext.Provider value={value}>
      {loading && <Loading />}
      {!loading && children}
    </AuthContext.Provider>
  );
};
