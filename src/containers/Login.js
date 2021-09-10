import React, { useEffect } from 'react';
import { useAuth } from '../context/loginContext';
import { useRouter } from '../hooks/useRouter';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import Octo from '../assets/octocat.svg';


const Login = () => {
  const { login, gitToken } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (gitToken) {
      router.push('/repos');
    }
  }, [gitToken]) // eslint-disable-line
  return (
    <>
      <Header />
      <div className="flex flex-col pt-10 w-full h-screen justify-center align-center items-center text-primary text-center px-5">
        <img src={Octo} alt="github-logo" className="w-1/2 mb-6 h-auto" />
        <h3 className="tracking-tight font-bold text-xl">
          Git Glance
        </h3>
        <p className="mt-3 text-base text-gray-500 mb-6">A quick way to glance at your repos and pull requests for easier navigation</p>
        <Button onClick={login}>
          Login
        </Button>
      </div>
    </>
  )

}

export default Login;