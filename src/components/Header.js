import React from 'react';
import ActionsMenu from './ActionsMenu';
import { useAuth } from '../context/loginContext';
import { useRouter } from '../hooks/useRouter';

export const Header = () => {
  const { signOut } = useAuth();
  const router = useRouter();
  const goToSettings = () => {
    router.push('/settings');
  };
  const actions = [
    {
      action: goToSettings,
      label: 'Settings',
    },
    {
      action: signOut,
      label: 'Signout'
    }
  ]
  return (
    <header className="p-3 bg-primary fixed w-full flex flex-row justify-between text-white items-center align-center">
        <h3 className="tracking-tight font-bold text-xl">
          Git Glance
        </h3>
        <ActionsMenu actions={actions}/>
    </header>
  )
};