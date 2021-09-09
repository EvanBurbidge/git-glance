import React from 'react';
import { Header } from '../components/Header';
import { useRepos } from '../hooks/useRepos';

const Repositories = () => {
  const { repos } = useRepos();
  return (
    <div>
      <Header />
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