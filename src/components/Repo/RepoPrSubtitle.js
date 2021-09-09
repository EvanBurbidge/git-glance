import React from 'react';
import { RepoMergeStatus } from './RepoMergeStatus';

export const RepoPrSubtitle = ({
  state,
  author,
  createdAt,
  mergeStatus = {},
}) => {
  return (
    <div className="flex items-center text-sm">
      <RepoMergeStatus mergeStatus={mergeStatus} />
      <p className="ml-1 font-bold text-primary mr-1">{author.login}</p>
      <p>{createdAt}</p>
    </div>
  )
}