import to from "await-to-js";
import { getDoc, setDoc, doc, deleteDoc} from 'firebase/firestore';
import { signInWithPopup, GithubAuthProvider } from "@firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import provider from "../utils/gitAuth";
import { auth, db } from "../utils/firebase";
import { useRouter } from '../hooks/useRouter';


const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const writeUserToken = async ({
  uid,
  token,
  provider = 'github.com', 
}) => {
  const newDoc = await setDoc(doc(db, 'user_tokens', uid), {
    token,
    provider,
  });
  return newDoc;
}

const readUserToken = async uid => {
  const docRef = doc(db, 'user_tokens', uid);
  const docData = await getDoc(docRef);
  return docData.data();
}

const removeUserToken = async uid => {
  try {
    const docRef = doc(db, 'user_tokens', uid);
    await deleteDoc(docRef);
    return true;
  } catch(e) {
    return false
  }
}


export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [gitToken, setGitToken] = useState(null);
<<<<<<< HEAD
=======
  const [currentUser, setCurrentUser] = useState(null);
  const [gitTokenResolved, setGitTokenResolved] = useState(false);

  const router = useRouter()
>>>>>>> 3a901f8060c3a7c2cd226d4c5341346d57140a93

  const login = async () => {
    setLoading(true);
    const [err, result] = await to(signInWithPopup(auth, provider));
    setLoading(true);
    if (err) {
      setGitToken(null);
      GithubAuthProvider.credentialFromError(err);
    } else {
      const token = GithubAuthProvider.credentialFromResult(result);
<<<<<<< HEAD
      setGitToken(token.accessToken);
      setInstallationId(token.accessToken);
=======
      await writeUserToken({
        uid: result.user.uid,
        token: token.accessToken,
      })
      setGitToken(token.accessToken);
      setGitTokenResolved(true);
>>>>>>> 3a901f8060c3a7c2cd226d4c5341346d57140a93
    }
    setLoading(false);
  };

  const signOut = async () => {
    setGitToken(null)
    await removeUserToken(auth.currentUser.uid);
    await auth.signOut();
  };

<<<<<<< HEAD
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
=======
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(true);
      if (user && !gitToken) {
        setCurrentUser(user);
        const token = await readUserToken(user.uid);
        if (token) {
          setGitToken(token.token);
          setGitTokenResolved(true);
        }
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []); // eslint-disable-line
>>>>>>> 3a901f8060c3a7c2cd226d4c5341346d57140a93

  const value = {
    login,
    signOut,
    loading,
    gitToken,
<<<<<<< HEAD
    // currentUser,
=======
    currentUser,
    gitTokenResolved
>>>>>>> 3a901f8060c3a7c2cd226d4c5341346d57140a93
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
