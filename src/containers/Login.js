import React from 'react';
import { useAuth } from '../context/loginContext';


const Login = () => {
  const { login } = useAuth();
  return (
    <div>
      LOGIN
      <button onClick={login}>
        Login
      </button>
    </div>
  )
  
}

export default Login;