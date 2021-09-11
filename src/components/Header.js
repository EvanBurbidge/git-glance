import React from 'react';
import ActionsMenu from './ActionsMenu';
import { useRouter } from '../hooks/useRouter';
import { useAuth } from '../context/loginContext';

import LogoWhite from '../assets/logo-white.png';

export const Header = () => {
  const { signOut } = useAuth();
  const router = useRouter();
  const goToSettings = () => {
    router.push('/settings');
  };
  const actions = [
    // {
    //   action: goToSettings,
    //   label: 'Settings',
    // },
    {
      action: signOut,
      label: 'Signout'
    }
  ]
  return (
    <header className="p-3 bg-primary fixed flex flex-row justify-between text-white items-center align-center w-full">
        <img src={LogoWhite} className="h-5" alt="git glance logo"/>
        <h3 className="tracking-tight font-bold text-xl">
          Git Glance
        </h3>
        <ActionsMenu actions={actions}/>
    </header>
  )
};