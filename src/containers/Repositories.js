import React from 'react';
import { useRepos } from '../hooks/useRepos';

const Repositories = () => {
  const { repos } = useRepos();
  return (
    <div>
      {repos}
      <ul>
      <li>
        repo
        <ul>
          <li>
            Repow
          </li>
        </ul>
      </li>
    </ul>
    </div>
  )
}

export default Repositories;