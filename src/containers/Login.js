import React, { useEffect } from 'react';
import { useAuth } from '../context/loginContext';
import { useRouter } from '../hooks/useRouter';


const Login = () => {
  const { login, gitToken } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (gitToken) {
      console.log('git token');
      router.push('/repos');
    }
  }, [gitToken]) // eslint-disable-line
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