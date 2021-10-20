import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/loginContext';
import { useRouter } from '../hooks/useRouter';
import { Header } from '../components/Header';
import Octo from '../assets/octocat.svg';
import Git from '../assets/github.png';
import { LoginTile } from '../components/LoginTile';
import { LoginProviderInput } from '../components/LoginProviderInput';


const Login = () => {
  const [showProviderInput, setShowProvierInput] = useState(false);
  
  const router = useRouter();
  const { login, gitToken, loginWithCustomProvider } = useAuth();

  const toggleProviderInput = () => setShowProvierInput(!showProviderInput);
  
  useEffect(() => {
    if (gitToken) {
      router.push('/pulls');
    }
  }, [gitToken]) // eslint-disable-line

  return (
    <>
      <Header showDropdown={false}/>
      <div className="flex flex-col items-center justify-start w-full h-screen px-5 pt-20 text-primary">
        {/* <img src={Octo} alt="github-logo" className="w-1/2 h-auto mb-6" /> */}
        <h3 className="text-3xl font-bold tracking-tight text-primary">
          Git Glance
        </h3>
        <p className="mt-3 mb-6 text-base text-gray-500">A quick way to glance at your repos and pull requests for easier navigation</p>
        <LoginTile provider="github" imgSrc={Octo} onClick={login}/>
        <LoginTile provider="github enterprise" imgSrc={Git} showProviderInput={showProviderInput} onClick={toggleProviderInput}/>
        {showProviderInput && <LoginProviderInput onSave={loginWithCustomProvider}/>}
      </div>
    </>
  )

}

export default Login;