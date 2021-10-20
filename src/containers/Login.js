import React, { useEffect } from 'react';
import { useAuth } from '../context/loginContext';
import { useRouter } from '../hooks/useRouter';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import Octo from '../assets/octocat.svg';
import Git from '../assets/github.png';
import Gitlab from '../assets/gitlab.png';
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
      <div className="flex flex-col items-center justify-start pt-20 w-full h-screen px-5 text-center text-primary">
        {/* <img src={Octo} alt="github-logo" className="w-1/2 h-auto mb-6" /> */}
        <h3 className="text-3xl text-primary font-bold tracking-tight">
          Git Glance
        </h3>
        <p className="mt-3 mb-6 text-base text-gray-500">A quick way to glance at your repos and pull requests for easier navigation</p>
        <LoginTile provider="github" imgSrc={Octo}/>
        <LoginTile provider="github enterprise" imgSrc={Git}/>
        <LoginTile provider="gitlab" imgSrc={Gitlab}/>
        <Button onClick={login}>
          Login
        </Button>
      </div>
    </>
  )

}

export default Login;