import React from 'react';
import { useAuth } from '../context/loginContext';
import { useRepos } from '../hooks/useRepos';

const Repositories = () => {
  const { repos } = useRepos();
  const { signOut } = useAuth();
  return (
    <div>
      <button onClick={signOut}>
        Signout
      </button>
      <ul>
        {repos.map(repo => (
          <li id={repo.id} key={repo.id}>
            {repo.name}
            {repo.prCount}
            <a href={repo.href}>Go to repo</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Repositories;