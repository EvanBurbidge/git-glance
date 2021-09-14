import React from 'react';
import dayjs from 'dayjs';
import { RepoMergeStatus } from './RepoMergeStatus';
import { AnnotationIcon } from '@heroicons/react/solid';

export const RepoPrSubtitle = ({
  state,
  author,
  createdAt,
  commentsCount = 0,
  mergeStatus = {},
}) => {
  return (
    <div className="flex items-center">
      <RepoMergeStatus state={state} />
      <p className="ml-1 font-bold text-primary mr-1 text-sm">{author.login}</p>
      <p className="text-sm text-primary">{dayjs(createdAt).format('DD/MM/YYYY')}</p>
      {commentsCount > 0 && (
        <>
          <AnnotationIcon className="-mr-1 ml-2 h-4 w-4 text-primary"/>
          <p className="ml-1 text-sm font-primary">
            {commentsCount}
          </p>
        </>
      )}
    </div>
  )
}