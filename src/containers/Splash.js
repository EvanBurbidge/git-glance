import React, { useEffect } from 'react';
import { Header } from '../components/Header';
import NoData from '../components/NoData';
import { useAuth } from '../context/loginContext';
import { useRouter } from '../hooks/useRouter';

const Splash = () => {
  const { gitToken, loading, gitTokenResolved } = useAuth();
  const router = useRouter();

  useEffect(() => {
      if (!loading && !gitToken) {
        setTimeout(() => router.push('/login'), 1500);
      } else {
        setTimeout(() => router.push('/pulls'), 1500);
      }
  }, [loading, gitToken, gitTokenResolved]) // eslint-disable-line

  return (
    <>
      <Header />
      <NoData loading={true} showMessage={false}/>
    </>
  );
}


export default Splash;