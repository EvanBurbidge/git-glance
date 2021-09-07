import React from 'react';
import { signInWithPopup, GithubAuthProvider } from '@firebase/auth';
import { auth } from '../utils/firebase';
import provider from '../utils/gitAuth';


const Login = () => {
  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const token = GithubAuthProvider.credentialFromResult(result);
        debugger;
        console.log(token);
      })
      .catch(error => {
        GithubAuthProvider.credentialFromError(error);
      })
  }
  return (
    <div>
      <button onClick={login}>
        Login
      </button>
    </div>
  )
}

export default Login;