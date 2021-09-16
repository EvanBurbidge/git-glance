import React from 'react';
import ActionsMenu from './ActionsMenu';
import { useAuth } from '../context/loginContext';

import LogoWhite from '../assets/logo-white.png';

export const Header = ({ updateQuery = () => { } }) => {
  const { signOut } = useAuth();
  const actions = [
    {
      label: 'Created',
      action: () => updateQuery('created'),
    },
    {
      label: 'Assigned',
      action: () => updateQuery('assigned'),
    },
    {
      label: 'Mentioned',
      action: () => updateQuery('mentioned'),
    },
    {
      label: 'Review requested',
      action: () => updateQuery('review_requested'),
    },
    {
      action: signOut,
      label: 'Signout'
    }
  ]
  return (
    <header className="p-3 bg-primary fixed flex flex-row justify-between text-white items-center align-center rounded-t-sm" style={{ width: '402px'}}>
      <img src={LogoWhite} className="h-5" alt="git glance logo" />
      <h3 className="tracking-tight font-bold text-xl">
        Git Glance
      </h3>
      <ActionsMenu actions={actions} />
    </header>
  )
};