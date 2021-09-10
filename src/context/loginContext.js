import to from "await-to-js";
import { signInWithPopup, GithubAuthProvider } from "@firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../utils/firebase";
import provider from "../utils/gitAuth";
import { getInstallationId, setInstallationId, removeGitToken } from "../utils/localStorage";

import { useRouter } from '../hooks/useRouter';
import { Loading } from "../components/Loading";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [gitToken, setGitToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const router = useRouter();

  const login = async () => {
    const [err, result] = await to(signInWithPopup(auth, provider));
    if (err) {
      setGitToken(null);
      GithubAuthProvider.credentialFromError(err);
    } else {
      const token = GithubAuthProvider.credentialFromResult(result);
      setGitToken(token);
      setInstallationId(token.accessToken);
      router.push('/repos');
    }
    setTimeout(() => {
      setLoading(false);
    }, 1500)
  };

  const signOut = () => {
    removeGitToken()
    auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setGitToken(getInstallationId());
      } else {
        setGitToken(null);
        setCurrentUser(null);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1500)
    });
    return unsubscribe;
  });

  const value = {
    login,
    loading,
    gitToken,
    currentUser,
    signOut,
  };
  return (
    <AuthContext.Provider value={value}>
      {loading && <Loading />}
      {!loading && children}
    </AuthContext.Provider>
  );
};
