import React, { useEffect } from 'react';
import { useAuth } from '../context/loginContext';
import { useRouter } from '../hooks/useRouter';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import Octo from '../assets/octocat.svg';
import { LoginTile } from '../components/LoginTile';


const Login = () => {

  const router = useRouter();
  const { login, gitToken } = useAuth();
  useEffect(() => {
    if (gitToken) {
      router.push('/pulls');
    }
  }, [gitToken]) // eslint-disable-line

  return (
    <>
      <Header showDropdown={false}/>
      <div className="flex flex-col items-center justify-center w-full h-screen px-5 pt-10 text-center align-center text-primary">
        <LoginTile provider="github.com" imgSrc={Octo}/>
        <img src={Octo} alt="github-logo" className="w-1/2 h-auto mb-6" />
        <h3 className="text-xl font-bold tracking-tight">
          Git Glance
        </h3>
        <p className="mt-3 mb-6 text-base text-gray-500">A quick way to glance at your repos and pull requests for easier navigation</p>
        <Button onClick={login}>
          Login
        </Button>
      </div>
    </>
  )

}

export default Login;