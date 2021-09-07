import React from 'react';
import { useAuth } from '../context/loginContext';


const Login = () => {
  const { login } = useAuth();
  console.log('login component')
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